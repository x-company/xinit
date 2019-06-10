/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: HelperFunctions.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-06-10 16:21:27
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-10 16:21:27
 * @Description: This is description.
 */



export async function wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
