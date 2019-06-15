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
import { Log } from '../helpers/Log';

export class ProjectLayoutUpdater extends Updater {

    constructor(private updateSourcelists: boolean, private withoutDefaultServices: boolean, private force: boolean) {
        super();

    }
    public async update() {

        Log.info('Create a new Layout for your Image');

        const layoutDir = path.join(__dirname, '..', '.layout');
        const destDir = path.join(this.options.directory, 'src', this.options.imageName, 'build');
        if (this.force || (fs.existsSync(layoutDir) && !fs.existsSync(destDir))) {
            await fs.copy(layoutDir, this.options.directory);

            const sourceDir = path.join(this.options.directory, 'src', 'image', 'build');
            fs.moveSync(sourceDir, destDir, { overwrite: true });

            await fs.rmdir(path.join(sourceDir, '..'));

            if (!this.updateSourcelists) {
                Log.info('Remove Source Lists');
                const xbuildDir = path.join(destDir, 'fsroot', 'etc', 'xbuild');
                const sourcelistsDir = path.join(xbuildDir, 'sources.list.d');
                if (fs.existsSync(sourcelistsDir)) {
                    this.removeDir(sourcelistsDir);
                }

                const trustedDir = path.join(xbuildDir, 'trusted.gpg.d');
                if (fs.existsSync(trustedDir)) {
                    this.removeDir(trustedDir);
                }

                if (fs.existsSync(xbuildDir)) {
                    this.removeDir(xbuildDir);
                }
            }

            if (this.withoutDefaultServices) {
                Log.info('Remove Default Services');

                const eventsDir = path.join(destDir, 'events');
                this.removeDir(path.join(eventsDir, 'post'));
                await fs.unlink(path.join(eventsDir, 'syslog-ng.init'));

                const fsrootDir = path.join(destDir, 'fsroot', 'etc');
                this.removeDir(path.join(fsrootDir, 'default'));
                this.removeDir(path.join(fsrootDir, 'logrotate.d'));
                this.removeDir(path.join(fsrootDir, 'syslog-ng'));
                await fs.unlink(path.join(fsrootDir, 'logrotate.conf'));

                const serviceDir = path.join(destDir, 'services');
                this.removeDir(path.join(serviceDir, 'cron'));
                this.removeDir(path.join(serviceDir, 'syslog-ng'));
            }
        } else {
            Log.warn('Image already created. To recreate the Image use --force Parameter.');
        }
    }

    private removeDir(directory: string) {

        // tslint:disable-next-line: no-empty
        rimraf(directory, (err) => {
            if (err) {
                Log.warn(err);
            }
        });
    }
}
