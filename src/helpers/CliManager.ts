/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import fs from 'fs-extra';
import path from 'path';
import findRoot from 'find-root';
import { Command } from 'commander';
import { Info } from '../helpers/Info';
import { Log } from './Log';

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

    public static set(key: string, value: any) {
        Info.Store.set(key, value);
    }

    public static get<T>(key: string): T | null {
        const result = Info.Store.get(key);
        try {
            const test: T = result as T;
            if (typeof test === 'boolean') {
                return test;
            } else {
                if (test) {
                    return test;
                }
            }
            return null;
        } catch (error) {
            return null;
        }
    }

    public static clear() {
        Log.verbose('Clear the Store');
        Info.Store.clear();
    }

    public static getDirectory(baseDirectory?: string): string {

        if (!baseDirectory) {
            const directory = this.get<string>('directory');
            if (directory) {
                baseDirectory = directory;
            }
        }

        if (!baseDirectory) {
            try {
                baseDirectory = findRoot(process.cwd(), (dir) => {
                    return fs.existsSync(path.resolve(dir, 'template.json'));
                });
            } catch (err) {
                Log.verbose(err);
            }
        }

        if (!baseDirectory) {
            baseDirectory = process.cwd();
        }

        if (!baseDirectory) {
            throw new Error('Root path of your project could not determined.');
        }

        try {
            baseDirectory = path.normalize(baseDirectory);
            if (!path.isAbsolute(baseDirectory)) {
                baseDirectory = path.resolve(path.join(process.cwd(), baseDirectory));
            }
        } catch (err) {
            throw err;
        }

        Log.verbose('Ensures that Root path is created');
        fs.ensureDirSync(baseDirectory);

        return baseDirectory;
    }
}
