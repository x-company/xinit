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
 * @Last Modified At: 2019-06-03 16:14:29
 * @Description: This is description.
 */

import { Info } from '../../../src/helpers/Info';
import { CliManager } from '../../../src/helpers/CliManager';
import { expect } from 'chai';
import fs from 'fs-extra';
import path from 'path';

describe('Load the Image Root Dir', () => {

    const testarea = path.join('/code', 'testarea');
    const imageName = 'infoTestImage';

    beforeEach(async () => {
        CliManager.clear();

        if (fs.existsSync(testarea)) {
            await fs.removeSync(testarea);
        }
    });

    afterEach(() => {
        const root = path.join('/code', imageName);

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
        expect(Info.ProductName).to.be.equal('xinit');
    });

    it('Load Image Root without an Image Name and Base Directory', () => {

        // arrange, act & assert

        // act
        const fn = () => {
            Info.getImageRoot();
        };

        // assert
        expect(fn).to.throw();
    });

    it('Load Image Root with an Image Name', () => {

        // arrange, act & assert
        const expected = path.join('/code', imageName);

        // act
        const actual = Info.getImageRoot(imageName);

        // assert
        expect(expected).to.equal(actual);
    });

    it('Load Image Root with an Image Name and a Base Directory', () => {

        // arrange, act & assert
        CliManager.set('directory', testarea);
        const expected = path.join(testarea, imageName);

        // act
        const actual = Info.getImageRoot(imageName, testarea);

        // assert
        expect(expected).to.equal(actual);
    });
});
