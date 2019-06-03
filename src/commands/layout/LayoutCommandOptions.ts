/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: LayoutCommandOptions.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-06-03 09:30:37
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-03 09:30:37
 * @Description: This is description.
 */



import { CommandOptions } from '../../helpers/CommandOptions';

export interface LayoutCommandOptions extends CommandOptions {

    baseImageName: string;
    imageName: string;
}
