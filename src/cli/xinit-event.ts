/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: xinit-event.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-06-11 14:59:12
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-14 00:31:19
 * @Description: This is description.
 */

import { Command } from 'commander';
import { CommandInfos } from './CommandInfos';
import { Log } from '../helpers/Log';
import { CliManager } from '../helpers/CliManager';
import { CreateEventCommand } from '../commands/event/CreateEventCommand';

const program = new Command(`${CommandInfos.main.command} ${CommandInfos.event.command}`)
    .description(CommandInfos.event.description);

program
    .command('create <name>')
    .description('Create Events for xinit')
    .option('-i, --image <image>', 'The Name of the Base Image which the Service will created.')
    .option('--init', 'The event should run when xinit is starting.')
    .option('--prev-init', 'The event should run before xinit will started.')
    .option('--post-init', 'The event should run after xinit is started.')
    .option('--shutdown', 'The event should run when xinit is doing a shutdown.')
    .option('--prev-shutdown', 'The event should run before xinit will doing a shutdown.')
    .option('--post-shutdown', 'The event should run after xinit is stopped.')
    .action(async (name, options) => {

        try {
            Log.verbose(`Command '${CommandInfos.main.command} ${CommandInfos.event.command} create' is called ...`);

            await new CreateEventCommand({
                eventName: name,
                imageName: options.image,
                init: options.init,
                prevInit: options.prevInit,
                postInit: options.postInit,
                shutdown: options.shutdown,
                prevShutdown: options.prevShutdown,
                postShutdown: options.postShutdown,
            }).invoke();

        } catch (err) {
            Log.error(err);
        }
    });

CliManager.parseArguments(program);
