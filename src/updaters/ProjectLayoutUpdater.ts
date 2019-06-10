/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: ProjectLayoutUpdater.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-06-10 23:11:04
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-10 23:14:06
 * @Description: This is description.
 */

import fs from 'fs-extra';
import path from 'path';
import { Updater } from './Updater';

export class ProjectLayoutUpdater extends Updater {

    constructor(options?: any) {
        super(options);
    }

    public async update(directory: string) {

        const srcDir = path.join(__dirname, '.layout');
        if (fs.existsSync(srcDir)) {
            await fs.copy(srcDir, directory);
        }
    }
}
