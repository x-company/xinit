/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: Info.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-03-26 14:37:05
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-03-26 23:10:38
 * @Description: This is description.
 */


import fs from 'fs-extra';
import path from 'path';
import findRoot from 'find-root';
import Configstore from 'configstore';
import { Log } from '../helpers/Log';
import { CliManager } from './CliManager';

export class Info {
    /**
     * The current Program Version
     *
     * @static
     * @returns { string } A Program Version
     * @memberof Info
     */
    public static get ProductVersion(): string {

        Log.verbose('Get Product Version');

        const root = findRoot(__dirname);
        const packageFile = path.join(root, 'package.json');
        if (fs.existsSync(packageFile)) {
            const packageJson = require(packageFile);
            if (packageJson) {
                return packageJson.version;
            }
        }

        return Info.PROG_VERSION;
    }

    public static get ProductName(): string {
        return this.PROG_NAME;
    }

    public static get Store(): Configstore {

        let name = this.ProductName;

        // Load package.json;
        const root = findRoot(__dirname);
        const packageFile = path.join(root, 'package.json');
        if (fs.existsSync(packageFile)) {
            const packageJson = require(packageFile);
            if (packageJson) {
                name = packageJson.name;
            }
        }

        const store = new Configstore(name);

        return store;
    }

    public static getImageRoot(imageName?: string): string {

        let rootDirectory = CliManager.getDirectory();
        if (rootDirectory === process.cwd()) {
            rootDirectory = path.join(process.cwd(), 'src');
            fs.ensureDirSync(rootDirectory);
        }

        if (!imageName) {
            const dirs = fs.readdirSync(rootDirectory).filter((file) => fs.statSync(path.join(rootDirectory, file)).isDirectory());

            if (dirs.length > 1) {
                throw new Error('More than one Base Images found. Please specify the Base Image with parameter -i or --image');
            } else {
                if (dirs.length === 1) {
                    imageName = path.basename(dirs[0]);
                } else {
                    throw new Error('No Base Image found.');
                }
            }
        }

        const distDir = path.join(rootDirectory, imageName, 'dist');
        fs.ensureDirSync(distDir);

        return distDir;
    }

    private static PROG_VERSION: string = '0.1.0';
    private static PROG_NAME: string = 'xinit';

}
