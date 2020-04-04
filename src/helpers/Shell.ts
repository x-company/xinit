/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: Shell.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-06-10 16:17:05
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-10 16:40:04
 * @Description: This is description.
 */

import sh, { ExecOutputReturnValue } from 'shelljs';
import { Log } from '../helpers/Log';
import { ShellOptions } from './ShellOptions';
import { spawn, ChildProcess } from 'child_process';

export class Shell {

    public static async execute(cmd: string, options?: ShellOptions): Promise<string> {

        try {
            Log.verbose(`Execute Shell Command '${cmd}'`);
            const defaultOptions = this.defaultShellOptions(options);

            const child = sh.exec(`${cmd}`, {
                async: true,
                silent: defaultOptions.silent || false,
                cwd: defaultOptions.cwd || process.cwd(),
                windowsHide: defaultOptions.windowsHide || true,
            }) as ChildProcess;

            return await this.processChild(cmd, child, defaultOptions.silent);

        } catch (err) {
            throw err;
        }
    }

    public static async spawn(cmd: string, args?: string[], options?: ShellOptions): Promise<string> {

        try {
            Log.verbose(`Spawn Shell Command '${cmd}'`);
            const defaultOptions = this.defaultShellOptions(options);

            let cmdAsString = `${cmd}`;
            if (args) {
                cmdAsString += ` ${args.join(' ')}`;
            }

            const child = spawn(cmd, args, {
                ...defaultOptions,
            });

            return await this.processChild(cmdAsString, child, defaultOptions.silent);
        } catch (err) {
            throw err;
        }
    }

    private static processChild(command: string, child: ChildProcess, isSilent: boolean): Promise<string> {

        return new Promise<string>((resolve, reject) => {

            try {

                const results = new Array();
                const errorResults = new Array();

                if (child.stdout) {
                    child.stdout.setEncoding('utf-8');
                    child.stdout.on('data', (data) => results.push(data));
                }

                if (child.stderr) {
                    child.stderr.setEncoding('utf-8');
                    child.stderr.on('data', (data) => errorResults.push(data));
                }

                child.on('exit', (code) => {
                    let errorDetails: string | null = null;
                    if (errorResults.length > 0) {
                        errorDetails = errorResults.join('\n');
                    }

                    if (code && code > 0) {
                        let errorMessage = `An unknown Error occurred while execute command '${command}'!`;
                        if (errorDetails) {
                            errorMessage = `An Error occurred while execute command '${command}'!\n`;
                            errorMessage += errorDetails;
                        }
                        reject(errorMessage);
                    } else {
                        if (errorDetails) {
                            if (!isSilent) {
                                Log.warn(`Command '${command}' was successful executed, but we have some warnings ...`);
                                Log.warn(errorDetails);
                            }
                        }

                        resolve(results.join('\n'));

                    }
                });

                if (child.stdin) {
                    child.stdin.end();
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    private static defaultShellOptions(options?: ShellOptions) {

        return {
            cwd: process.cwd(),
            windowsHide: true,
            detached: true,
            shell: true,
            silent: false,
            ...options,
        };
    }
}
