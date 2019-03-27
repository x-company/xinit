/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CommandOptions } from '../../helpers/CommandOptions';

export interface LayoutCommandOptions extends CommandOptions {

    baseImageName: string;
    imageName: string;
}
