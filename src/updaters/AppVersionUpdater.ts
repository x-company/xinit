/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: AppVersionUpdater.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-06-11 10:11:39
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-11 12:58:57
 * @Description: This is description.
 */

import fs from 'fs-extra';
import path from 'path';
import { Updater } from './Updater';
import { Log } from '../helpers/Log';
import { CreateCommand, SetCommand } from 'appversion-mgr';

export class AppVersionUpdater extends Updater {

    public async update() {

        let file = path.join(this.options.directory, 'appversion.json');
        if (!fs.existsSync(file)) {
            Log.info('Create AppVersion');
            new CreateCommand(this.options.directory).initAppVersion();

            let content = await fs.readJson(file);
            content = {
                ...content,
                version: {
                    ...content.version,
                    badge: `[![${this.options.shortImageName}-version](https://img.shields.io/badge/Version-\${M.m.p}-brightgreen.svg?style=flat)](https://github.com/${this.options.imageName})`,
                },
                build: {
                    ...content.build,
                    badge: `[![${this.options.shortImageName}-build](https://img.shields.io/badge/Builds-\${n}-brightgreen.svg?style=flat)](https://github.com/${this.options.imageName})`,
                },
                status: {
                    ...content.status,
                    badge: `[![${this.options.shortImageName}-status](https://img.shields.io/badge/Status-\${S%20s}-brightgreen.svg?style=flat)](https://github.com/${this.options.imageName}/releases)`,
                },
                config: {
                    ...content.config,
                    markdown: [
                        'README.md',
                    ],
                },
            };

            await fs.writeJson(file, content, { encoding: 'utf8', spaces: 4 });
            await fs.chmod(file, 0o644);

            new SetCommand(this.options.directory).setVersion('0.1.0');
            new SetCommand(this.options.directory).setStatus('development.1');

            file = path.join(this.options.directory, 'README.md');
            if (fs.existsSync(file)) {
                await fs.unlink(file);
            }
        }
    }
}
