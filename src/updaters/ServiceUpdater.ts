/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: ServiceUpdater.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-06-11 12:18:35
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-20 12:14:55
 * @Description: This is description.
 */

import fs from 'fs-extra';
import path from 'path';
import { Updater } from './Updater';
import { Log } from '../helpers/Log';

export class ServiceUpdater extends Updater {

    constructor(
        private addFinish: boolean,
        private addFix: boolean,
        private addInit: boolean,
        private addLog: boolean,
        private addRules: boolean,
        private addShutdown: boolean,
        private priority: number,

        private shouldModify: boolean = false) {

        super();

    }

    public async update() {

        if (!this.shouldModify) {
            Log.info(`Create new Service '${this.options.serviceName}'`);
        } else {
            Log.info(`Modify Service '${this.options.serviceName}'`);
        }

        if (!this.options.serviceName) {
            throw new Error('No Service Name is given. Service could not updated.');
        }

        const buildDir = path.join(this.options.directory, 'src', this.options.imageName, 'build');
        const serviceDir = path.join(buildDir, 'services', this.options.serviceName);

        await fs.ensureDir(serviceDir);

        await this.updateBuildFile(serviceDir);
        await this.updateRunFile(serviceDir);
        await this.updateHealthcheckFile(serviceDir);

        if (this.addFinish) {
            await this.updateFinishFile(serviceDir);
        }

        if (this.addFix) {
            await this.updateAttributeFixFile(serviceDir, this.priority);
        }

        if (this.addInit) {
            await this.updateInitFile(serviceDir, this.priority);
        }

        if (this.addLog) {
            //await this.updatelo
        }

        if (this.addRules) {
            // await this.update
        }

        if (this.addShutdown) {
            //await this.update
        }
    }

    private async updateBuildFile(directory: string) {

        const content = `#!/usr/bin/env bash
# -*- coding: utf-8 -*-

# Main Build File for your Service
#
# POWERTIP: Use Snippet xb-service to create a Sample
# Hint: Look also for other Snippets with the Prefix 'xb-...'

`;
        await this.saveFile(directory, `${this.options.serviceName}.build`, 'Build', content);
    }

    private async updateRunFile(directory: string) {

        const content = `#!/usr/bin/env bash
# -*- coding: utf-8 -*-

# File will called to start your Service
#
# POWERTIP: Use Snippet xb-service-run to create a Sample
# Hint: Look also for other Snippets with the Prefix 'xb-...'

`;
        await this.saveFile(directory, `${this.options.serviceName}.run`, 'Run', content);
    }

    private async updateHealthcheckFile(directory: string) {

        const content = `#!/usr/bin/env bash
# -*- coding: utf-8 -*-

# Define here the Health Check for your Service
#
# POWERTIP: Use Snippet xb-health to create a Sample
# Hint: Look also for other Snippets with the Prefix 'xb-...'

`;
        await this.saveFile(directory, `${this.options.serviceName}.health`, 'Health', content);
    }

    private async updateFinishFile(directory: string) {

        const content = `#!/usr/bin/execlineb -S0

# A Service Finish Script

`;
        await this.saveFile(directory, `${this.options.serviceName}.finish`, 'Finish', content);
    }

    private async updateAttributeFixFile(directory: string, priority: number) {

        const content = `# Fixing ownership & permissions
#
# path              recurse account fmode   dmode
# /var/lib/mysql    true    mysql   0600    0700

`;
        await this.saveFile(directory, `${this.options.serviceName}.attrs`, 'Fix Attributes', content, priority);
    }

    private async updateInitFile(directory: string, priority: number) {

        const content = `#!/usr/bin/execlineb -P

# Executing container initialization tasks


`;
        await this.saveFile(directory, `${this.options.serviceName}.init`, 'Init', content, priority);
    }

    private async saveFile(directory: string, filename: string, context: string, content: string, priority?: number) {

        Log.info(`Create Service File for Context '${context}'`);

        if (priority) {
            const prioString = this.convertPriority(priority);
            filename = `${prioString}-${filename}`;
        }

        const file = path.join(directory, filename);
        if (!fs.existsSync(file)) {

            await fs.writeFile(file, content, { encoding: 'utf-8' });
            await fs.chmod(file, 0o755);
        } else {
            Log.warn(`Service File for Context '${context}' could not created. File already exists.`);
        }
    }
    private convertPriority(priority: number): string {

        const prioAsString = priority.toString();

        if (prioAsString.length === 1) {
            return `0${prioAsString}`;
        }
        return prioAsString;
    }
}
