/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: CreateCommand.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-03-27 12:17:18
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-03-27 12:44:11
 * @Description: This is description.
 */

import fs from 'fs-extra';
import path from 'path';
import { Command } from '../../helpers/Command';
import { CliManager } from '../../helpers/CliManager';
import { LayoutCommandOptions } from './LayoutCommandOptions';
import { Info } from '../../helpers/Info';
export class CreateCommand extends Command<LayoutCommandOptions> {

    constructor(options?: LayoutCommandOptions) {

        const defaultOptions: LayoutCommandOptions = {
            imageName: 'baseimage',
            baseImageName: 'xcom:baseimage',
        };

        super({
            ...defaultOptions,
            ...options,
        });
    }

    protected async execute() {

        try {

            const imageRoot = Info.getImageRoot(this.options.imageName);

            const buildDir = path.join(imageRoot, 'build');
            const buildSvDir = path.join(buildDir, 'services');
            const svDir = path.join(imageRoot, 'etc/sv');
            const xinitDir = path.join(imageRoot, 'etc/xinit.d');
            const usrDir = path.join(imageRoot, 'usr/local/bin');
            const varDir = path.join(imageRoot, 'var/local/xinit');

            fs.ensureDirSync(imageRoot);
            fs.ensureDirSync(buildDir);
            fs.ensureDirSync(buildSvDir);
            fs.ensureDirSync(svDir);
            fs.ensureDirSync(xinitDir);
            fs.ensureDirSync(usrDir);
            fs.ensureDirSync(varDir);

            await this.createDockerFile(path.join(imageRoot, '..'));
            await this.createBuildFile(buildDir);
            await this.createHealthcheckFile(usrDir);

        } catch (e) {
            throw e;
        }
    }

    private async createDockerFile(directory: string) {

        const dockerFileContent = `FROM ${this.options.baseImageName || 'xcom:baseimage'}

LABEL   maintainer="<Your mail address>" \\
        vendor="<Your Firm Name>" \\
        description="<Describe your Image>" \\
        version="0.1.0"

WORKDIR /build

COPY ./dist/ /

RUN ./build.sh

ENV LANG="de_DE.UTF-8"

ENTRYPOINT ["/sbin/xinit"]

HEALTHCHECK --interval=5s --timeout=3s CMD /usr/local/bin/healthcheck.sh || exit 1
`;
        const dockerFile = path.join(directory, 'Dockerfile');
        if (!fs.existsSync(dockerFile)) {
            await fs.writeFile(dockerFile, dockerFileContent, { encoding: 'utf-8' });
        }

        const dockerIgnoreContent = `Dockerfile
.dockerignore
`;

        const dockerIgnoreFile = path.join(directory, '.dockerignore');
        if (!fs.existsSync(dockerIgnoreFile)) {
            await fs.writeFile(dockerIgnoreFile, dockerIgnoreContent, { encoding: 'utf-8' });
        }
    }

    private async createBuildFile(directory: string) {

        const buildFileContent = `#!/usr/bin/env bash
# -*- coding: utf-8 -*-

set -e
source /usr/local/include/sbin/xbuild.sh

# Comment out if you don't want Debug Messages
# set -x

# Services to Install
services="<List your Services which will installed by apt>"

header "Install Services ..."
install --packages "$services"

header "Configure Services ..."
configure --services "$services"

header "Cleanup the Build ..."
cleanup

`;
        const buildFile = path.join(directory, 'build.sh');
        if (!fs.existsSync(buildFile)) {
            await fs.writeFile(buildFile, buildFileContent, { encoding: 'utf-8' });

            await fs.chmod(buildFile, 0o755);
        }
    }

    private async createHealthcheckFile(directory: string) {

        const healthcheckFileContent = `#!/usr/bin/env bash
# -*- coding: utf-8 -*-

set -e

# Place here your Health Check Tests

# When everything is ok, than return 0, otherwise return 1
exit 0
`;
        const healthcheckFile = path.join(directory, 'healthcheck.sh');
        if (!fs.existsSync(healthcheckFile)) {
            await fs.writeFile(healthcheckFile, healthcheckFileContent, { encoding: 'utf-8' });
            await fs.chmod(healthcheckFile, 0o755);
        }
    }
}
