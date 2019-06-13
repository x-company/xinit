/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
/*
 * @Script: BuildfileUpdater.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-06-11 12:23:43
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-11 12:32:26
 * @Description: This is description.
 */

import fs from 'fs-extra';
import path from 'path';
import { Updater } from './Updater';

export class BuildfileUpdater extends Updater {

    public async update() {

        const directory = path.join(this.options.directory, 'src', this.options.imageName, 'build');
        await fs.ensureDir(directory);

        const file = path.join(directory, 'build.sh');
        if (!fs.existsSync(file)) {

            const content = `#!/usr/bin/env bash
# -*- coding: utf-8 -*-

# POWERTIP: Use Snippet xb-build
# Hint: Look also for other Snippets with the Prefix xb

`;
            await fs.writeFile(file, content, { encoding: 'utf-8' });
            await fs.chmod(file, 0o755);
        }

    }
}
