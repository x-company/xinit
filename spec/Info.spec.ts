/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: Info.spec.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-03-27 17:16:19
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-03-27 17:16:19
 * @Description: This is description.
 */

import { Info } from '../src/helpers/Info';

describe('Load the Image Root Dir', () => {

    it('Load Image Root without an Image Name', async (done) => {

        // arrange, act & assert
        try {
            CliManager.save('directory', 'image');
            
            const imageRoot = Info.getImageRoot();

            done();
        } catch (err) {
            done.fail(err);
        }
    });
});
