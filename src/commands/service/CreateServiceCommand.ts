/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: CreateServiceCommand.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-03-26 21:47:35
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-10 20:14:57
 * @Description: This is description.
 */

import fs from 'fs-extra';
import path from 'path';
import { Command } from '../../helpers/Command';
import { ServiceCommandOptions } from './ServiceCommandOptions';
import { Info } from '../../helpers/Info';

export class CreateServiceCommand extends Command<ServiceCommandOptions> {


    constructor(options?: ServiceCommandOptions) {
        super(options);
    }

    protected async execute() {

        try {

            const imageRoot = Info.getImageRoot(this.options.imageName, this.options.directory);
            const buildDir = path.join(imageRoot, 'build');
            const serviceDir = path.join(buildDir, 'services', this.options.serviceName);
            const fsrootDir = path.join(serviceDir, 'fsroot');
            const etcDir = path.join(fsrootDir, 'etc');
            const xinitDir = path.join(etcDir, 'xinit');
            const svDir = path.join(etcDir, 'sv', this.options.serviceName);
            const eventsDir = path.join(xinitDir, 'events.d');
            const postDir = path.join(eventsDir, 'post.d');
            const preDir = path.join(eventsDir, 'prev.d');
            const healthDir = path.join(xinitDir, 'health.d');

            fs.ensureDirSync(buildDir);
            fs.ensureDirSync(serviceDir);
            fs.ensureDirSync(svDir);
            fs.ensureDirSync(fsrootDir);
            fs.ensureDirSync(etcDir);
            fs.ensureDirSync(xinitDir);
            fs.ensureDirSync(eventsDir);
            fs.ensureDirSync(postDir);
            fs.ensureDirSync(preDir);
            fs.ensureDirSync(healthDir);

            await this.createServiceInstallFile(serviceDir);
            await this.createServiceFile(svDir);
            await this.createHealthcheckFile(healthDir);
            await this.registerServiceForBuild(buildDir);

        } catch (e) {
            throw e;
        }
    }

    private async createServiceInstallFile(directory: string) {

        const content = `#!/usr/bin/env bash
# -*- coding: utf-8 -*-

# Load the xBuild System
source /usr/local/include/xbuild/loader

# Enable Debug Mode
# debug --on

# Enable Debug Mode inclusive Debug Outputs from Shell
# debug --on --dev

# Load the Environment Variables to the current Session
loadvars

# For Debug you can print current Vars
# printvars

# Install here your Service for example we show how to install mariadb
# install --packages mariadb

# Persist Environment Variables
savevars

`;
        const scriptFileName = path.join(directory, `${this.options.serviceName}.build`);
        await fs.writeFile(scriptFileName, content, { encoding: 'utf-8' });
    }

    private async createServiceFile(directory: string) {

        const content = `#!/usr/bin/env bash
# -*- coding: utf-8 -*-

# Load the xBuild System
source /usr/local/include/xbuild/loader

# Enable Debug Mode
# debug --on

# Enable Debug Mode inclusive Debug Outputs from Shell
# debug --on --dev

# Load the Environment Variables to the current Session
loadvars

# For Debug you can print current Vars
# printvars

# Execute the Service
exec 2>&1
exec <Service Command>

`;

        // const scriptFileName = path.join(directory, 'run');
        const scriptFileName = path.join(directory, 'run');
        await fs.writeFile(scriptFileName, content, { encoding: 'utf-8' });

    }

    private async createHealthcheckFile(directory: string) {

        const content = `#!/usr/bin/env bash
# -*- coding: utf-8 -*-

# Load the xBuild System
source /usr/local/include/xbuild/loader

# Enable Debug Mode
# debug --on

# Enable Debug Mode inclusive Debug Outputs from Shell
# debug --on --dev

# Load the Environment Variables to the current Session
loadvars

# For Debug you can print current Vars
# printvars

# Place here your Health Check Tests

# When everything is ok, than return 0, otherwise return 1
exit 0
`;

        const scriptFileName = path.join(directory, `${this.options.serviceName}.health`);
        await fs.writeFile(scriptFileName, content, { encoding: 'utf-8' });
        await fs.chmod(scriptFileName, 0o755);
    }

    private async registerServiceForBuild(directory: string) {

        const buildFile = path.join(directory, 'build.sh');

        if (fs.existsSync(buildFile)) {

            let content = await fs.readFile(buildFile, {
                encoding: 'utf8',
            });

            const lines = content.split('\n');
            content = '';

            lines.forEach((line) => {
                if (line.startsWith('services=')) {
                    line = `${line}${this.options.serviceName} `;
                }
                content += `${line}\n`;
            });

            await fs.writeFile(buildFile, content, { encoding: 'utf8'});
        }
    }
}
