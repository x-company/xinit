/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
/*
 * @Script: EventUpdater.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-06-11 12:23:43
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-14 00:33:24
 * @Description: This is description.
 */

import fs from 'fs-extra';
import path from 'path';
import { Updater } from './Updater';
import { Log } from '../helpers/Log';

export class EventUpdater extends Updater {

    constructor() {
        super();

    }

    public async update() {

        Log.info('Create Event for your Image');
        const directory = this.options.directory;
        await fs.ensureDir(directory);

        const file = path.join(directory, `${this.options.eventName}.${this.options.eventExtension}`);
        if (!fs.existsSync(file)) {

            const content = `#!/usr/bin/env bash
# -*- coding: utf-8 -*-

# Define here Actions when your Image starts or shutdowns

`;
            await fs.writeFile(file, content, { encoding: 'utf-8' });
            await fs.chmod(file, 0o755);
        } else {
            Log.warn('Event could not created. File already exists.');
        }

    }
}
