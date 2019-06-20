/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: xbuild.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-03-26 15:02:08
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-19 08:19:46
 * @Description: This is description.
 */

import { Command } from 'commander';
import { Info } from '../helpers/Info';
import { CommandInfos } from './CommandInfos';
import { Log } from '../helpers/Log';
import { CliManager } from '../helpers/CliManager';

// Reset Global Options
CliManager.set('level', 'info');
CliManager.set('directory', process.cwd());


// Main Program
const program = new Command(CommandInfos.main.command)
    .version(Info.ProductVersion)
    .description(CommandInfos.main.description);

// Global Options
program
    .option('-l, --level <level>', `Defines the Log level, default level is 'warn':[silly|debug|verbose|info|warn|error]`)
    .option('-d, --directory <directory>', 'Specifies the directory where layout should initialized.')
    .on('option:directory', (data) => {
        Log.verbose(`Parameter 'directory' with value '${data}' is given`);
        CliManager.set('directory', data);
    })
    .on('option:level', (data) => {
        CliManager.set('level', data);
        Log.verbose(`Parameter 'level' with value '${data}' is given`);
    });

// Commands
program
    .command(CommandInfos.layout.command, CommandInfos.layout.description)
    .command(CommandInfos.service.command, CommandInfos.service.description);

CliManager.parseArguments(program);
