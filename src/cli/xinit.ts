/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: xinit.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-03-26 15:02:08
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-03-26 23:19:50
 * @Description: This is description.
 */

import { Command } from 'commander';
import { Info } from '../helpers/Info';
import { CommandInfos } from './CommandInfos';
import { Log } from '../helpers/Log';
import { CliManager } from '../helpers/CliManager';


// Main Program
const program = new Command(CommandInfos.main.command)
    .version(Info.ProductVersion)
    .description(CommandInfos.main.description);

// Global Options
program
    .option('-l, --level <level>', `Defines the Log level, default level is 'warn':[verbose|info|warn|error|critical]`)
    .on('option:level', (data) => {
        CliManager.save('level', data);
        Log.info(`Parameter 'level' with value '${data}' is given`);
    });

// Commands
program
    .command(CommandInfos.service.command, CommandInfos.service.description);

CliManager.parseArguments(program);
