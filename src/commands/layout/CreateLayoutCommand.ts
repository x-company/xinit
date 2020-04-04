/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: CreateLayoutCommand.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-03-27 12:17:18
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-11 14:05:40
 * @Description: This is description.
 */

import { Command } from '../../helpers/Command';
import { LayoutCommandOptions } from './LayoutCommandOptions';
import { Info } from '../../helpers/Info';
import { TemplateUpdateManager } from '../../updaters/TemplateUpdateManager';
import { PackageJsonUpdater } from '../../updaters/PackageJsonUpdater';
import { ProjectLayoutUpdater } from '../../updaters/ProjectLayoutUpdater';
import { ReadmeUpdater } from '../../updaters/ReadmeUpdater';
import { AppVersionUpdater } from '../../updaters/AppVersionUpdater';
import { DockerfileUpdater } from '../../updaters/DockerfileUpdater';
import { DevContainerUpdater } from '../../updaters/DevContainerUpdater';
import { UnitTestsUpdater } from '../../updaters/UnitTestsUpdater';
import { Log } from '../../helpers/Log';
import { Shell } from '../../helpers/Shell';

export class CreateLayoutCommand extends Command<LayoutCommandOptions> {

    private static defaultOptions: LayoutCommandOptions = {
        imageName: 'xcompany/baseimage',
        withCron: false,
        withProjectLayout: false,
        force: false,
    };
    constructor(options?: LayoutCommandOptions) {

        super({
            ...CreateLayoutCommand.defaultOptions,
            ...options,
        });
    }

    protected async execute() {

        try {

            let directory = Info.getProjectRoot();
            if (this.options.directory) {
                directory = this.options.directory;
            }

            const mgr = new TemplateUpdateManager({
                imageName: this.options.imageName,
                directory,
            });

            await mgr.update(new ProjectLayoutUpdater(this.options.withCron, this.options.withProjectLayout, this.options.force));
            await mgr.update(new DockerfileUpdater(this.options.withProjectLayout));
            if (this.options.withProjectLayout) {
                await mgr.update(new AppVersionUpdater());
                await mgr.update(new PackageJsonUpdater());
                await mgr.update(new ReadmeUpdater());
                await mgr.update(new DevContainerUpdater());
                await mgr.update(new UnitTestsUpdater());
            }

            Log.info('Your new Layout is nearly done. Only one thing is left.');
            Log.info(`Execute 'yarn install'. This could take a while. Please be patient.`);

            try {
                await Shell.execute('yarn install', { detached: false, silent: true, windowsHide: true });
            } catch (err) {
                // Nothing to do
            }

            Log.info('Layout for your new Base Image is now created.');

        } catch (e) {
            Log.error(e);
        }
    }
}
