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

export class ServiceUpdater extends Updater {

    public async update() {

        if (!this.options.serviceName) {
            throw new Error('No Service Name is given. Service could not updated.');
        }

        const buildDir = path.join(this.options.directory, 'src', this.options.imageName, 'build');

        const serviceDir = path.join(buildDir, 'services', this.options.serviceName);
        const fsrootDir = path.join(buildDir, 'fsroot');
        const eventsDir = path.join(buildDir, 'events');

        await fs.ensureDir(serviceDir);
        await fs.ensureDir(fsrootDir);
        await fs.ensureDir(eventsDir);

        await this.updateServiceInstallFile(serviceDir);
        await this.updateServiceFile(serviceDir);
        await this.updateHealthcheckFile(serviceDir);
        await this.updateReadmeFile(fsrootDir);
    }

    private async updateServiceInstallFile(directory: string) {

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
        }
    }

    private async updateServiceFile(directory: string) {

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
        }
    }

    private async updateHealthcheckFile(directory: string) {

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
        }
    }

    private async updateReadmeFile(directory: string) {

        const file = path.join(directory, `README.md`);
        if (!fs.existsSync(file)) {

            const content = `# Place here your Files which should deployed to your Docker Image

## For Example

You want deploy a File in your Docker Image to Location \`/etc/myfolder/myfile.txt\`. So you have to create
a Folder under *fsroot* \`etc/myfolder\` and place your File \`myfile.txt\` in it. The Install Process will
copy this File to your Docker Image to the given Location.

Remarks! Don't forget to set the right Permission in your Service Install File.

`;
            await fs.writeFile(file, content, { encoding: 'utf-8' });
            await fs.chmod(file, 0o755);
        }
    }
}
