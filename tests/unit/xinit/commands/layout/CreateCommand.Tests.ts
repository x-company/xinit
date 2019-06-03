/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: CreateCommand.Tests.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-06-02 18:13:35
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-03 09:32:34
 * @Description: This is description.
 */

import { CreateCommand } from '../../../../../src/commands/layout/CreateCommand';
import { expect, assert } from 'chai';
import fs from 'fs-extra';
import path from 'path';

describe('Creates a new Layout for Services', () => {
    it('Create a default Layout', async () => {
        // Arrange
        const testarea = path.join('/code', 'testarea');

        // Act
        const cmd = new CreateCommand({
            directory: testarea,
            baseImageName: 'mybaseimagename',
            imageName: 'myimagename',
        });

        await cmd.invoke();

        // Assert
        const exists = fs.existsSync(testarea);
        assert.isTrue(exists);
    });
});
