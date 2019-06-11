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

        const directory = path.join(this.options.directory, 'src', this.options.imageName);
        await fs.ensureDir(directory);

        const file = path.join(directory, 'build.sh');
        if (!fs.existsSync(file)) {

            const content = `#!/usr/bin/env bash
# -*- coding: utf-8 -*-

# Load the xBuild System
source /usr/local/include/xbuild/loader

# Enable Debug Mode
# debug --on

# Enable Debug Mode inclusive Debug Outputs from Shell
# debug --on --dev

# Load the Environment Variables to the current Session
loadvars

# For Debug you can print current Vars
# printvars

# Prepare the Image
# prepare

# Alternatives
# Remarks: If you add the Param --dev additional Development Tools will installed
# Example: prepare --dev

# Prepare the Image
# prepare

# Prepare the Image inclusive NodeJS 12.x
prepare --with-node-12

# Prepare the Image inclusive DotNet Core
# prepare --with-dotnet

# Prepare the Image inclusive PowerShell
# prepare --with-powershell

header "Prepare Services for Install ..."
services=

header "Build Services ..."
build --services "$services"

# Persist Environment Variables
savevars

# Cleanup the Build and the Image. It should called when you finished your Work
cleanup

header "That's it. xBuild has finished his work. Have a nice Day"

`;
            await fs.writeFile(file, content, { encoding: 'utf-8' });
            await fs.chmod(file, 0o755);
        }

    }
}
