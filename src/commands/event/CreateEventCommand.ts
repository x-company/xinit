/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: CreateEventCommand.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-03-26 21:47:35
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-14 00:37:01
 * @Description: This is description.
 */

import path from 'path';
import { Command } from '../../helpers/Command';
import { EventCommandOptions } from './EventCommandOptions';
import { Info } from '../../helpers/Info';
import { TemplateUpdateManager } from '../../updaters/TemplateUpdateManager';
import { EventUpdater } from '../../updaters/EventUpdater';
import { UpdaterOptions } from '../../updaters/UpdaterOptions';
import { Log } from '../../helpers/Log';

export class CreateEventCommand extends Command<EventCommandOptions> {

    constructor(options?: EventCommandOptions) {
        if (options) {
            options.init = true;
        }
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

            directory = path.join(directory, 'src', this.options.imageName, 'build', 'events');

            const updaterOptions: UpdaterOptions = {
                imageName: this.options.imageName,
                eventName: this.options.eventName,
                directory,
            };

            if (this.options.init) {
                updaterOptions.eventExtension = 'init';
                updaterOptions.directory = directory;
                await this.updateEventTemplate(updaterOptions);
            }

            if (this.options.prevInit) {
                updaterOptions.eventExtension = 'init';
                updaterOptions.directory = path.join(directory, 'prev');
                await this.updateEventTemplate(updaterOptions);
            }

            if (this.options.postInit) {
                updaterOptions.eventExtension = 'init';
                updaterOptions.directory = path.join(directory, 'post');
                await this.updateEventTemplate(updaterOptions);
            }

            if (this.options.shutdown) {
                updaterOptions.eventExtension = 'shutdown';
                updaterOptions.directory = directory;
                await this.updateEventTemplate(updaterOptions);
            }

            if (this.options.prevShutdown) {
                updaterOptions.eventExtension = 'shutdown';
                updaterOptions.directory = path.join(directory, 'prev');
                await this.updateEventTemplate(updaterOptions);
            }

            if (this.options.postShutdown) {
                updaterOptions.eventExtension = 'shutdown';
                updaterOptions.directory = path.join(directory, 'post');
                await this.updateEventTemplate(updaterOptions);
            }

            Log.info('Event for your Base Image is now created.');

        } catch (e) {
            Log.error(e);
        }
    }

    private async updateEventTemplate(updaterOptions: UpdaterOptions) {
        const mgr = new TemplateUpdateManager(updaterOptions);
        await mgr.update(new EventUpdater());
    }
}
