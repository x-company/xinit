/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: xbuild-service.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-06-03 09:30:10
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-20 12:29:54
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
    .command('create')
    .description('Creates an new Service')
    .option('-n, --name <name>', 'The Name of the Service')
    .option('--add-fix', 'Add Attribute Fix to modify the Security of folders and files.')
    .option('--add-init', 'Add Init Script which will executed when a container starts.')
    .option('--add-shutdown', 'Add Shutdown Script which will executed when a Container shutdowns.')
    .option('--add-finish', 'Add Service Finish Script which will executed when Service will shutdown.')
    .option('--add-health', 'Add Script to check the Healthiness of your Service.')
    .option('--add-log', 'Add Log Script for the Service.')
    .option('-p, --priority <prio>', 'The Priority when the choosed option should run. A value between 1-98. 99 is the highest Prio and is reserved for the system.', 10)
    .action(async (options) => {

        try {
            Log.verbose(`Command '${CommandInfos.main.command} ${CommandInfos.service.command} create' is called ...`);

            let serviceName = '';
            if (typeof options.name !== 'function') {
                serviceName = options.name;
            }

            await new CreateServiceCommand({
                serviceName,
                addFinish: options.addFinish,
                addFix: options.addFix,
                addInit: options.addInit,
                addLog: options.addLog,
                addShutdown: options.addShutdown,
                addHealth: options.addHealth,
                priority: options.priority,
            }).invoke();

        } catch (err) {
            Log.error(err);
        }
    });

program
    .command('modify')
    .description('Modifies a Service')
    .option('-n, --name <name>', 'The Name of the Service')
    .option('--add-fix', 'Add Attribute Fix to modify the Security of folders and files.')
    .option('--add-init', 'Add Init Script which will executed when a container starts.')
    .option('--add-shutdown', 'Add Shutdown Script which will executed when a Container shutdowns.')
    .option('--add-finish', 'Add Service Finish Script which will executed when Service will shutdown.')
    .option('--add-health', 'Add Script to check the Healthiness of your Service.')
    .option('--add-log', 'Add Log Script for the Service.')
    .option('-p, --priority <prio>', 'The Priority when the choosed option should run. A value between 1-98. 99 is the highest Prio and is reserved for the system.', 10)
    .action(async (options) => {

        try {
            Log.verbose(`Command '${CommandInfos.main.command} ${CommandInfos.service.command} modify' is called ...`);

            let serviceName = '';
            if (typeof options.name !== 'function') {
                serviceName = options.name;
            }

            await new CreateServiceCommand({
                serviceName,
                addFinish: options.addFinish,
                addFix: options.addFix,
                addInit: options.addInit,
                addLog: options.addLog,
                addShutdown: options.addShutdown,
                addHealth: options.addHealth,
                priority: options.priority,
            }, true).invoke();

        } catch (err) {
            Log.error(err);
        }
    });

CliManager.parseArguments(program);
