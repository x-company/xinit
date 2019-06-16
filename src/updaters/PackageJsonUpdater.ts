/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: PackageJsonUpdater.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-06-10 22:49:44
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-11 12:59:23
 * @Description: This is description.
 */

import fs from 'fs-extra';
import path from 'path';
import { Updater } from './Updater';
import { Log } from '../helpers/Log';

export class PackageJsonUpdater extends Updater {

    public async update() {

        Log.info('Create a package.json');

        const file = path.join(this.options.directory, 'package.json');
        if (!fs.existsSync(file)) {

            const content = {
                name: this.options.shortImageName,
                version: '0.1.0',
                description: '<Please describe your Image>',
                author: 'Firstname Lastname <firstname.lastname@your-domain> (https://your-domain)',
                license: 'MIT',
                repository: {
                    type: 'git',
                    url: `git@github.com:${this.options.imageName}.git`,
                },
                bugs: {
                    url: `https://github.com/${this.options.imageName}/issues`,
                },
                homepage: `https://github.com/${this.options.imageName}`,
                keywords: [
                    'docker',
                    this.options.shortImageName,
                ],
                config: {
                    image_name: this.options.imageName,
                },
                devDependencies: {
                    'appversion-mgr': '^0.7.0',
                },
                scripts: {
                    'dockerfile:XBUILD_BUILD_DATE': `echo \"$(sed -e \"s/__XBUILD_BUILD_DATE__/$(date -u +\'%Y-%m-%dT%H:%M:%SZ\')/g\" ./src/${this.options.imageName}/Dockerfile.tmpl)\" > ./Dockerfile`,
                    'dockerfile:XBUILD_VCS_REF': 'echo \"$(sed -e \"s/__XBUILD_VCS_REF__/$(git rev-parse --short HEAD)/g\" ./Dockerfile)\" > ./Dockerfile',
                    'dockerfile:XBUILD_VERSION': 'echo \"$(sed -e \"s/__XBUILD_VERSION__/$npm_package_version/g\" ./Dockerfile)\" > ./Dockerfile',
                    'dockerfile:build': 'yarn dockerfile:XBUILD_BUILD_DATE && yarn dockerfile:XBUILD_VCS_REF && yarn dockerfile:XBUILD_VERSION',

                    'docker:clean:dev': `docker image rm -f ${this.options.imageName}:devcontainer`,
                    'docker:clean:image': 'docker image rm -f $npm_package_config_image_name:$npm_package_version',
                    'docker:clean:latest': 'docker image rm -f $npm_package_config_image_name:latest',

                    'docker:build': 'docker build --tag $npm_package_config_image_name:$npm_package_version --force-rm .',
                    'docker:tag': 'docker image tag $npm_package_config_image_name:$npm_package_version $npm_package_config_image_name:latest',

                    'clean': 'docker system prune -f && yarn docker:clean:image && yarn docker:clean:latest && yarn docker:clean:dev',
                    'prebuild': 'appvmgr update build && yarn dockerfile:build',
                    'build': 'yarn docker:build',
                    'postbuild': 'yarn docker:tag && git add . && git commit -m \'Automatic Build Commit\'',

                    'test': 'docker-compose -f ./.devcontainer/docker-compose.test.yml up',

                    'release': 'yarn build && appvmgr add-git-tag && git push --tags && git push --all',
                },
            };

            await fs.writeJson(file, content, { encoding: 'utf8', spaces: 4 });
            await fs.chmod(file, 0o644);
        } else {
            Log.warn('Package.json could not created. File already exists.');
        }
    }
}
