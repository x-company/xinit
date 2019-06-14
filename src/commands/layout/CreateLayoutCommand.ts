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
import { DockerComposeUpdater } from '../../updaters/DockerComposeUpdater';
import { DockerfileUpdater } from '../../updaters/DockerfileUpdater';
import { BuildfileUpdater } from '../../updaters/BuildfileUpdater';
import { DevContainerUpdater } from '../../updaters/DevContainerUpdater';
import { UnitTestsUpdater } from '../../updaters/UnitTestsUpdater';
import { Log } from '../../helpers/Log';

export class CreateLayoutCommand extends Command<LayoutCommandOptions> {

    private static defaultOptions: LayoutCommandOptions = {
        imageName: 'baseimage',
        configureSourcelists: false,
        withoutDefault: false,
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

            await mgr.update(new ProjectLayoutUpdater(this.options.configureSourcelists, this.options.withoutDefault, this.options.force));
            await mgr.update(new PackageJsonUpdater());
            await mgr.update(new AppVersionUpdater());
            await mgr.update(new ReadmeUpdater());
            await mgr.update(new DockerComposeUpdater());
            await mgr.update(new DockerfileUpdater());
            await mgr.update(new BuildfileUpdater());
            await mgr.update(new DevContainerUpdater());
            await mgr.update(new UnitTestsUpdater());

            Log.info('Layout for your new Base Image is now created.');

        } catch (e) {
            Log.error(e);
        }
    }
}
