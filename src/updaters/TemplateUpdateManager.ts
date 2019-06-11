/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: TemplateUpdateManager.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-06-10 22:45:01
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-11 11:19:46
 * @Description: This is description.
 */

import { Updater } from './Updater';
import { UpdaterOptions } from './UpdaterOptions';

export class TemplateUpdateManager {

    private updateOptions: UpdaterOptions;

    constructor(options: UpdaterOptions) {
        if (options.imageName) {
            if (options.imageName.indexOf('/')) {
                options.shortImageName = options.imageName.substring(options.imageName.lastIndexOf('/') + 1);
            } else {
                options.shortImageName = options.imageName;
            }
        }
        this.updateOptions = options;
    }

    public async update(updater: Updater) {

        updater.options = this.updateOptions;
        return updater.update();
    }
}
