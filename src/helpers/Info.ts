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

    private static PROG_VERSION: string = '0.1.0';
    private static PROG_NAME: string = 'xinit';

}
