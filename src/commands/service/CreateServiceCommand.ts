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
 * @Last Modified At: 2019-06-20 12:30:19
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

    constructor(options?: ServiceCommandOptions, private shouldModify: boolean = false) {
        super({
            addFinish: false,
            addFix: false,
            addInit: false,
            addLog: false,
            addRules: false,
            addShutdown: false,
            priority: 10,
            serviceName: 'NewService',
            ...options,
        });
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

            await mgr.update(new ServiceUpdater(
                this.options.addFinish,
                this.options.addFix,
                this.options.addInit,
                this.options.addLog,
                this.options.addRules,
                this.options.addShutdown,
                this.options.priority,
                this.shouldModify));

            Log.info(`Service '${this.options.serviceName}' for your Base Image is now created.`);

        } catch (e) {
            Log.error(e);
        }
    }
}
