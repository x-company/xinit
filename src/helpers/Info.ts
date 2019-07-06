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
 * @Last Modified At: 2019-06-20 08:38:58
 * @Description: This is description.
 */


import fs from 'fs-extra';
import path, { basename } from 'path';
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

    public static getProjectRoot() {

        let baseDirectory = null;

        try {
            baseDirectory = findRoot(process.cwd(), (dir) => {
                if (dir) {
                    return fs.existsSync(path.resolve(dir, 'package.json'));
                }
                return false;
            });
        } catch (err) {
            Log.verbose(err);
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

        return baseDirectory;
    }

    public static getImageRoot(baseDirectory: string): any {

        let imageName = null;

        let buildDir = path.join(baseDirectory, 'build');
        if (!fs.existsSync(buildDir)) {
            const result = this.navigate(baseDirectory);
            if (result) {
                buildDir = result;
            }
        }

        if (!fs.existsSync(buildDir)) {
            throw new Error('Root of your Image could not found.');
        }

        buildDir = path.join(buildDir, '..');
        imageName = basename(buildDir);
        if (imageName !== 'xbuild') {
            const imageNamePart1 = basename(buildDir);
            buildDir = path.join(buildDir, '..');
            const imageNamePart2 = basename(buildDir);

            if (imageNamePart2 === 'src') {
                imageName = imageNamePart1;
            } else {
                imageName = `${imageNamePart2}/${imageNamePart1}`;
            }

            buildDir = path.join(buildDir, imageNamePart1);
        }

        return {
            name: imageName,
            root: buildDir,
        };
    }

    private static PROG_VERSION: string = '0.1.0';
    private static PROG_NAME: string = 'xbuild';

    private static navigate(currentDir: string): string {

        const dirs = fs
            .readdirSync(currentDir)
            .filter((file) => fs.statSync(path.join(currentDir, file)).isDirectory());

        let result = '';

        for (const dir of dirs) {
            const subDir = path.join(currentDir, dir);
            const buildDir = path.join(subDir, 'build');
            if (fs.existsSync(buildDir)) {
                result = buildDir;
                break;
            } else {
                result = this.navigate(subDir);
                if (result) {
                    break;
                }
            }
        }

        return result;
    }
}
