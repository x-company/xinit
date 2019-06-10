/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: RunCommand.Tests.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-06-10 17:16:05
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-10 17:18:50
 * @Description: This is description.
 */

import { assert } from 'chai';
import fs from 'fs-extra';
import path from 'path';
import { RunCommand } from '../../../../src/commands/run/RunCommand';
import { CreateLayoutCommand } from '../../../../src/commands/layout/CreateLayoutCommand';
import { Shell } from '../../../../src/helpers/Shell';
import { CreateServiceCommand } from '../../../../src/commands/service/CreateServiceCommand';

describe('Creates a new Service', () => {
    const testarea = path.join(process.cwd(), 'testarea');
    const imageName = 'TestBaseImage';
    const serviceName = 'TestService';

    before(async () => {
        if (fs.existsSync(testarea)) {
            await fs.remove(testarea);
        }

        await new CreateLayoutCommand({
            directory: testarea,
            imageName,
        }).invoke();

        await new CreateServiceCommand({
            directory: testarea,
            imageName,
            serviceName,
        }).invoke();

        const buildDir = path.join(testarea, imageName, 'build');
        if (fs.existsSync(buildDir)) {
            await fs.symlink(buildDir, '/build');
        }

        await Shell.execute('/build/build.sh');
    });

    it('Run runit', async () => {
        // Arrange

        // Act
        try {
            await new RunCommand().invoke();

            // Assert
            assert.isTrue(true);
        } catch (err) {

            // Assert
            assert.fail(err);
        }
    });
});
