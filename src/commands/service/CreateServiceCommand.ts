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
 * @Last Modified At: 2019-06-11 16:50:42
 * @Description: This is description.
 */

import fs from 'fs-extra';
import path from 'path';
import { Command } from '../../helpers/Command';
import { ServiceCommandOptions } from './ServiceCommandOptions';
import { Info } from '../../helpers/Info';
import { TemplateUpdateManager } from '../../updaters/TemplateUpdateManager';
import { ServiceUpdater } from '../../updaters/ServiceUpdater';

export class CreateServiceCommand extends Command<ServiceCommandOptions> {

    constructor(options?: ServiceCommandOptions) {
        super(options);
    }

    protected async execute() {

        try {

            // const projectRoot = Info.getProjectRoot();

            // const imageRoot = Info.getImageRoot(this.options.imageName, this.options.directory);
            // const buildDir = path.join(imageRoot, 'build');
            // const serviceDir = path.join(buildDir, 'services', this.options.serviceName);
            // const fsrootDir = path.join(serviceDir, 'fsroot');
            // const etcDir = path.join(fsrootDir, 'etc');
            // const xinitDir = path.join(etcDir, 'xinit');
            // const svDir = path.join(etcDir, 'sv', this.options.serviceName);
            // const eventsDir = path.join(xinitDir, 'events.d');
            // const postDir = path.join(eventsDir, 'post.d');
            // const preDir = path.join(eventsDir, 'prev.d');
            // const healthDir = path.join(xinitDir, 'health.d');

            // fs.ensureDirSync(buildDir);
            // fs.ensureDirSync(serviceDir);
            // fs.ensureDirSync(svDir);
            // fs.ensureDirSync(fsrootDir);
            // fs.ensureDirSync(etcDir);
            // fs.ensureDirSync(xinitDir);
            // fs.ensureDirSync(eventsDir);
            // fs.ensureDirSync(postDir);
            // fs.ensureDirSync(preDir);
            // fs.ensureDirSync(healthDir);

            // await this.createServiceInstallFile(serviceDir);
            // await this.createServiceFile(svDir);
            // await this.createHealthcheckFile(healthDir);
            // await this.registerServiceForBuild(buildDir);

            let directory = Info.getProjectRoot();
            if (this.options.directory) {
                directory = this.options.directory;
            }

            if(!this.options.imageName){
                throw new Error('No Image Name is given. Service could not created.');
            }

            const mgr = new TemplateUpdateManager({
                imageName: this.options.imageName,
                serviceName: this.options.serviceName,
                directory,
            });

            await mgr.update(new ServiceUpdater());

        } catch (e) {
            throw e;
        }
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
