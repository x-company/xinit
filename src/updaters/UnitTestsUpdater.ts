/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: UnitTestsUpdater.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-06-11 12:18:35
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-11 14:16:08
 * @Description: This is description.
 */

import fs from 'fs-extra';
import path from 'path';
import { Updater } from './Updater';

export class UnitTestsUpdater extends Updater {

    public async update() {

        const directory = path.join(this.options.directory, 'tests', 'unit', this.options.imageName);
        await fs.ensureDir(directory);

        await this.updateDockercomposeFile(directory);
        await this.updateBatsFile(directory);
    }

    private async updateDockercomposeFile(directory: string) {

        const file = path.join(directory, 'docker-compose.yml');
        if (!fs.existsSync(file)) {
            const content = `version: "3.7"

services:
  ${this.options.shortImageName}:
    image: ${this.options.imageName}:unit
    build:
      context: ../../../../.devcontainer
    volumes:
      # Map the current Source Folder
      - ./:/workspace/tests/unit
    command: "/usr/bin/bats /workspace/tests/unit/"

`;
            await fs.writeFile(file, content, { encoding: 'utf-8' });
            await fs.chmod(file, 0o644);
        }
    }

    private async updateBatsFile(directory: string) {

        const file = path.join(directory, 'sample.bats');
        if (!fs.existsSync(file)) {
            const content = `#!/usr/bin/env bats
# -*- coding: utf-8 -*-

@test "addition using bc" {
    # Arrange

    # Act
    result="$(echo 2+2 | bc)"

    # Assert
    [ "$result" -eq 4 ]
}

@test "addition using dc" {
    # Arrange

    # Act
    result="$(echo 2 2+p | dc)"

    # Assert
    [ "$result" -eq 4 ]
}
`;
            await fs.writeFile(file, content, { encoding: 'utf-8' });
            await fs.chmod(file, 0o644);
        }
    }
}
