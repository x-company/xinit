/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: ServiceCommandOptions.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-03-26 23:25:40
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-14 01:03:46
 * @Description: This is description.
 */

import { CommandOptions } from '../../helpers/CommandOptions';

export interface ServiceCommandOptions extends CommandOptions {
    serviceName: string;

    addFix: boolean;
    addInit: boolean;
    addShutdown: boolean;
    addLog: boolean;
    addFinish: boolean;

    addHealth: boolean;

    priority: number;
}
