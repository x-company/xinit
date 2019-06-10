/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: ShellOptions.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-06-10 16:16:43
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-10 16:55:19
 * @Description: This is description.
 */

export interface ShellOptions {
    cwd?: string;
    windowsHide?: boolean;
    detached?: boolean;
    shell?: boolean;
    silent?: boolean;
}
