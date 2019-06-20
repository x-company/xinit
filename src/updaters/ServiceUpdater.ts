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
 * @Last Modified At: 2019-06-11 17:45:34
 * @Description: This is description.
 */

import fs from 'fs-extra';
import path from 'path';
import { Updater } from './Updater';
import { Log } from '../helpers/Log';

export class ServiceUpdater extends Updater {

    public async update() {

        Log.info('Create new Service');

        if (!this.options.serviceName) {
            throw new Error('No Service Name is given. Service could not updated.');
        }

        const buildDir = path.join(this.options.directory, 'src', this.options.imageName, 'build');
        const serviceDir = path.join(buildDir, 'services', this.options.serviceName);

        await fs.ensureDir(serviceDir);

        await this.updateServiceBuildFile(serviceDir);
        await this.updateServiceFile(serviceDir);
        await this.updateHealthcheckFile(serviceDir);
    }

    private async updateServiceBuildFile(directory: string) {

        Log.info('Create Buildfile for the Service');
        const file = path.join(directory, `${this.options.serviceName}.build`);
        if (!fs.existsSync(file)) {

            const content = `#!/usr/bin/env bash
# -*- coding: utf-8 -*-

# Main Build File for your Service
#
# POWERTIP: Use Snippet xb-service to create a Sample
# Hint: Look also for other Snippets with the Prefix 'xb-...'

`;
            await fs.writeFile(file, content, { encoding: 'utf-8' });
            await fs.chmod(file, 0o755);
        } else {
            Log.warn('Buildfile could not created. File already exists.');
        }
    }

    private async updateServiceFile(directory: string) {

        Log.info('Create Service Run File');

        const file = path.join(directory, `${this.options.serviceName}.run`);
        if (!fs.existsSync(file)) {
            const content = `#!/usr/bin/env bash
# -*- coding: utf-8 -*-

# File will called to start your Service
#
# POWERTIP: Use Snippet xb-service-run to create a Sample
# Hint: Look also for other Snippets with the Prefix 'xb-...'

`;
            await fs.writeFile(file, content, { encoding: 'utf-8' });
            await fs.chmod(file, 0o755);
        } else {
            Log.warn('Service Run File could not created. File already exists.');
        }
    }

    private async updateHealthcheckFile(directory: string) {

        Log.info('Create Service Health File');

        const file = path.join(directory, `${this.options.serviceName}.health`);
        if (!fs.existsSync(file)) {
            const content = `#!/usr/bin/env bash
# -*- coding: utf-8 -*-

# Define here the Health Check for your Service
#
# POWERTIP: Use Snippet xb-health to create a Sample
# Hint: Look also for other Snippets with the Prefix 'xb-...'

`;
            await fs.writeFile(file, content, { encoding: 'utf-8' });
            await fs.chmod(file, 0o755);
        } else {
            Log.warn('Service Health File could not created. File already exists.');
        }
    }

    private async updateServiceFinishFile(directory: string) {

        Log.info('Create Service Finish File');

        const file = path.join(directory, `${this.options.serviceName}.finish`);
        if (!fs.existsSync(file)) {
            const content = `#!/usr/bin/execlineb -S0

# A Service Finish Script

`;
            await fs.writeFile(file, content, { encoding: 'utf-8' });
            await fs.chmod(file, 0o755);
        } else {
            Log.warn('Service Finish File could not created. File already exists.');
        }
    }

    private async updateServiceAttributeFix(directory: string, priority: number) {

        Log.info('Create Attribute Fix File');

        const file = path.join(directory, `${this.convertPriority(priority)}-${this.options.serviceName}.attrs`);
        if (!fs.existsSync(file)) {
            const content = `# Fixing ownership & permissions
#
# path              recurse account fmode   dmode
# /var/lib/mysql    true    mysql   0600    0700

`;
            await fs.writeFile(file, content, { encoding: 'utf-8' });
            await fs.chmod(file, 0o755);
        } else {
            Log.warn('Service Attribute Fix File could not created. File already exists.');
        }
    }

    private async updateContainerInitFile(directory: string, priority: number) {

        Log.info('Create Container Init File');

        const file = path.join(directory, `${this.convertPriority(priority)}-${this.options.serviceName}.attrs`);
        if (!fs.existsSync(file)) {
            const content = `#!/usr/bin/execlineb -P

# Executing container initialization tasks


`;
            await fs.writeFile(file, content, { encoding: 'utf-8' });
            await fs.chmod(file, 0o755);
        } else {
            Log.warn('Container Init File could not created. File already exists.');
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
