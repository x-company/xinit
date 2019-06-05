/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: CliManager.Tests.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-06-03 09:32:50
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-03 09:39:48
 * @Description: This is description.
 */

import { CliManager } from '../../../src/helpers/CliManager';
import { expect } from 'chai';

describe('Test the CliManager', () => {

    beforeEach(() => {
        CliManager.clear();
    });

    it('Set a Value in the store', () => {
        // arrange
        const key = 'ATestKey';
        const expected = 'A Test Value';

        // act
        CliManager.set(key, expected);

        const actual = CliManager.get<string>(key);

        // assert
        expect(actual).to.be.equal(expected);
    });

    it('Clear Store', () => {
        // arrange
        const key = 'ATestKey';
        const expected = 'A Test Value';

        // act
        CliManager.set(key, expected);
        CliManager.clear();

        const actual = CliManager.get<string>(key);

        // assert
        // tslint:disable-next-line: no-unused-expression
        expect(actual).to.be.null;
    });

    it('Get the Default Base Directory', () => {
        // arrange
        const expected = '/code';
        CliManager.clear();

        // act
        const actual = CliManager.getDirectory();

        // assert
        expect(actual).to.be.equal(expected);
    });

    it('Get the Base Directory for testarea', () => {
        // arrange
        const expected = '/code/testarea';

        // act
        const actual = CliManager.getDirectory('testarea');

        // assert
        expect(actual).to.be.equal(expected);
    });
});
