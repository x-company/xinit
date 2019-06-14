/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: xinit-layout.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-03-27 17:00:02
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-03-27 17:02:08
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
    .command('create <name>')
    .description('Creates an new Layout to create new Services')
    .option('--configure-sourcelists', 'APT Source Lists can be configured. See fsroot/etc/xbuild for further Details.')
    .option('--without-default', 'Default Services will not installed.')
    .action(async (name, options) => {

        try {
            Log.verbose(`Command '${CommandInfos.main.command} ${CommandInfos.layout.command} create' is called ...`);

            await new CreateLayoutCommand({
                imageName: name,
                configureSourcelists: options.configureSourcelists,
                withoutDefault: options.withoutDefault,
            }).invoke();

        } catch (err) {
            Log.error(err);
        }
    });

CliManager.parseArguments(program);
