/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: ReadmeUpdater.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-06-11 10:39:26
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-11 12:34:06
 * @Description: This is description.
 */

import fs from 'fs-extra';
import path from 'path';
import { Updater } from './Updater';
import { UpdaterOptions } from './UpdaterOptions';
import { Log } from '../helpers/Log';
import { Shell } from '../helpers/Shell';
import { ShellOptions } from '../helpers/ShellOptions';

export class ReadmeUpdater extends Updater {

    public async update() {

        const file = path.join(this.options.directory, 'README.md');
        if (!fs.existsSync(file)) {
            Log.info('Create AppVersion');

            const shellOptions: ShellOptions = {
                cwd: this.options.directory,
                detached: false,
                windowsHide: true,
            };

            let versionBadge = await Shell.execute('appvmgr generate-badge version', shellOptions);
            let statusBadge = await Shell.execute('appvmgr generate-badge status', shellOptions);
            let buildBadge = await Shell.execute('appvmgr generate-badge build', shellOptions);

            versionBadge = versionBadge.replace('AppVersion Manager: Version badge generated! ', '');
            versionBadge = versionBadge.replace('AppVersion Manager: Copy generated Badges to your Markdown Files, defined in your appversion.json.', '');
            versionBadge = versionBadge.trim();

            statusBadge = statusBadge.replace('AppVersion Manager: Status badge generated! ', '');
            statusBadge = statusBadge.replace('AppVersion Manager: Copy generated Badges to your Markdown Files, defined in your appversion.json.', '');
            statusBadge = statusBadge.trim();

            buildBadge = buildBadge.replace('AppVersion Manager: Build badge generated! ', '');
            buildBadge = buildBadge.replace('AppVersion Manager: Copy generated Badges to your Markdown Files, defined in your appversion.json.', '');
            buildBadge = buildBadge.trim();

            const content = `# ${this.options.imageName}

${versionBadge}
${statusBadge}
${buildBadge}
[![CircleCI](https://circleci.com/gh/${this.options.imageName}/tree/master.svg?style=svg)](https://circleci.com/gh/${this.options.imageName}/tree/master)
`;
            await fs.writeFile(file, content, { encoding: 'utf8' });
            await fs.chmod(file, 0o644);
        }
    }
}
