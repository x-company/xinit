/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Command } from 'commander';
import { CommandInfos } from './CommandInfos';
import { Log } from '../helpers/Log';
import { CliManager } from '../helpers/CliManager';
import { CreateCommand } from '../commands/service/CreateCommand';

const program = new Command(`${CommandInfos.main.command} ${CommandInfos.service.command}`)
    .description(CommandInfos.service.description);

program
    .command('create <name>')
    .description('Creates an new runit Service')
    .action(async (name) => {

        try {
            Log.verbose(`Command '${CommandInfos.main.command} ${CommandInfos.service.command} service' is called ...`);

            await new CreateCommand({
                name,
            }).invoke();

        } catch (err) {
            Log.error(err);
        }
    });

CliManager.parseArguments(program);
