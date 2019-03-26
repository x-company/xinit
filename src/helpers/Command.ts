/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: Command.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-03-26 21:48:40
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-03-27 00:37:11
 * @Description: This is description.
 */

import os from 'os';
import { CommandOptions } from './CommandOptions';
import { Log } from './Log';
import { CliManager } from './CliManager';

export abstract class Command<TOptions extends CommandOptions> {

    protected options: TOptions;

    constructor(options?: TOptions) {

        const defaultOptions = {
            directory: options && options.directory ? CliManager.getDirectory(options.directory) : CliManager.getDirectory(),
            user: options && options.user ? options.user : os.userInfo().username,
        };

        if (options) {
            this.options = {
                ...defaultOptions,
                ...options,
            };
        } else {
            this.options = defaultOptions as TOptions;
        }

    }

    public async invoke() {

        try {

            Log.info('Command was invoked');

            Log.verbose('Running the command');
            const commandResult = await this.execute();
            return commandResult;

        } catch (err) {
            throw err;
        }
    }

    protected abstract async execute(): Promise<any>;
}
