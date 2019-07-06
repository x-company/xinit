/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: xbuild-layout.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-03-27 17:00:02
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-19 08:26:24
 * @Description: This is description.
 */



import { Command } from 'commander';
import { CommandInfos } from './CommandInfos';
import { Log } from '../helpers/Log';
import { CliManager } from '../helpers/CliManager';
import { CreateLayoutCommand } from '../commands/layout/CreateLayoutCommand';

const program = new Command(`${CommandInfos.main.command} ${CommandInfos.layout.command}`)
    .description(CommandInfos.layout.description);

program
    .command('create')
    .description('Creates an new Layout to create new Services')
    .option('-n, --name <name>', 'The Name of the Image')
    .option('--with-cron', 'Adds the Cron Service to your Images.')
    .option('--with-project-layout', 'Deploys the Image with a default Project Layout to develop an new Base Image.')
    .option('-f, --force', 'Overwrites the Layout. Attention! This will delete already created Services and Events.')
    .action(async (options) => {

        try {
            Log.verbose(`Command '${CommandInfos.main.command} ${CommandInfos.layout.command} create' is called ...`);

            let imageName = '';
            if (typeof options.name !== 'function') {
                imageName = options.name;
            }

            await new CreateLayoutCommand({
                imageName,
                withCron: options.withCron,
                withProjectLayout: options.withProjectLayout,
                force: options.force,
            }).invoke();

        } catch (err) {
            Log.error(err);
        }
    });

CliManager.parseArguments(program);
