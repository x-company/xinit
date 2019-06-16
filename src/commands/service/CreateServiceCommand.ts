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
import { Log } from '../../helpers/Log';

export class CreateServiceCommand extends Command<ServiceCommandOptions> {

    constructor(options?: ServiceCommandOptions) {
        super(options);
    }

    protected async execute() {

        try {

            let directory = Info.getProjectRoot();
            if (this.options.directory) {
                directory = this.options.directory;
            }

            if (!this.options.imageName) {
                throw new Error('No Image Name is given. Service could not created.');
            }

            const mgr = new TemplateUpdateManager({
                imageName: this.options.imageName,
                serviceName: this.options.serviceName,
                directory,
            });

            await mgr.update(new ServiceUpdater());

            Log.info('Event for your Base Image is now created.');

        } catch (e) {
            Log.error(e);
        }
    }
}
