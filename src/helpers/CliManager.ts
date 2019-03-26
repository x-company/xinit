/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Command } from 'commander';
import { Info } from '../helpers/Info';

export class CliManager {

    public static parseArguments(program: Command) {

        if (!process.argv.slice(2).length) {
            console.log();
            program.outputHelp();
            console.log();
            process.exit();
        }
        program.parse(process.argv);
    }

    public static save(key: string, value: any) {
        Info.Store.set(key, value);
    }

    public static load(key: string): any {
        return Info.Store.get(key);
    }
}
