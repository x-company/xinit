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
 * @Last Modified At: 2019-06-10 23:00:32
 * @Description: This is description.
 */

import fs from 'fs-extra';
import path from 'path';
import { Updater } from './Updater';
import { Log } from '../helpers/Log';
import { Shell } from '../helpers/Shell';
import { CreateCommand } from 'appversion-mgr';

export class PackageJsonUpdater extends Updater {

    constructor(options?: any) {
        super(options);
    }

    public async update(directory: string) {

        const scripts = {
            'docker:clean': 'docker system prune -f',
            'docker:clean:image': 'docker image rm -f $npm_package_config_image_name:$npm_package_version',
            'docker:clean:latest': 'docker image rm -f $npm_package_config_image_name:latest',
            'docker:build': 'docker build --target prod --label version=$npm_package_version --tag $npm_package_config_image_name:$npm_package_version --rm .',
            'docker:tag': 'docker image tag $npm_package_config_image_name:$npm_package_version $npm_package_config_image_name:latest',
            'clean': 'yarn docker:clean:image && yarn docker:clean:latest',
            'prebuild': 'appvmgr update build',
            'build': 'yarn docker:build',
            'postbuild': 'yarn docker:tag && git add . && git commit -m \'Automatic Build Commit\'',
            'test': 'docker-compose -f ./tests/unit/docker-compose.yml up',
            'test:clean': 'docker container prune -f && docker image rm -f $npm_package_config_image_name:unit',
            'release': 'yarn build && appvmgr add-git-tag && git push --tags && git push --all',
        };

        const config = {
            image_name: this.options.imageName,
        };

        const packageJsonFile = path.join(directory, 'package.json');
        if (!fs.existsSync(packageJsonFile)) {
            const currentDir = process.cwd();
            process.chdir(directory);

            const options = {
                cwd: directory,
                silent: true,
                windowsHide: true,
            };

            Log.info('Create new Package Json');
            await Shell.execute('yarn init -y', options);
            await Shell.execute('yarn add appversion-mgr --dev', options);

            Log.info('Create AppVersion');
            new CreateCommand(directory).initAppVersion();

            process.chdir(currentDir);
        }

        let packageJson = await fs.readJson(packageJsonFile);


        delete packageJson.main;

        packageJson = {
            ...packageJson,
            name: this.options.imageName,
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
            ],
            config: {
                ...packageJson.config,
                ...config,
            },
            scripts: {
                ...packageJson.scripts,
                ...scripts,
            },
        };

        fs.writeJson(packageJsonFile, packageJson, { encoding: 'utf8', spaces: 4 });
    }
}
