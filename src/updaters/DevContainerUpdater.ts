/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: DevContainerUpdater.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-06-11 12:18:35
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-11 13:43:37
 * @Description: This is description.
 */

import fs from 'fs-extra';
import path from 'path';
import { Updater } from './Updater';

export class DevContainerUpdater extends Updater {

    public async update() {

        const directory = path.join(this.options.directory, '.devcontainer');
        await fs.ensureDir(directory);

        await this.updateDevcontainerFile(directory);
        await this.updateDockerComposeFile(directory);
        await this.updateDockerfile(directory);
        await this.updateBuildfile(directory);
    }

    private async updateDevcontainerFile(directory: string) {

        const file = path.join(directory, 'devcontainer.json');
        if (!fs.existsSync(file)) {

            const content = `// See https://aka.ms/vscode-remote/devcontainer.json for format details.
{
    "name": "${this.options.imageName}",
    "dockerComposeFile": "docker-compose.yml",
    "service": "${this.options.shortImageName}",
    "workspaceFolder": "/workspace",
    "shutdownAction": "stopCompose",

    "extensions": [
        "streetsidesoftware.code-spell-checker",
        "streetsidesoftware.code-spell-checker-german",
        "xiaokangtu.codeheader",
        "philhindle.errorlens",
        "ymotongpoo.licenser",
        "ionutvmi.path-autocomplete",
        "christian-kohler.path-intellisense",
        "alefragnani.bookmarks",
        "pomber.git-file-history",
        "mhutchie.git-graph",
        "emilast.logfilehighlighter",
        "ibm.output-colorizer",
        "johnpapa.vscode-peacock",
        "gruntfuggly.todo-tree",
        "coenraads.bracket-pair-colorizer-2",
        "github.vscode-pull-request-github",
        "emmanuelbeziat.vscode-great-icons",
        "mutantdino.resourcemonitor",

        // Node and Typescript Extensions
        // Comment out if you want develop Node Applications
        /*
        "markis.code-coverage",
        "chrmarti.regex",
        "ms-vscode.vscode-typescript-tslint-plugin",
        "zuoez02.tslint-snippets",
        "kisstkondoros.typelens",
        "pflannery.vscode-versionlens",
        "maty.vscode-mocha-sidebar",
        "adambaldwin.vscode-nsp",
        "eizongmin.node-module-intellisense",
        "christian-kohler.npm-intellisense",
        "gregorbiswanger.json2ts",
        "salbert.comment-ts",
        */

        // Markdown Extensions
        "davidanson.vscode-markdownlint",
        "docsmsft.docs-article-templates",
        "docsmsft.docs-markdown",
        "docsmsft.docs-preview",

        // Bash Extensions
        "rogalmic.bash-debug",
        "bat-snippets.bat-snippets",
        "jetmartin.bats",
        "rpinski.shebang-snippets",
        "foxundermoon.shell-format",
        "remisa.shellman"
    ]
}
`;
            await fs.writeFile(file, content, { encoding: 'utf8' });
            await fs.chmod(file, 0o644);
        }
    }

    private async updateDockerComposeFile(directory: string) {

        const file = path.join(directory, 'docker-compose.yml');
        if (!fs.existsSync(file)) {

            const content = `version: "3.7"

services:
  ${this.options.shortImageName}:
    image: ${this.options.imageName}:devcontainer
    build: .
    volumes:
      # Map the current Source Folder
      - ..:/workspace
      # Configure Git with the current local Settings
      - ~/.gitconfig:/root/.gitconfig
      # Persists Extensions and VSCode Server
      - vscode-server:/root/.vscode-server
    cap_add:
      - SYS_PTRACE
    security_opt:
      - seccomp:unconfined
    command: sleep infinity

volumes:
  vscode-server:
`;
            await fs.writeFile(file, content, { encoding: 'utf8' });
            await fs.chmod(file, 0o644);
        }
    }

    private async updateDockerfile(directory: string) {

        const file = path.join(directory, 'Dockerfile');
        if (!fs.existsSync(file)) {

            const content = `FROM  xcompany/xbuild:latest

WORKDIR /workspace

COPY ./build.sh /

RUN /build.sh
`;
            await fs.writeFile(file, content, { encoding: 'utf8' });
            await fs.chmod(file, 0o644);
        }
    }

    private async updateBuildfile(directory: string) {

        const file = path.join(directory, 'build.sh');
        if (!fs.existsSync(file)) {

            const content = `#!/usr/bin/env bash
# -*- coding: utf-8 -*-

# Load the xBuild System
source /usr/local/include/xbuild/loader

# Load the Environment Variables to the current Session
loadvars

# POWERTIP: Use Snippet xb-prepare-dev to Prepare the Dev Container

# Persist Environment Variables
savevars

# Cleanup the Build and the Image. It should called when you finished your Work
cleanup

header "That's it. Your Dev Container is prepared. Have fun and a nice Day."
`;

            await fs.writeFile(file, content, { encoding: 'utf8' });
            await fs.chmod(file, 0o755);
        }
    }
}
