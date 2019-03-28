/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: MainCommand.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-03-27 20:35:42
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-03-27 20:37:42
 * @Description: This is description.
 */

import { Command } from '../../helpers/Command';
import { RunCommandOptions } from './RunCommandOptions';
import { CliManager } from '../../helpers/CliManager';

export class RunCommand extends Command<RunCommandOptions> {

    constructor(options?: RunCommandOptions) {
        const defaultOptions: RunCommandOptions = {
            mainCommand: 'runit',
            skipStartupFiles: false,
            killallOnExit: true,
            skipRunit: false,
        };

        super({
            ...defaultOptions,
            ...options,
        });
    }

    protected async execute() {

        try {

            this.importEnvVars();
            this.exportEnvVars();

            if (!this.options.skipStartupFiles) {
                this.runStartupFiles();
            }

        } catch (e) {
            throw e;
        }
    }

    private importEnvVars() {

        const envVars = CliManager.get<any>('env');

        if (envVars) {
            for (const envVar of envVars) {
                process.env[envVar.key] = envVar.value;
            }
        }
    }

    private exportEnvVars() {

        const allVars = process.env;
        const result = new Array();

        for (const key in allVars) {

            if (key) {
                const isBlacklisted = ['HOME', 'USER', 'USERNAME', 'LOGNAME', 'GROUP', 'UID', 'GID', 'SHELL'].some((data) => data === key);

                if (!isBlacklisted && allVars.hasOwnProperty(key)) {
                    result.push({
                        key,
                        value: allVars[key],
                    });
                }
            }
        }

        CliManager.set('env', result);
    }

    private runStartupFiles() {

    }
}
