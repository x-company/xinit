/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: UpdateManager.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-06-10 22:45:01
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-10 22:59:24
 * @Description: This is description.
 */

import { Updater } from './Updater';

export class UpdateManager {

    public static async update(updater: Updater, directory: string) {

        updater.update(directory);
    }
}
