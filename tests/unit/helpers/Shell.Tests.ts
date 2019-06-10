/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: Shell.Tests.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-06-10 17:25:49
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-10 17:27:21
 * @Description: This is description.
 */

import { assert } from 'chai';
import { Shell } from '../../../lib/helpers/Shell';


describe('Test Shell Helper', () => {

    it('Execute ls -l', async () => {
        // Arrange

        // Act
        const actual = await Shell.execute('ls -l');

        // Assert
        assert.isNotEmpty(actual);
    });
});
