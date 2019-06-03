/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: Info.Tests.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-03-27 17:16:19
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-03 09:33:04
 * @Description: This is description.
 */

import { Info } from '../../../../src/helpers/Info';
import { CliManager } from '../../../../src/helpers/CliManager';
import { expect } from 'chai';

describe('Load the Image Root Dir', () => {

    it('Get Product Name', () => {
        expect(Info.ProductName).to.be.equal('xinit');
    });

    it('Load Image Root without an Image Name', async (done) => {

        // arrange, act & assert
        try {
            CliManager.set('directory', 'image');

            const imageRoot = Info.getImageRoot();

            done();
        } catch (err) {
            done();
        }
    });
});
