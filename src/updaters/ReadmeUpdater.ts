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
import { Log } from '../helpers/Log';
import { Shell } from '../helpers/Shell';
import { ShellOptions } from '../helpers/ShellOptions';

export class ReadmeUpdater extends Updater {

    public async update() {
        Log.info('Create Readme File with Badges');

        const file = path.join(this.options.directory, 'README.md');
        if (!fs.existsSync(file)) {


            const shellOptions: ShellOptions = {
                cwd: this.options.directory,
                detached: false,
                windowsHide: true,
                silent: true,
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

| Type | States |
|---|---|
| [Source](https://github.com/${this.options.imageName}"View Source") | ${versionBadge} ${statusBadge} ${buildBadge} |
| [Docker Image](https://cloud.docker.com/u/xcompany/repository/docker/xcompany "Show Image on Docker Hub") | [![](https://images.microbadger.com/badges/image/${this.options.imageName}.svg)](https://microbadger.com/images/${this.options.imageName} "Get your own image badge on microbadger.com") [![](https://images.microbadger.com/badges/version/xcompany/xbuild.svg)](https://microbadger.com/images/${this.options.imageName} "Get your own version badge on microbadger.com") [![](https://images.microbadger.com/badges/commit/xcompany/xbuild.svg)](https://microbadger.com/images/${this.options.imageName} "Get your own commit badge on microbadger.com") [![](https://images.microbadger.com/badges/license/${this.options.imageName}.svg)](https://microbadger.com/images/${this.options.imageName} "Get your own license badge on microbadger.com") |
| [Known Vulnerabilities](https://snyk.io//test/github/${this.options.imageName} "View Security Status") |[![Known Vulnerabilities](https://snyk.io//test/github/${this.options.imageName}/badge.svg?targetFile=package.json)](https://snyk.io//test/github/${this.options.imageName}?targetFile=package.json) |
| [Continuous Integration](https://circleci.com/gh/${this.options.imageName}/tree/master "View Build Status") | [![CircleCI](https://circleci.com/gh/${this.options.imageName}/tree/master.svg?style=svg)](https://circleci.com/gh/${this.options.imageName}/tree/master) |


## Development Dependencies

We strongly suggest to use a Linux Distribution to develop for this Project.

For Windows you have to use Visual Studio Code with the suggested Extensions. To start Development open this Project in a DevContainer (*F1 -> Remote Containers: Open Folder in Container*).

- Docker 18.x
- NodeJS 8.x or above
- Yarn - \`npm install -g yarn\`
- shellcheck - \`apt install shellcheck\`
- bats - \`apt install bats\`
- Visual Studio Code v1.34 to use the Dev Container and Code Snippets

After you have installed this Tools open Visual Studio Code and install all recommended Extensions. Please notice also our [Contributing](CONTRIBUTING.md). Thanks.

`;
            await fs.writeFile(file, content, { encoding: 'utf8' });
            await fs.chmod(file, 0o644);
        } else {
            Log.warn('Readme File could not created. File already exists.');
        }
    }
}
