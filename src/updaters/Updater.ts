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
 * @Last Modified At: 2019-06-10 22:58:57
 * @Description: This is description.
 */

export abstract class Updater {

    private updateOptions: any = {};

    constructor(options?: any) {
        this.updateOptions = options;
    }

    protected get options(): any {
        return this.updateOptions;
    }

    public abstract update(directory: string): Promise<any>;
}
