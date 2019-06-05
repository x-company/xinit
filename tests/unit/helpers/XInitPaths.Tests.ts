/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: XInitPaths.Tests.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-06-03 11:19:15
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-03 11:30:25
 * @Description: This is description.
 */

import { expect } from 'chai';
import { XInitPaths } from '../../../src/helpers/XInitPaths';
import fs from 'fs-extra';

describe('Test the XInit Paths', () => {

    beforeEach(async () => {
        if (fs.existsSync('/etc/container')) {
            await fs.remove('/etc/container');
        }
    });

    it('Get XInit Base Path', () => {
        // arrange
        const expected = '/etc/container';

        // act
        const actual = XInitPaths.ENV_CONTAINER;

        // assert
        expect(actual).to.be.equal(expected);
    });

    it('Get XInit Environment Path', () => {
        // arrange
        const expected = '/etc/container/env';

        // act
        const actual = XInitPaths.ENV_CONTAINER_ENV;

        // assert
        expect(actual).to.be.equal(expected);
    });

    it('Get XInit Init Path', () => {
        // arrange
        const expected = '/etc/container/xinit.d';

        // act
        const actual = XInitPaths.ENV_CONTAINER_INIT;

        // assert
        expect(actual).to.be.equal(expected);
    });
});
