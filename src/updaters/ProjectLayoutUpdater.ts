import { CliManager } from './../helpers/CliManager';
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
 * @Last Modified At: 2019-06-19 08:26:35
 * @Description: This is description.
 */

import fs from 'fs-extra';
import path from 'path';
import rimraf from 'rimraf';
import { Updater } from './Updater';
import { Log } from '../helpers/Log';
import { Info } from '../helpers/Info';

export class ProjectLayoutUpdater extends Updater {

    constructor(private withCron: boolean, private withProjectLayout: boolean, private force: boolean) {
        super();

    }
    public async update() {

        Log.info('Create a new Layout for your Image');

        const layoutDir = path.join(__dirname, '..', '.layout');

        let destDir = '';
        let testDestDir = '';

        if (!this.withProjectLayout) {
            destDir = path.join(this.options.directory, 'xbuild');

            const projectRoot = Info.getProjectRoot();

            const vscodeDir = path.join(projectRoot, '.vscode');
            fs.ensureDirSync(vscodeDir);

            const snippetFile = path.join(layoutDir, '.vscode', 'xbuild.code-snippets');
            if (fs.existsSync(snippetFile)) {
                await fs.copyFile(snippetFile, path.join(vscodeDir, 'xbuild.code-snippets'));
            } else {
                Log.warn('Snippet could not found');
            }

        } else {
            destDir = path.join(this.options.directory, 'src', this.options.imageName);
            testDestDir = path.join(this.options.directory, 'tests', 'unit', this.options.imageName);
        }

        if (this.force || (fs.existsSync(layoutDir) && !fs.existsSync(destDir))) {

            if (this.withProjectLayout) {
                await fs.copy(layoutDir, this.options.directory);

                const sourceDir = path.join(this.options.directory, 'src', 'image');
                fs.moveSync(sourceDir, destDir, { overwrite: true });

                const testDir = path.join(this.options.directory, 'tests', 'unit', 'image');
                fs.moveSync(testDir, testDestDir, { overwrite: true });

            } else {
                await fs.copy(path.join(layoutDir, 'src', 'image'), destDir);
                this.withCron = false;
            }

            if (!this.withCron) {
                Log.info('Remove Default Services');

                const serviceDir = path.join(destDir, 'build', 'services');
                this.removeDir(path.join(serviceDir, 'cron'));
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
