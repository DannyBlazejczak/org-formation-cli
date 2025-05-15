import { existsSync } from 'fs';
import path from 'path';

export class PluginUtil {
    static PrependNpmInstall(workloadPath: string, command: string): string {
        const hasPackageLock = existsSync(path.resolve(workloadPath, 'package-lock.json'));
        // DBLA: no need to do 'npm i' if node_modules are already there
        const hasNodeModules = existsSync(path.resolve(workloadPath, 'node_modules'));
        if (hasNodeModules) {
            return command;
        } else if (hasPackageLock) {
            return 'npm ci && ' + command;
        } else {
            return 'npm i && ' + command;
        }
    }
}
