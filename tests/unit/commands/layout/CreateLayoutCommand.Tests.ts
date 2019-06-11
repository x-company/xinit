/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: CreateLayoutCommand.Tests.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-06-02 18:13:35
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-11 10:58:10
 * @Description: This is description.
 */

import { CreateLayoutCommand } from '../../../../src/commands/layout/CreateLayoutCommand';
import { assert } from 'chai';
import fs from 'fs-extra';
import path from 'path';

describe('Creates a new Layout for Services', () => {
    const testarea = path.join(process.cwd(), 'testarea');
    const imageName = 'xcompany/mariadb';

    beforeEach(async () => {
        if (fs.existsSync(testarea)) {
            await fs.remove(testarea);
        }
    });

    it('Create a default Layout', async () => {
        // Arrange

        // Act
        await new CreateLayoutCommand({
            directory: testarea,
            imageName,
        }).invoke();

        // Assert
        assert.isTrue(fs.existsSync(testarea));

        const layoutRoot = path.join(testarea, imageName);
        assert.isTrue(fs.existsSync(layoutRoot));
    });
});
