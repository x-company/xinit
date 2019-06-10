/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: RunCommand.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-03-27 20:35:42
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-10 16:54:51
 * @Description: This is description.
 */

import { Command } from '../../helpers/Command';
import { RunCommandOptions } from './RunCommandOptions';
import { CliManager } from '../../helpers/CliManager';
import { ChildProcess, spawn } from 'child_process';
import os from 'os';
import { Log } from '../../helpers/Log';
import { Shell } from '../../helpers/Shell';
import { wait } from '../../helpers/HelperFunctions';

export class RunCommand extends Command<RunCommandOptions> {

    private static runningProcesses: ChildProcess[] = new Array();

    private static KILL_PROCESS_TIMEOUT: number = 5;

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

        if (!this.options.skipStartupFiles) {
            this.runStartupFiles();
        }

        if (!this.options.skipRunit) {
            await this.startRunit();
        }

        try {

            // Implement Logik


        } catch (e) {
            throw e;
        } finally {
            if (!this.options.skipRunit) {
                await this.shutdownRunitServices();
                await this.waitForRunitServices();
            }
        }
    }

    private async runStartupFiles() {
        throw new Error('Not implemented');
    }

    private async startRunit() {

        Log.info('Booting runit daemon');

        return Shell.execute('/usr/bin/runsvdir', {
            cwd: '/usr/bin/runsvdir',
            detached: true,
            silent: true,
            windowsHide: true,
        });
    }

    private async shutdownRunitServices(quiet: boolean = false) {
        if (!quiet) {
            Log.debug('Begin shutting down runit services...');
        }

        const cmd = `/usr/bin/sv -w ${RunCommand.KILL_PROCESS_TIMEOUT} down /etc/service/* > /dev/null`;
        return Shell.execute(cmd, {
            cwd: '/usr/bin',
            detached: true,
            windowsHide: true,
        });
    }

    private async waitForRunitServices() {

        Log.debug('Waiting for runit services to exit...');
        let done = false;
        while (!done) {
            const cmd = '/usr/bin/sv status /etc/service/* | grep -q \'^run:\'';
            const result = await Shell.execute(cmd, {
                cwd: '/usr/bin',
                detached: false,
                windowsHide: true,
            });

            if (result && result !== '0') {
                done = true;
            }

            if (!done) {
                wait(100);

                // According to https://github.com/phusion/baseimage-docker/issues/315
                // there is a bug or race condition in Runit, causing it
                // not to shutdown services that are already being started.
                // So during shutdown we repeatedly instruct Runit to shutdown
                // services.
                this.shutdownRunitServices(true);
            }
        }
    }
}
