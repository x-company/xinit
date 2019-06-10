/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: CreateServiceCommand.Tests.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-06-02 18:13:35
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-10 16:20:39
 * @Description: This is description.
 */

import { CreateServiceCommand } from '../../../../src/commands/service/CreateServiceCommand';
import { assert } from 'chai';
import fs from 'fs-extra';
import path from 'path';
import { CreateLayoutCommand } from '../../../../src/commands/layout/CreateLayoutCommand';

describe('Creates a new Service', () => {
    const testarea = path.join(process.cwd(), 'testarea');
    const imageName = 'TestBaseImage';
    const serviceName = 'TestService';

    beforeEach(async () => {
        if (fs.existsSync(testarea)) {
            await fs.remove(testarea);
        }

        await new CreateLayoutCommand({
            directory: testarea,
            imageName,
        }).invoke();
    });

    it('Create Service', async () => {
        // Arrange

        // Act
        await new CreateServiceCommand({
            directory: testarea,
            imageName,
            serviceName,
        }).invoke();

        // Assert
        assert.isTrue(fs.existsSync(testarea));

        const layoutRoot = path.join(testarea, imageName);
        assert.isTrue(fs.existsSync(layoutRoot));

        const serviceRoot = path.join(layoutRoot, 'build', 'services', serviceName);
        assert.isTrue(fs.existsSync(serviceRoot));
    });
});
