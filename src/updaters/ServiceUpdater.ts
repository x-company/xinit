/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: ServiceUpdater.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-06-11 12:18:35
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-11 17:45:34
 * @Description: This is description.
 */

import fs from 'fs-extra';
import path from 'path';
import { Updater } from './Updater';

export class ServiceUpdater extends Updater {

    public async update() {

        if (!this.options.serviceName) {
            throw new Error('No Service Name is given. Service could not updated.');
        }

        const directory = path.join(this.options.directory, 'src', this.options.imageName, 'build', 'services', this.options.serviceName);
        const fsrootDir = path.join(directory, 'fsroot');
        await fs.ensureDir(directory);
        await fs.ensureDir(fsrootDir);

        await this.updateServiceInstallFile(directory);
        await this.updateServiceFile(directory);
        await this.updateHealthcheckFile(directory);
    }

    private async updateServiceInstallFile(directory: string) {

        const file = path.join(directory, `${this.options.serviceName}.build`);
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

# Install here your Service for example we show how to install mariadb
# install --packages mariadb

# Persist Environment Variables
savevars

`;
            await fs.writeFile(file, content, { encoding: 'utf-8' });
            await fs.chmod(file, 0o755);
        }
    }

    private async updateServiceFile(directory: string) {

        const file = path.join(directory, `${this.options.serviceName}.run`);
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

# Execute the Service
exec 2>&1
exec <Service Command>

`;
            await fs.writeFile(file, content, { encoding: 'utf-8' });
            await fs.chmod(file, 0o755);
        }
    }

    private async updateHealthcheckFile(directory: string) {

        const file = path.join(directory, `${this.options.serviceName}.health`);
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

# Place here your Health Check Tests

# When everything is ok, than return 0, otherwise return 1
exit 0
`;
            await fs.writeFile(file, content, { encoding: 'utf-8' });
            await fs.chmod(file, 0o755);
        }
    }
}
