import path from 'path';
import { existsSync } from 'fs';
import { IBuildTaskPlugin, IBuildTaskPluginCommandArgs, CommonTaskAttributeNames } from '../plugin';
import { OrgFormationError } from '../../../src/org-formation-error';
import { ConsoleUtil } from '../../util/console-util';
import { IBuildTaskConfiguration } from '~build-tasks/build-configuration';
import { IPluginBinding, IPluginTask } from '~plugin/plugin-binder';
import { IOrganizationBinding } from '~parser/parser';
import { IPerformTasksCommandArgs } from '~commands/index';
import { Md5Util } from '~util/md5-util';
import { ChildProcessUtility } from '~util/child-process-util';
import { Validator } from '~parser/validator';
import { PluginUtil } from '~plugin/plugin-util';
import { IGenericTarget } from '~state/persisted-state';
import { ICfnExpression, ICfnSubExpression } from '~core/cfn-expression';
import { CfnExpressionResolver } from '~core/cfn-expression-resolver';

export class CdkBuildTaskPlugin implements IBuildTaskPlugin<ICdkBuildTaskConfig, ICdkCommandArgs, ICdkTask> {

    type = 'cdk';
    typeForTask = 'update-cdk';

    convertToCommandArgs(config: ICdkBuildTaskConfig, command: IPerformTasksCommandArgs): ICdkCommandArgs {

        Validator.ThrowForUnknownAttribute(config, config.LogicalName, ...CommonTaskAttributeNames, 'Path',
            'FilePath', 'RunNpmInstall', 'RunNpmBuild', 'FailedTaskTolerance', 'MaxConcurrentTasks',
            'AdditionalCdkArguments', 'InstallCommand', 'CustomDeployCommand', 'CustomRemoveCommand', 'Parameters', 'Qualifier', 'IgnoreFileChanges');

        if (!config.Path) {
            throw new OrgFormationError(`task ${config.LogicalName} does not have required attribute Path`);
        }

        const dir = path.dirname(config.FilePath);
        const cdkPath = path.join(dir, config.Path);

        return {
            ...command,
            name: config.LogicalName,
            runNpmInstall: config.RunNpmInstall === true,
            runNpmBuild: config.RunNpmBuild === true,
            path: cdkPath,
            failedTolerance: config.FailedTaskTolerance ?? 0,
            maxConcurrent: config.MaxConcurrentTasks ?? 1,
            organizationBinding: config.OrganizationBinding,
            taskRoleName: config.TaskRoleName,
            customDeployCommand: config.CustomDeployCommand,
            customRemoveCommand: config.CustomRemoveCommand,
            parameters: config.Parameters,
            qualifier: config.Qualifier,
            ignoreFileChanges: Array.isArray(config.IgnoreFileChanges) ? config.IgnoreFileChanges : typeof config.IgnoreFileChanges === 'string' ? [config.IgnoreFileChanges] : [],
        };
    }

    validateCommandArgs(commandArgs: ICdkCommandArgs): void {
        if (!commandArgs.organizationBinding) {
            throw new OrgFormationError(`task ${commandArgs.name} does not have required attribute OrganizationBinding`);
        }

        if (!existsSync(commandArgs.path)) {
            throw new OrgFormationError(`task ${commandArgs.name} cannot find path ${commandArgs.path}`);
        }

        if (commandArgs.runNpmInstall) {

            const packageFilePath = path.join(commandArgs.path, 'package.json');
            if (!existsSync(packageFilePath)) {
                throw new OrgFormationError(`task ${commandArgs.name} specifies 'RunNpmInstall' but cannot find npm package file ${packageFilePath}`);
            }

            const packageLockFilePath = path.join(commandArgs.path, 'package-lock.json');
            if (!existsSync(packageLockFilePath)) {
                ConsoleUtil.LogWarning(`task ${commandArgs.name} specifies 'RunNpmInstall' but cannot find npm package file ${packageLockFilePath}. Will perform 'npm i' as opposed to 'npm ci'.`);
            }
        }

        // Validator.ValidateCustomCommand(commandArgs.customDeployCommand, commandArgs.name, 'CustomDeployCommand');
        // Validator.ValidateCustomCommand(commandArgs.customRemoveCommand, commandArgs.name, 'CustomRemoveCommand');

        Validator.ValidateOrganizationBinding(commandArgs.organizationBinding, commandArgs.name);
    }

    getValuesForEquality(command: ICdkCommandArgs): any {
        const hashOfCdkDirectory = Md5Util.Md5OfPath(command.path, command.ignoreFileChanges);
        return {
            runNpmInstall: command.runNpmInstall,
            path: hashOfCdkDirectory,
            customDeployCommand: command.customDeployCommand,
            customRemoveCommand: command.customRemoveCommand,
            parameters: command.parameters,
            qualifier: command.qualifier,
        };
    }

    convertToTask(command: ICdkCommandArgs, globalHash: string): ICdkTask {
        return {
            type: this.type,
            name: command.name,
            path: command.path,
            hash: globalHash,
            maxConcurrent: command.maxConcurrent,
            runNpmInstall: command.runNpmInstall,
            runNpmBuild: command.runNpmBuild,
            taskRoleName: command.taskRoleName,
            customDeployCommand: command.customDeployCommand,
            customRemoveCommand: command.customRemoveCommand,
            parameters: command.parameters,
            qualifier: command.qualifier,
            forceDeploy: typeof command.forceDeploy === 'boolean' ? command.forceDeploy : false,
            logVerbose: typeof command.verbose === 'boolean' ? command.verbose : false,
        };
    }

    async performCreateOrUpdate(binding: IPluginBinding<ICdkTask>, resolver: CfnExpressionResolver): Promise<void> {

        const { task, target, previousBindingLocalHash } = binding;
        if (task.forceDeploy !== true &&
            task.taskLocalHash !== undefined &&
            task.taskLocalHash === previousBindingLocalHash) {

            ConsoleUtil.LogDebug(`Workload (${this.typeForTask}) ${task.name} in ${target.accountId}/${target.region} skipped, task itself did not change. Use ForceTask to force deployment.`);
            return;
        }

        let command: string;

        if (task.customDeployCommand) {
            Validator.throwForUnresolvedExpressions(task.customDeployCommand, 'CustomDeployCommand');
            command = task.customDeployCommand as string;
        } else {
            // DBLA:
            // --ci: Output logs to stdout iso stderr
            // --method direct: speeds up cdk deploy. There is no need to do a change-set at this point.
            // --no-notices: suppresses cdk notices
            // --version-reporting false: suppresses AWS::CDK::Metadata
            const commandExpression = { 'Fn::Sub': 'npx cdk deploy --all --require-approval never --ci --method direct --no-notices --version-reporting false ${CurrentTask.Qualifier} ${CurrentTask.Parameters}' } as ICfnSubExpression;
            command = await resolver.resolveSingleExpression(commandExpression, 'CustomDeployCommand');

            if (task.runNpmBuild) {
                command = 'npm run build && ' + command;
            }

            if (task.runNpmInstall) {
                command = PluginUtil.PrependNpmInstall(task.path, command);
            }

            // DBLA: multiple cdk stacks might still run in parallel even if MaxConcurrentTasks=1
            // if (task.maxConcurrent > 1) {
            // }
            // DBLA: add space + add region for parallel cdk deployments in multiple regions
            // https://github.com/org-formation/org-formation-cli/issues/602
            command = command + ` --output cdk.out/${target.accountId}/${target.region}`;
        }

        const accountId = target.accountId;
        const cwd = path.resolve(task.path);
        const env = CdkBuildTaskPlugin.GetEnvironmentVariables(target);
        await ChildProcessUtility.SpawnProcessForAccount(cwd, command, accountId, task.taskRoleName, target.region, env, task.logVerbose);
    }

    async performRemove(binding: IPluginBinding<ICdkTask>, resolver: CfnExpressionResolver): Promise<void> {
        const { task, target } = binding;
        let command: string;

        if (task.customRemoveCommand) {
            Validator.throwForUnresolvedExpressions(task.customRemoveCommand, 'CustomRemoveCommand');
            command = task.customRemoveCommand as string;
        } else {
            // DBLA:
            // --ci: Output logs to stdout iso stderr
            const commandExpression = { 'Fn::Sub': 'npx cdk destroy --all --force --ci --no-notices ${CurrentTask.Qualifier} ${CurrentTask.Parameters}' } as ICfnSubExpression;
            command = await resolver.resolveSingleExpression(commandExpression, 'CustomRemoveCommand');

            if (task.runNpmBuild) {
                command = 'npm run build && ' + command;
            }

            if (task.runNpmInstall) {
                command = PluginUtil.PrependNpmInstall(task.path, command);
            }

            // DBLA: MaxConcurrent=1, but multiple stacks are deleted in parallel. So this is always required!!
            // if (task.maxConcurrent > 1) {
            // }
            // DBLA: add space + add region for parallel cdk deployments in multiple regions
            // https://github.com/org-formation/org-formation-cli/issues/602
            command = command + ` --output cdk.out/${target.accountId}/${target.region}`;
        }

        const accountId = target.accountId;
        const cwd = path.resolve(task.path);
        const env = CdkBuildTaskPlugin.GetEnvironmentVariables(target);
        await ChildProcessUtility.SpawnProcessForAccount(cwd, command, accountId, task.taskRoleName, target.region, env, task.logVerbose);
    }

    async appendResolvers(resolver: CfnExpressionResolver, binding: IPluginBinding<ICdkTask>): Promise<void> {
        const { task } = binding;
        const p = await resolver.resolve(task.parameters);
        const collapsed = await resolver.collapse(p);
        const parametersAsString = CdkBuildTaskPlugin.GetParametersAsArgument(collapsed);
        const qualifier = await resolver.resolveSingleExpression(task.qualifier, 'Qualifier');
        const contextWithQualifier = CdkBuildTaskPlugin.BuildContextWithQualifierAsArgument(qualifier);
        resolver.addResourceWithAttributes('CurrentTask', { Parameters: parametersAsString, Qualifier: contextWithQualifier, AccountId: binding.target.accountId });
    }

    static GetEnvironmentVariables(target: IGenericTarget<ICdkTask>): Record<string, string> {
        return {
            // Note: The CDK_DEFAULT_* variables will be overwritten by the cdk cli. Use the
            // CDK_DEPLOY_* variables instead as documented in:
            // https://docs.aws.amazon.com/cdk/latest/guide/environments.html
            CDK_DEFAULT_REGION: target.region,
            CDK_DEFAULT_ACCOUNT: target.accountId,
            CDK_DEPLOY_REGION: target.region,
            CDK_DEPLOY_ACCOUNT: target.accountId,
        };
    }
    // DBLA: Return a PhysicalISForCleanup. These get tracked in the state.json and used to determine if a task has needs to be delete (performRemove).
    // getPhysicalIdForCleanup(): string {
    //     return undefined;
    // }
    getPhysicalIdForCleanup(config: ICdkBuildTaskConfig): string {
        return config.LogicalName;
    }

    static GetParametersAsArgument(parameters: Record<string, any>): string {
        if (!parameters) { return ''; }
        const entries = Object.entries(parameters);
        return entries.reduce((prev, curr) => prev + ` -c '${curr[0]}=${curr[1]}'`, '');
    }

    static BuildContextWithQualifierAsArgument(qualifier?: string): string {
        if (!qualifier) { return ''; }
        return `--context @aws-cdk/core:bootstrapQualifier=${qualifier}`;
    }
}


interface ICdkBuildTaskConfig extends IBuildTaskConfiguration {
    Path: string;
    OrganizationBinding: IOrganizationBinding;
    MaxConcurrentTasks?: number;
    FailedTaskTolerance?: number;
    RunNpmInstall?: boolean;
    RunNpmBuild?: boolean;
    CustomDeployCommand?: string;
    CustomRemoveCommand?: string;
    Qualifier?: ICfnExpression;
    Parameters?: Record<string, ICfnExpression>;
    IgnoreFileChanges?: string | string[];
}

export interface ICdkCommandArgs extends IBuildTaskPluginCommandArgs {
    path: string;
    runNpmInstall: boolean;
    runNpmBuild: boolean;
    customDeployCommand?: string;
    customRemoveCommand?: string;
    qualifier?: ICfnExpression;
    parameters?: Record<string, ICfnExpression>;
    ignoreFileChanges?: string[];
}

export interface ICdkTask extends IPluginTask {
    path: string;
    runNpmInstall: boolean;
    runNpmBuild: boolean;
    maxConcurrent?: number;
    customDeployCommand?: ICfnExpression;
    customRemoveCommand?: ICfnExpression;
    qualifier?: ICfnExpression;
}
