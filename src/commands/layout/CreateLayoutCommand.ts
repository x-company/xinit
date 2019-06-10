/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: CreateLayoutCommand.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-03-27 12:17:18
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-10 23:16:45
 * @Description: This is description.
 */

import fs from 'fs-extra';
import path from 'path';
import { Command } from '../../helpers/Command';
import { LayoutCommandOptions } from './LayoutCommandOptions';
import { Info } from '../../helpers/Info';
import { UpdateManager } from '../../updaters/UpdateManager';
import { PackageJsonUpdater } from '../../updaters/PackageJsonUpdater';
import { ProjectLayoutUpdater } from '../../updaters/ProjectLayoutUpdater';

export class CreateLayoutCommand extends Command<LayoutCommandOptions> {

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

            let folderPrefix = '../..';
            if (this.options.imageName.indexOf('/')) {
                folderPrefix = '../../..';
            }

            const imageRoot = Info.getImageRoot(this.options.imageName, this.options.directory);
            const projectRoot = path.join(imageRoot, folderPrefix);

            const buildDir = path.join(imageRoot, 'build');
            const buildSvDir = path.join(buildDir, 'services');
            const vscodeDir = path.join(projectRoot, '.vscode');
            const devcontainerDir = path.join(projectRoot, '.devcontainer');
            const circleciDir = path.join(projectRoot, '.circleci');
            const testDir = path.join(projectRoot, 'tests', 'unit', this.options.imageName);

            fs.ensureDirSync(imageRoot);
            fs.ensureDirSync(buildDir);
            fs.ensureDirSync(buildSvDir);
            fs.ensureDirSync(vscodeDir);
            fs.ensureDirSync(testDir);
            fs.ensureDirSync(devcontainerDir);
            fs.ensureDirSync(circleciDir);

            UpdateManager.update(new ProjectLayoutUpdater(), projectRoot);
            UpdateManager.update(new PackageJsonUpdater(this.options), projectRoot);

            await this.createDockerComposeFile(projectRoot);
            await this.createDockerFile(imageRoot);
            await this.createBuildFile(buildDir);

        } catch (e) {
            throw e;
        }
    }

    private async createDockerComposeFile(directory: string) {

        let name = this.options.imageName;
        if (name.indexOf('/') !== -1) {
            name = name.substring(name.lastIndexOf('/') + 1);
        }

        const dockerComposeFile = path.join(directory, 'docker-compose.yml');

        let content = '';
        if (!fs.existsSync(dockerComposeFile)) {
            content = `version: "3.7"

services:
`;
        }

        content += `
  ${name}:
    build:
      context: ./src/${this.options.imageName}

`;
        await fs.writeFile(dockerComposeFile, content, { encoding: 'utf-8' });
    }

    private async createDockerFile(directory: string) {

        const content = `FROM xcompany/xbuild:latest

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
            await fs.writeFile(dockerFile, content, { encoding: 'utf-8' });
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
        const buildFile = path.join(directory, 'build.sh');
        if (!fs.existsSync(buildFile)) {
            await fs.writeFile(buildFile, content, { encoding: 'utf-8' });

            await fs.chmod(buildFile, 0o755);
        }
    }
}
