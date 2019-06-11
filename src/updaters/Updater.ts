/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: Updater.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-06-10 22:45:48
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-11 11:12:59
 * @Description: This is description.
 */

import { UpdaterOptions } from './UpdaterOptions';
import { CliManager } from '../helpers/CliManager';
export abstract class Updater {

    private updateOptions: UpdaterOptions;

    constructor() {
        this.updateOptions = {
            directory: CliManager.getDirectory(),
            imageName: '',
        };
    }

    public get options(): UpdaterOptions {
        return this.updateOptions;
    }

    public set options(value: UpdaterOptions) {
        this.updateOptions = value;
    }

    public abstract update(): Promise<any>;
}
