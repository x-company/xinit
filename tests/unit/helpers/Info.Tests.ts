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
 * @Last Modified At: 2019-06-20 08:39:18
 * @Description: This is description.
 */

import { Info } from '../../../src/helpers/Info';
import { CliManager } from '../../../src/helpers/CliManager';
import { expect } from 'chai';
import fs from 'fs-extra';
import path from 'path';

describe('Load the Image Root Dir', () => {

    const testarea = path.join(process.cwd(), 'testarea');
    const imageName = 'infoTestImage';

    beforeEach(async () => {
        CliManager.clear();

        const root = path.join(process.cwd(), imageName);

        if (fs.existsSync(imageName)) {
            fs.removeSync(imageName);
        }

        if (fs.existsSync(root)) {
            fs.removeSync(root);
        }

        if (fs.existsSync(testarea)) {
            fs.removeSync(testarea);
        }
    });

    it('Get Product Name', () => {
        expect(Info.ProductName).to.be.equal('xbuild');
    });
});
