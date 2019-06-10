/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: Guid.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-06-10 16:22:18
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-10 16:22:18
 * @Description: This is description.
 */


export class Guid {

    public static newGuid(): Guid {
        let result: string;
        let i: string;
        let j: number;

        result = '';
        for (j = 0; j < 32; j++) {
            if (j === 8 || j === 12 || j === 16 || j === 20) {
                result = result + '-';
            }
            i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
            result = result + i;
        }
        return new Guid(result);
    }
    constructor(private guid: string) { }

    public toString(): string {
        return this.guid;
    }
}
