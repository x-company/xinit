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
 * @Last Modified At: 2019-06-14 12:24:50
 * @Description: This is description.
 */

import fs from 'fs-extra';
import path from 'path';
import { Command } from '../../helpers/Command';
import { RunCommandOptions } from './RunCommandOptions';
import { EventMode } from './EventMode';
import { Log } from '../../helpers/Log';
import { Shell } from '../../helpers/Shell';
import { wait } from '../../helpers/HelperFunctions';

export class RunCommand extends Command<RunCommandOptions> {

    private static KILL_PROCESS_TIMEOUT: number = 5;

    private eventsDir = '/etc/xinit/events.d/';

    constructor(options?: RunCommandOptions) {
        super({
            mainCommand: 'runit',
            skipStartupFiles: false,
            killallOnExit: true,
            skipRunit: false,
            ...options,
        });
    }

    protected async execute() {

        // Run Prev Startups
        if (!this.options.skipStartupFiles) {
            this.runEventFiles(EventMode.PREV);
        }

        // Run Startups
        if (!this.options.skipStartupFiles) {
            this.runEventFiles();
        }

        // Run Runit
        if (!this.options.skipRunit) {
            await this.startRunit();
        }

        // Run Post Startups
        if (!this.options.skipStartupFiles) {
            this.runEventFiles(EventMode.POST);
        }

        try {
            if (this.options.mainCommand && this.options.mainCommand === 'runit') {

            } else {

            }
            // Implement Logik

        } catch (e) {
            throw e;
        } finally {
            if (!this.options.skipRunit) {
                await this.runEventFiles(EventMode.PREV, false);

                await this.runEventFiles(EventMode.NONE, false);

                await this.shutdownRunitServices();
                await this.waitForRunitServices();

                await this.runEventFiles(EventMode.POST, false);
            }
        }
    }

    private async runEventFiles(mode: EventMode = EventMode.NONE, isStartup: boolean = true) {

        let directory = this.eventsDir;
        if (mode === EventMode.PREV) {
            directory = path.join(this.eventsDir, 'prev.d');
        }

        if (mode === EventMode.POST) {
            directory = path.join(this.eventsDir, 'post.d');
        }

        const files = await fs.readdir(directory);
        const extension = isStartup ? '.init' : '.shutdown';

        files
            .filter((file) => file.endsWith(extension))
            .forEach(async (file) => {
                Log.info(`Start File ${file}`);
                await Shell.execute(file, {
                    cwd: directory,
                    detached: true,
                    silent: true,
                    windowsHide: true,
                });
            });
    }

    private async startRunit() {

        Log.info('Booting runit daemon');

        await Shell.execute('/usr/bin/runsvdir -P /etc/service', {
            cwd: '/usr/bin',
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

    private async waitpid_reap_other_children(){

    }
}
