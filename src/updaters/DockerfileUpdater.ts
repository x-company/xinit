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

export class DockerfileUpdater extends Updater {

    public async update() {

        const directory = path.join(this.options.directory, 'src', this.options.imageName);
        await fs.ensureDir(directory);

        await this.updateDockerfile(directory);
        await this.updateDockerIgnore(directory);
    }

    private async updateDockerfile(directory: string) {

        const file = path.join(directory, 'Dockerfile');
        if (!fs.existsSync(file)) {
            const content = `# POWERTIP: Use Snippet xb-docker

`;

            await fs.writeFile(file, content, { encoding: 'utf-8' });
            await fs.chmod(file, 0o644);
        }
    }

    private async updateDockerIgnore(directory: string) {

        const file = path.join(directory, '.dockerignore');
        if (!fs.existsSync(file)) {

            const content = `# Global Ignores
Dockerfile
.dockerignore

# Define your own Ignores which should not be included to your Image
`;

            await fs.writeFile(file, content, { encoding: 'utf-8' });
            await fs.chmod(file, 0o644);
        }
    }
}
