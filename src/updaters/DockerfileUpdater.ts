/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
/*
 * @Script: DockerfileUpdater.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-06-11 12:23:43
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-11 13:01:18
 * @Description: This is description.
 */

import fs from 'fs-extra';
import path from 'path';
import { Updater } from './Updater';
import { Log } from '../helpers/Log';

export class DockerfileUpdater extends Updater {

    public async update() {

        Log.info('Create Dockerfile for your Image');

        const directory = path.join(this.options.directory, 'src', this.options.imageName);
        await fs.ensureDir(directory);

        await this.updateDockerfile(directory);
        await this.updateDockerIgnore(this.options.directory);
    }

    private async updateDockerfile(directory: string) {

        const file = path.join(directory, 'Dockerfile.tmpl');
        if (!fs.existsSync(file)) {
            const content = `# This is a Docker Build File
#
# POWERTIP: Use Snippet xb-docker to create a Sample

`;

            await fs.writeFile(file, content, { encoding: 'utf-8' });
            await fs.chmod(file, 0o644);
        } else {
            Log.warn('Dockerfile could not created. File already exists.');
        }
    }

    private async updateDockerIgnore(directory: string) {

        Log.info('Create Dockerignore File for your Image');
        const file = path.join(directory, '.dockerignore');
        if (!fs.existsSync(file)) {

            const content = `# Global Ignores
Dockerfile
.dockerignore

# Define your own Ignores which should not be included to your Image
`;

            await fs.writeFile(file, content, { encoding: 'utf-8' });
            await fs.chmod(file, 0o644);
        } else {
            Log.warn('Dockerignore could not created. File already exists.');
        }
    }
}
