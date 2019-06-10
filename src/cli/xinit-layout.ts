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
import { CreateCommand } from '../commands/layout/CreateCommand';

const program = new Command(`${CommandInfos.main.command} ${CommandInfos.layout.command}`)
    .description(CommandInfos.layout.description);

program
    .command('create <name>')
    .description('Creates an new Layout to create new Services')
    .action(async (name, options) => {

        try {
            Log.verbose(`Command '${CommandInfos.main.command} ${CommandInfos.layout.command} create' is called ...`);

            await new CreateCommand({
                imageName: name
            }).invoke();

        } catch (err) {
            Log.error(err);
        }
    });

CliManager.parseArguments(program);
