/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: xinit-run.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-06-03 09:29:50
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-03 09:29:50
 * @Description: This is description.
 */



import { Command } from 'commander';
import { CommandInfos } from './CommandInfos';
import { Log } from '../helpers/Log';
import { CliManager } from '../helpers/CliManager';
import { RunCommand } from '../commands/run/RunCommand';
import signal, { SIGALRM } from 'constants';

let mainCommand = 'runit';
let skipStartupFiles = false;
let skipRunit = false;
let killallOnExit = true;

const program = new Command(`${CommandInfos.main.command} ${CommandInfos.run.command}`)
    .description(CommandInfos.run.description)
    .option('-c, --command <command>', 'The main command to run.', 'runit')
    .option('--skip-startup-files', 'Skip running /etc/xinit.d/* and /etc/rc.local')
    .option('--skip-runit', 'Do not run runit services')
    .option('--no-kill-all-on-exit', 'Don\'t kill all processes on the system upon exiting')
    .on('option:command', (data) => {
        mainCommand = data;
    })
    .on('option:skip-startup-files', () => {
        skipStartupFiles = true;
    })
    .on('option:skip-runit', () => {
        skipRunit = true;
    })
    .on('option:no-kill-all-on-exit', () => {
        killallOnExit = false;
    })
    .on('command:*', () => {

        try {
            Log.verbose(`Command '${CommandInfos.main.command} ${CommandInfos.run.command}' is called ...`);

            if (skipRunit && mainCommand === 'runit') {
                throw new Error('When --skip-runit is given, you must also pass a main command.');
            }

            process.on('SIGINT', () => {
                Log.warn('Init System aborted.');
                process.exit(2);
            });

            new RunCommand({
                mainCommand,
                skipRunit,
                skipStartupFiles,
                killallOnExit,
            }).invoke();


        } catch (err) {
            Log.error(err);
            process.exit(1);
        } finally {
            if (killallOnExit) {
                // const timeout = parseInt(process.env.KILL_ALL_PROCESSES_TIMEOUT, 10) || 5;
                // killAllProcesses(timeout);
            }
        }
    });

CliManager.parseArguments(program, false);


function killAllProcesses(limit: number) {

    try {

        // process.kill(-1, signal.SIGTERM);
    } catch (err) {
        Log.warn(err);
    }

    setTimeout(() => {
        process.emit('SIGALRM', 'SIGALRM');
    }, limit);

}
