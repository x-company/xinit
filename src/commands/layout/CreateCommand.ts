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
 * @Last Modified At: 2019-06-03 13:17:43
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
        };

        super({
            ...defaultOptions,
            ...options,
        });
    }

    protected async execute() {

        try {

            const imageRoot = Info.getImageRoot(this.options.imageName, this.options.directory);
            const distRoot = path.join(imageRoot, 'dist');

            const buildDir = path.join(imageRoot, 'build');
            const buildSvDir = path.join(buildDir, 'services');

            fs.ensureDirSync(imageRoot);
            fs.ensureDirSync(buildDir);
            fs.ensureDirSync(buildSvDir);

            await this.createDockerFile(path.join(imageRoot, '..'));
            await this.createBuildFile(buildDir);

        } catch (e) {
            throw e;
        }
    }

    private async createDockerFile(directory: string) {

        const dockerFileContent = `FROM xcompany/xbuild:latest

LABEL   maintainer="<Your mail address>" \\
        vendor="<Your Firm Name>" \\
        description="<Describe your Image>" \\
        version="0.1.0"

WORKDIR /build

COPY ./build/ /

RUN ./build.sh

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

# Set the Error Handling for the first Error and for unused Variables
set -eu -o pipeline

# If you want more Debug Infos comment the follow line out
# set -eux -o pipeline

# Load the xbuild System
source /usr/local/include/xbuild

header "Prepare Services to Install ..."
services="<List your Services which will installed by apt>"

header "Build Services ..."
build --services $services

header "Cleanup the Build ..."
cleanup

`;
        const buildFile = path.join(directory, 'build.sh');
        if (!fs.existsSync(buildFile)) {
            await fs.writeFile(buildFile, buildFileContent, { encoding: 'utf-8' });

            await fs.chmod(buildFile, 0o755);
        }
    }
}
