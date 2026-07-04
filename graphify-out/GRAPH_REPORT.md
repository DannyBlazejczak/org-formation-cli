# Graph Report - /Users/dblazejczak/projects/workspaces/ws_pers/aws-solution-builder-v3/modules/org-formation-cli  (2026-07-04)

## Corpus Check
- Large corpus: 626 files · ~232,617 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 1516 nodes · 5057 edges · 80 communities (53 shown, 27 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 11 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_AWS Organization Types|AWS Organization Types]]
- [[_COMMUNITY_Organization Binding Tasks|Organization Binding Tasks]]
- [[_COMMUNITY_CloudFormation Binder|CloudFormation Binder]]
- [[_COMMUNITY_CloudFormation Parameters|CloudFormation Parameters]]
- [[_COMMUNITY_Task Runner Changesets|Task Runner Changesets]]
- [[_COMMUNITY_Cross Account Templates|Cross Account Templates]]
- [[_COMMUNITY_Build Task Provider|Build Task Provider]]
- [[_COMMUNITY_CloudFormation Functions|CloudFormation Functions]]
- [[_COMMUNITY_Jest TypeScript Config|Jest TypeScript Config]]
- [[_COMMUNITY_AWS SDK Dependencies|AWS SDK Dependencies]]
- [[_COMMUNITY_Dev Dependencies|Dev Dependencies]]
- [[_COMMUNITY_Template Resource Model|Template Resource Model]]
- [[_COMMUNITY_Init Organization Commands|Init Organization Commands]]
- [[_COMMUNITY_Change Set Commands|Change Set Commands]]
- [[_COMMUNITY_CDK Manifest Fixture|CDK Manifest Fixture]]
- [[_COMMUNITY_Stack Task Resolution|Stack Task Resolution]]
- [[_COMMUNITY_Pipeline Initialization|Pipeline Initialization]]
- [[_COMMUNITY_Parser Include Logic|Parser Include Logic]]
- [[_COMMUNITY_Base Command State|Base Command State]]
- [[_COMMUNITY_CDK No Region TSConfig|CDK No Region TSConfig]]
- [[_COMMUNITY_CDK Task TSConfig|CDK Task TSConfig]]
- [[_COMMUNITY_Organization Writer Policies|Organization Writer Policies]]
- [[_COMMUNITY_Remove Plugin Tasks|Remove Plugin Tasks]]
- [[_COMMUNITY_CDK No Region Package|CDK No Region Package]]
- [[_COMMUNITY_CDK Task Package|CDK Task Package]]
- [[_COMMUNITY_AWS Account Access|AWS Account Access]]
- [[_COMMUNITY_AWS Events Reader|AWS Events Reader]]
- [[_COMMUNITY_Annotate Organization Task|Annotate Organization Task]]
- [[_COMMUNITY_Update Organization Task|Update Organization Task]]
- [[_COMMUNITY_Package Metadata|Package Metadata]]
- [[_COMMUNITY_Plugin Runtime Commands|Plugin Runtime Commands]]
- [[_COMMUNITY_Resource Provider Plugin|Resource Provider Plugin]]
- [[_COMMUNITY_Hash And Refs|Hash And Refs]]
- [[_COMMUNITY_Task Error Handling|Task Error Handling]]
- [[_COMMUNITY_Validation Runtime Config|Validation Runtime Config]]
- [[_COMMUNITY_S3 Copy Plugin|S3 Copy Plugin]]
- [[_COMMUNITY_Default Template Writer|Default Template Writer]]
- [[_COMMUNITY_Update Stacks Config|Update Stacks Config]]
- [[_COMMUNITY_Build Runner Tasks|Build Runner Tasks]]
- [[_COMMUNITY_Create Account Example|Create Account Example]]
- [[_COMMUNITY_Package Scripts|Package Scripts]]
- [[_COMMUNITY_AWS Account Utilities|AWS Account Utilities]]
- [[_COMMUNITY_Init Organization Flow|Init Organization Flow]]
- [[_COMMUNITY_Plugin Task Model|Plugin Task Model]]
- [[_COMMUNITY_YAML Writer Lines|YAML Writer Lines]]
- [[_COMMUNITY_CLI Program|CLI Program]]
- [[_COMMUNITY_Parser File Utility|Parser File Utility]]
- [[_COMMUNITY_Plugin Equality Helpers|Plugin Equality Helpers]]
- [[_COMMUNITY_Serverless Package Fixture|Serverless Package Fixture]]
- [[_COMMUNITY_Lambda Zip Example|Lambda Zip Example]]
- [[_COMMUNITY_Lambda Package Fixture|Lambda Package Fixture]]
- [[_COMMUNITY_Logical Name Writer|Logical Name Writer]]
- [[_COMMUNITY_Change Set Execution|Change Set Execution]]
- [[_COMMUNITY_Generic Task Runner|Generic Task Runner]]
- [[_COMMUNITY_Test TSConfig|Test TSConfig]]
- [[_COMMUNITY_Build Configuration|Build Configuration]]
- [[_COMMUNITY_Annotate Remove Commands|Annotate Remove Commands]]
- [[_COMMUNITY_Print Update Stacks|Print Update Stacks]]
- [[_COMMUNITY_Terraform Plugin|Terraform Plugin]]
- [[_COMMUNITY_AWS Config Types|AWS Config Types]]
- [[_COMMUNITY_CDK JS Fixture|CDK JS Fixture]]
- [[_COMMUNITY_CDK Build Plugin|CDK Build Plugin]]
- [[_COMMUNITY_Delete Stacks Command|Delete Stacks Command]]
- [[_COMMUNITY_Validate Stacks Command|Validate Stacks Command]]
- [[_COMMUNITY_Core CFN Parameters|Core CFN Parameters]]
- [[_COMMUNITY_Automation Handler Example|Automation Handler Example]]
- [[_COMMUNITY_CLI Binary Aliases|CLI Binary Aliases]]
- [[_COMMUNITY_Plugin CLI Command|Plugin CLI Command]]
- [[_COMMUNITY_CDK No Region Entry|CDK No Region Entry]]
- [[_COMMUNITY_CDK Task Entry|CDK Task Entry]]
- [[_COMMUNITY_YAML CFN Schema|YAML CFN Schema]]

## God Nodes (most connected - your core abstractions)
1. `TemplateRoot` - 127 edges
2. `PersistedState` - 126 edges
3. `AwsUtil` - 99 edges
4. `ConsoleUtil` - 92 edges
5. `CfnExpressionResolver` - 80 edges
6. `BaseCliCommand` - 70 edges
7. `IPerformTasksCommandArgs` - 64 edges
8. `OrgFormationError` - 57 edges
9. `IBuildTask` - 50 edges
10. `OrgResourceTypes` - 48 edges

## Surprising Connections (you probably didn't know these)
- `baseBeforeAll()` --indirect_call--> `ConsoleUtil`  [INFERRED]
  test/integration-tests/base-integration-test.ts → src/util/console-util.ts
- `IIntegrationTestContext` --references--> `IPerformTasksCommandArgs`  [EXTRACTED]
  test/integration-tests/base-integration-test.ts → src/commands/perform-tasks.ts
- `IIntegrationTestContext` --references--> `IUpdateStacksCommandArgs`  [EXTRACTED]
  test/integration-tests/base-integration-test.ts → src/commands/update-stacks.ts
- `ICfnOutput` --references--> `ICfnExpression`  [EXTRACTED]
  src/cfn-binder/cfn-template.ts → src/core/cfn-expression.ts
- `ICfnCrossAccountReference` --references--> `ICfnExpression`  [EXTRACTED]
  src/cfn-binder/cfn-template.ts → src/core/cfn-expression.ts

## Import Cycles
- 1-file cycle: `cli.ts -> cli.ts`
- 3-file cycle: `src/build-tasks/build-configuration.ts -> src/build-tasks/build-task-provider.ts -> src/build-tasks/tasks/include-task.ts -> src/build-tasks/build-configuration.ts`
- 3-file cycle: `src/build-tasks/build-configuration.ts -> src/build-tasks/build-task-provider.ts -> src/plugin/plugin.ts -> src/build-tasks/build-configuration.ts`
- 3-file cycle: `src/build-tasks/build-configuration.ts -> src/build-tasks/build-task-provider.ts -> src/plugin/plugin-task.ts -> src/build-tasks/build-configuration.ts`
- 3-file cycle: `src/build-tasks/build-configuration.ts -> src/commands/index.ts -> src/commands/base-command.ts -> src/build-tasks/build-configuration.ts`
- 3-file cycle: `src/build-tasks/build-configuration.ts -> src/commands/index.ts -> src/commands/perform-tasks.ts -> src/build-tasks/build-configuration.ts`
- 3-file cycle: `src/build-tasks/build-configuration.ts -> src/commands/index.ts -> src/commands/validate-tasks.ts -> src/build-tasks/build-configuration.ts`
- 3-file cycle: `src/commands/base-command.ts -> src/commands/perform-tasks.ts -> src/commands/update-organization.ts -> src/commands/base-command.ts`
- 4-file cycle: `src/build-tasks/build-configuration.ts -> src/commands/index.ts -> src/commands/print-org.ts -> src/commands/base-command.ts -> src/build-tasks/build-configuration.ts`
- 4-file cycle: `src/build-tasks/build-configuration.ts -> src/build-tasks/build-task-provider.ts -> src/build-tasks/tasks/include-task.ts -> src/build-tasks/build-runner.ts -> src/build-tasks/build-configuration.ts`
- 4-file cycle: `src/build-tasks/build-task-provider.ts -> src/build-tasks/tasks/include-task.ts -> src/commands/index.ts -> src/commands/perform-tasks.ts -> src/build-tasks/build-task-provider.ts`
- 4-file cycle: `src/build-tasks/build-configuration.ts -> src/build-tasks/build-task-provider.ts -> src/build-tasks/tasks/include-task.ts -> src/commands/print-tasks.ts -> src/build-tasks/build-configuration.ts`
- 4-file cycle: `src/build-tasks/build-task-provider.ts -> src/build-tasks/tasks/include-task.ts -> src/commands/print-tasks.ts -> src/commands/perform-tasks.ts -> src/build-tasks/build-task-provider.ts`
- 4-file cycle: `src/build-tasks/build-configuration.ts -> src/commands/index.ts -> src/commands/validate-stacks.ts -> src/commands/base-command.ts -> src/build-tasks/build-configuration.ts`
- 4-file cycle: `src/build-tasks/build-configuration.ts -> src/build-tasks/build-task-provider.ts -> src/commands/index.ts -> src/commands/base-command.ts -> src/build-tasks/build-configuration.ts`
- 4-file cycle: `src/build-tasks/build-configuration.ts -> src/build-tasks/build-task-provider.ts -> src/commands/index.ts -> src/commands/perform-tasks.ts -> src/build-tasks/build-configuration.ts`
- 4-file cycle: `src/build-tasks/build-configuration.ts -> src/build-tasks/build-task-provider.ts -> src/commands/index.ts -> src/commands/validate-tasks.ts -> src/build-tasks/build-configuration.ts`
- 4-file cycle: `src/build-tasks/build-configuration.ts -> src/build-tasks/build-task-provider.ts -> src/plugin/plugin.ts -> src/commands/base-command.ts -> src/build-tasks/build-configuration.ts`
- 4-file cycle: `src/build-tasks/build-configuration.ts -> src/build-tasks/build-task-provider.ts -> src/plugin/plugin-task.ts -> src/plugin/plugin.ts -> src/build-tasks/build-configuration.ts`
- 4-file cycle: `src/build-tasks/build-configuration.ts -> src/build-tasks/tasks/annotate-organization-task.ts -> src/build-tasks/tasks/annotate-organization.ts -> src/commands/base-command.ts -> src/build-tasks/build-configuration.ts`

## Communities (80 total, 27 thin omitted)

### Community 0 - "AWS Organization Types"
Cohesion: 0.06
Nodes (37): AwsOrganization, AWSObjectType, AwsOrganizationReader, AWSPolicy, AWSRoot, IAWSAccountWithIAMAttributes, IAWSAccountWithSupportLevel, IAWSAccountWithTags (+29 more)

### Community 1 - "Organization Binding Tasks"
Cohesion: 0.06
Nodes (34): AccountBinding, Binding, BindingAction, BindingRoot, OrganizationalUnitBinding, OrganizationBinder, OrganizationBinding, ServiceControlPolicyBinding (+26 more)

### Community 2 - "CloudFormation Binder"
Cohesion: 0.05
Nodes (24): CfnBindingAction, CloudFormationBinder, ICfnBinding, CfnValidateTaskProvider, OrgResourceTypes, ICfnTarget, IState, PersistedState (+16 more)

### Community 3 - "CloudFormation Parameters"
Cohesion: 0.10
Nodes (37): CfnParameters, ICfnCmdExpression, ICfnCopyValue, ICfnExpression, ICfnFindInMapExpression, ICfnGetAttExpression, ICfnJoinExpression, ICfnMD5Expression (+29 more)

### Community 4 - "Task Runner Changesets"
Cohesion: 0.14
Nodes (21): ICfnTask, CfnTaskRunner, IOrganizationChange, IOrganizationChangeSet, IStoredChangeSet, ICommandArgs, IRCObject, ICreateChangeSetCommandArgs (+13 more)

### Community 5 - "Cross Account Templates"
Cohesion: 0.07
Nodes (10): ICfnCrossAccountDependency, SubExpression, CfnTemplate, createResolveExpression(), createRewriteExpression(), ICfnFunctionExpression, ICopyValueExpression, IResourceExpression (+2 more)

### Community 6 - "Build Task Provider"
Cohesion: 0.12
Nodes (9): IBuildTask, BuildTaskProvider, IBuildTaskProvider, IncludeTaskProvider, UpdateOrganizationTaskProvider, UpdateStacksBuildTaskProvider, IPerformTasksCommandArgs, IPrintTasksCommandArgs (+1 more)

### Community 7 - "CloudFormation Functions"
Cohesion: 0.10
Nodes (13): ISubExpressionVariable, CfnCmd, CfnFindInMap, CfnFunctions, ICfnFunctionContext, CfnJoin, CfnJsonString, CfnMD5 (+5 more)

### Community 8 - "Jest TypeScript Config"
Cohesion: 0.05
Nodes (39): { compilerOptions }, defaultConfig, { pathsToModuleNameMapper }, compileOnSave, compilerOptions, allowJs, alwaysStrict, baseUrl (+31 more)

### Community 9 - "AWS SDK Dependencies"
Cohesion: 0.06
Nodes (34): dependencies, archiver, @aws-sdk/client-cloudformation, @aws-sdk/client-ec2, @aws-sdk/client-eventbridge, @aws-sdk/client-iam, @aws-sdk/client-organizations, @aws-sdk/client-s3 (+26 more)

### Community 10 - "Dev Dependencies"
Cohesion: 0.06
Nodes (32): devDependencies, aws-sdk-client-mock, aws-sdk-client-mock-jest, eslint, eslint-plugin-import, eslint-plugin-prefer-arrow, jest, pre-commit (+24 more)

### Community 11 - "Template Resource Model"
Cohesion: 0.12
Nodes (16): ICfnCrossAccountReference, ICfnExport, ICfnOutput, ICfnParameter, IEnumTargetsParams, ITemplateGenerationOptions, CloudFormationResource, ICrossAccountResourceDependencies (+8 more)

### Community 12 - "Init Organization Commands"
Cohesion: 0.14
Nodes (15): IInitCommandArgs, IInitPipelineCommandArgs, DEFAULT_ROLE_FOR_CROSS_ACCOUNT_ACCESS, DEFAULT_ROLE_FOR_ORG_ACCESS, ExtractedTemplate, InitialCommitUtil, TemplateDefinition, uploadStream() (+7 more)

### Community 13 - "Change Set Commands"
Cohesion: 0.09
Nodes (6): CreateChangeSetCommand, DescribeStacksCommand, PrintChangeSetCommand, IPrintOrganizationCommandArgs, PrintOrganizationCommand, yamlDump()

### Community 14 - "CDK Manifest Fixture"
Cohesion: 0.07
Nodes (27): artifacts, MyStack, Tree, @aws-cdk/aws-cloudwatch, @aws-cdk/aws-events, @aws-cdk/aws-iam, @aws-cdk/aws-kms, @aws-cdk/aws-s3 (+19 more)

### Community 17 - "Parser Include Logic"
Cohesion: 0.12
Nodes (15): allTagTypes, cfnSchema, debugWriteNunjucksTemplate(), env, makeTagTypes(), nunjucksParse(), nunjucksRender(), overrides (+7 more)

### Community 19 - "CDK No Region TSConfig"
Cohesion: 0.10
Nodes (20): compilerOptions, alwaysStrict, declaration, experimentalDecorators, inlineSourceMap, inlineSources, lib, module (+12 more)

### Community 20 - "CDK Task TSConfig"
Cohesion: 0.10
Nodes (20): compilerOptions, alwaysStrict, declaration, experimentalDecorators, inlineSourceMap, inlineSources, lib, module (+12 more)

### Community 22 - "Remove Plugin Tasks"
Cohesion: 0.24
Nodes (6): IRemoveCommandArgs, DefaultTaskRunner, GenericAction, IGenericTask, PluginBinder, PluginProvider

### Community 23 - "CDK No Region Package"
Cohesion: 0.11
Nodes (17): bin, custom-logical-names, dependencies, @aws-cdk/aws-s3, @aws-cdk/aws-sns, @aws-cdk/core, source-map-support, devDependencies (+9 more)

### Community 24 - "CDK Task Package"
Cohesion: 0.11
Nodes (17): bin, custom-logical-names, dependencies, @aws-cdk/aws-s3, @aws-cdk/aws-sns, @aws-cdk/core, source-map-support, devDependencies (+9 more)

### Community 26 - "AWS Events Reader"
Cohesion: 0.17
Nodes (5): AwsEvents, GetPoliciesForTarget(), Lazy, matchAndAppendLogicalAccountNames(), red()

### Community 27 - "Annotate Organization Task"
Cohesion: 0.19
Nodes (6): IAnnotateOrganizationCommandArgs, AnnotatedOrganizationTaskProvider, AnnotateOrganizationTask, BaseOrganizationTask, IAnnotateOrganizationTaskConfiguration, ValidateAnnotateOrganizationTask

### Community 28 - "Update Organization Task"
Cohesion: 0.20
Nodes (5): BaseOrganizationTask, UpdateOrganizationTask, ValidateOrganizationTask, IUpdateOrganizationCommandArgs, ValidateOrganizationCommand

### Community 29 - "Package Metadata"
Cohesion: 0.13
Nodes (13): author, description, files, keywords, license, main, name, pre-commit (+5 more)

### Community 31 - "Resource Provider Plugin"
Cohesion: 0.17
Nodes (3): retryTypeRegistrationWrapper(), RpBuildTaskPlugin, sleep()

### Community 33 - "Task Error Handling"
Cohesion: 0.18
Nodes (10): CfnBuildTaskAction, ICrossAccountParameterDependency, performAndRetryIfNeeded(), sleep(), ErrorCode, Catalog, IRpBuildTaskConfig, IRpCommandArgs (+2 more)

### Community 36 - "Default Template Writer"
Cohesion: 0.32
Nodes (3): AWSAccount, AWSOrganizationalUnit, DefaultTemplateWriter

### Community 37 - "Update Stacks Config"
Cohesion: 0.31
Nodes (6): IBuildFile, IBuildFileParameter, IUpdateStacksBuildTask, IUpdateStackTaskConfiguration, UpdateStacksCommand, CfnMappingsSection

### Community 38 - "Build Runner Tasks"
Cohesion: 0.28
Nodes (5): IBuildTaskConfiguration, BuildRunner, IIncludeTaskConfiguration, IUpdateOrganizationTaskConfiguration, ITrackedTask

### Community 40 - "Create Account Example"
Cohesion: 0.17
Nodes (11): author, description, devDependencies, aws-sdk, serverless-step-functions, license, main, name (+3 more)

### Community 41 - "Package Scripts"
Cohesion: 0.18
Nodes (11): scripts, build, lint, lint:fix, prepublishOnly, start, start:debug, test (+3 more)

### Community 42 - "AWS Account Utilities"
Cohesion: 0.24
Nodes (5): ICrossAccountAccess, ICrossAccountConfig, PartitionCreateResponse, sleep(), passwordPolicyEquals()

### Community 45 - "YAML Writer Lines"
Cohesion: 0.18
Nodes (4): Line, ListLine, ObjLine, YamlLine

### Community 46 - "CLI Program"
Cohesion: 0.24
Nodes (3): args, CliProgram, program

### Community 49 - "Serverless Package Fixture"
Cohesion: 0.20
Nodes (9): author, dependencies, description, license, main, name, scripts, test (+1 more)

### Community 50 - "Lambda Zip Example"
Cohesion: 0.22
Nodes (4): logger, context, event, lambda

### Community 51 - "Lambda Package Fixture"
Cohesion: 0.22
Nodes (8): author, description, license, main, name, scripts, test, version

### Community 54 - "Generic Task Runner"
Cohesion: 0.31
Nodes (3): IGenericTask, ITaskRunnerDelegates, sleep()

### Community 55 - "Test TSConfig"
Cohesion: 0.22
Nodes (8): compilerOptions, baseUrl, noImplicitAny, outDir, exclude, extends, include, typeRoots

### Community 58 - "Print Update Stacks"
Cohesion: 0.29
Nodes (3): createParametersFileInput(), PrintStacksCommand, toKebabCase()

### Community 60 - "AWS Config Types"
Cohesion: 0.32
Nodes (3): AWSConfig, ClientCredentialsConfig, DefaultClientConfig

### Community 61 - "CDK JS Fixture"
Cohesion: 0.29
Nodes (5): core_1, app, MyStack, s3, sns

### Community 68 - "CLI Binary Aliases"
Cohesion: 0.50
Nodes (4): bin, aws-organization-formation, ofn, org-formation

## Knowledge Gaps
- **317 isolated node(s):** `program`, `args`, `AWS`, `name`, `version` (+312 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **27 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `PersistedState` connect `CloudFormation Binder` to `AWS Organization Types`, `Organization Binding Tasks`, `Task Error Handling`, `CloudFormation Parameters`, `Task Runner Changesets`, `Cross Account Templates`, `Build Runner Tasks`, `Update Stacks Config`, `Template Resource Model`, `Init Organization Flow`, `Plugin Task Model`, `Init Organization Commands`, `Stack Task Resolution`, `Pipeline Initialization`, `Base Command State`, `Remove Plugin Tasks`, `Annotate Remove Commands`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **Why does `TemplateRoot` connect `Organization Binding Tasks` to `AWS Organization Types`, `CloudFormation Binder`, `CloudFormation Parameters`, `Task Runner Changesets`, `Cross Account Templates`, `CloudFormation Functions`, `Template Resource Model`, `Init Organization Commands`, `Change Set Commands`, `Stack Task Resolution`, `Pipeline Initialization`, `Parser Include Logic`, `Remove Plugin Tasks`, `Hash And Refs`, `Task Error Handling`, `Update Stacks Config`, `Init Organization Flow`, `Plugin Task Model`, `Parser File Utility`, `Change Set Execution`, `Annotate Remove Commands`, `Print Update Stacks`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **Why does `CfnExpressionResolver` connect `Stack Task Resolution` to `Task Error Handling`, `CloudFormation Binder`, `CloudFormation Parameters`, `Task Runner Changesets`, `Update Stacks Config`, `Build Runner Tasks`, `Build Task Provider`, `Cross Account Templates`, `Organization Binding Tasks`, `CloudFormation Functions`, `Template Resource Model`, `Plugin Task Model`, `Plugin Equality Helpers`, `Remove Plugin Tasks`, `Plugin Runtime Commands`, `Build Configuration`, `Terraform Plugin`, `CDK Build Plugin`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **What connects `program`, `args`, `AWS` to the rest of the system?**
  _317 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AWS Organization Types` be split into smaller, more focused modules?**
  _Cohesion score 0.059333795975017346 - nodes in this community are weakly interconnected._
- **Should `Organization Binding Tasks` be split into smaller, more focused modules?**
  _Cohesion score 0.057177129148340666 - nodes in this community are weakly interconnected._
- **Should `CloudFormation Binder` be split into smaller, more focused modules?**
  _Cohesion score 0.05407111298127498 - nodes in this community are weakly interconnected._