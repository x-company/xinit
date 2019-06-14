/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: DockerComposeUpdater.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-06-11 12:18:35
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-11 12:33:02
 * @Description: This is description.
 */

import fs from 'fs-extra';
import path from 'path';
import { Updater } from './Updater';
import { Log } from '../helpers/Log';

export class DockerComposeUpdater extends Updater {

    public async update() {

        Log.info('Create Docker Compose File for your Image');
        const file = path.join(this.options.directory, 'docker-compose.yml');

        let content = '';
        if (!fs.existsSync(file)) {
            content = `version: "3.7"

services:
`;
        }

        content += `
  ${this.options.shortImageName}:
    build:
      context: ./src/${this.options.imageName}

`;
        await fs.writeFile(file, content, { encoding: 'utf-8' });
        await fs.chmod(file, 0o644);
    }
}
