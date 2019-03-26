/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: XInitPaths.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-03-26 17:37:57
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-03-26 17:42:48
 * @Description: This is description.
 */

import fs from 'fs-extra';
import path from 'path';
import { Log } from './Log';
export class XInitPaths {

    public static get ENV_CONTAINER() {
        Log.verbose('Ensures Root Directory for Container exists.');
        const directory = process.env.ENV_DIRECTORY || '/etc/container';
        fs.ensureDirSync(directory);

        return directory;
    }

    public static get ENV_CONTAINER_ENV() {

        const directory = path.join(this.ENV_CONTAINER, 'env');
        fs.ensureDirSync(directory);

        return directory;
    }

    public static get ENV_CONTAINER_INIT() {

        const directory = path.join(this.ENV_CONTAINER, 'xinit.d');
        fs.ensureDirSync(directory);

        return directory;
    }
}
