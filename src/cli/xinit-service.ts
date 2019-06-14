/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: xinit-service.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-06-03 09:30:10
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-14 01:03:55
 * @Description: This is description.
 */



import { Command } from 'commander';
import { CommandInfos } from './CommandInfos';
import { Log } from '../helpers/Log';
import { CliManager } from '../helpers/CliManager';
import { CreateServiceCommand } from '../commands/service/CreateServiceCommand';

const program = new Command(`${CommandInfos.main.command} ${CommandInfos.service.command}`)
    .description(CommandInfos.service.description);

program
    .command('create <name>')
    .description('Creates an new runit Service')
    .option('-i, --image <image>', 'The Name of the Base Image which the Service will created.')
    .action(async (name, options) => {

        try {
            Log.verbose(`Command '${CommandInfos.main.command} ${CommandInfos.service.command} create' is called ...`);

            await new CreateServiceCommand({
                serviceName: name,
                imageName: options.image,
            }).invoke();

        } catch (err) {
            Log.error(err);
        }
    });

CliManager.parseArguments(program);
