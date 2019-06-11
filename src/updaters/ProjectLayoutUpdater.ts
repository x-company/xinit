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
 * @Last Modified At: 2019-06-11 11:15:09
 * @Description: This is description.
 */

import fs from 'fs-extra';
import path from 'path';
import { Updater } from './Updater';
import { Info } from '../helpers/Info';

export class ProjectLayoutUpdater extends Updater {

    public async update() {

        const projectRoot = Info.getProjectRoot();
        const srcDir = path.join(projectRoot, 'src', '.layout');
        if (fs.existsSync(srcDir)) {
            await fs.copy(srcDir, this.options.directory);
        }
    }
}
