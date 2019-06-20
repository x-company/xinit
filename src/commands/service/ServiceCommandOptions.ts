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
    imageName?: string;

    addFix: boolean;
    addInit: boolean;
    addShutdown: boolean;
    addRules: boolean;
    addLog: boolean;
    addFinish: boolean;

    priority: number;

    /*
    .option('--add-fix', 'Add Attribute Fix to modify the Security of folders and files.')
    .option('--add-init', 'Add Init Script which will executed when a container starts.')
    .option('--add-shutdown', 'Add Script which will executed when a Container shutdowns.')
    .option('--add-rules', 'Add Log Rules for the Service.')
    .option('--add-script', 'Add Log Script for the Service.')
    .option('--add-finish', 'Add Service Finish Script which will executed when Service will shutdown.')
    .option('-p, --priority <prio>', 'The Priority when the choosed option should run. A value between 1-98. 99 is the highest Prio an could not used.', 10)
    */
}
