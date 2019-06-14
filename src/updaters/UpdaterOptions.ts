/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: UpdaterOptions.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-06-11 10:04:04
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-11 16:41:35
 * @Description: This is description.
 */

export interface UpdaterOptions {
    imageName: string;
    directory: string;

    shortImageName?: string;
    serviceName?: string;

    eventName?: string;

    eventExtension?: string;

}
