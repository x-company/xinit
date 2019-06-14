/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: ProjectLayoutUpdater.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-06-10 23:11:04
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-11 11:15:09
 * @Description: This is description.
 */

import fs from 'fs-extra';
import path from 'path';
import rimraf from 'rimraf';
import { Updater } from './Updater';
import { Info } from '../helpers/Info';

export class ProjectLayoutUpdater extends Updater {

    constructor(private updateSourcelists: boolean, private withoutDefaultServices: boolean) {
        super();

    }
    public async update() {

        const projectRoot = Info.getProjectRoot();
        const layoutDir = path.join(projectRoot, 'src', '.layout');
        const destDir = path.join(this.options.directory, 'src', this.options.imageName, 'build');
        if (fs.existsSync(layoutDir)) {
            await fs.copy(layoutDir, this.options.directory);

            const sourceDir = path.join(this.options.directory, 'src', 'image', 'build');
            fs.moveSync(sourceDir, destDir, { overwrite: true });

            await fs.rmdir(path.join(sourceDir, '..'));
        }

        if (!this.updateSourcelists) {
            const sourcelistsDir = path.join(this.options.directory, 'src', this.options.imageName, 'build', 'fsroot', 'etc', 'xbuild', 'sources.list.d');
            if (fs.existsSync(sourcelistsDir)) {
                await fs.unlink(sourcelistsDir);
            }

            const trustedDir = path.join(this.options.directory, 'src', this.options.imageName, 'build', 'fsroot', 'etc', 'xbuild', 'trusted.gpg.d');
            if (fs.existsSync(trustedDir)) {
                await fs.unlink(trustedDir);
            }
        }

        if (this.withoutDefaultServices) {

            const eventsDir = path.join(destDir, 'events');
            await fs.unlink(path.join(eventsDir, 'syslog-ng.init'));
            rimraf(path.join(eventsDir, 'post'), (err) => { throw err; });

            const fsrootDir = path.join(destDir, 'fsroot');
            rimraf(path.join(fsrootDir, 'etc', 'default'), (err) => { throw err; });
            rimraf(path.join(fsrootDir, 'etc', 'logrotate.d'), (err) => { throw err; });
            rimraf(path.join(fsrootDir, 'etc', 'syslog-ng'), (err) => { throw err; });
            await fs.unlink(path.join(fsrootDir, 'etc', 'logrotate.conf'));
        }
    }
}
