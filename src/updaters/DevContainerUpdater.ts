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
import { Log } from '../helpers/Log';

export class DevContainerUpdater extends Updater {

    public async update() {

        Log.info('Create Dev Container Files');

        const directory = path.join(this.options.directory, '.devcontainer');
        const ciDirectory = path.join(this.options.directory, '.ci');
        await fs.ensureDir(directory);

        await this.updateDevContainerFile(directory);
        await this.updateDockerfile(directory);

        await this.updateDockerComposeFile(directory);
        await this.updateDockerComposeFile(ciDirectory, true);

        await this.updateDockerComposeFileForDev(directory);

        await this.updateDockerComposeFileForCI(directory);
        await this.updateDockerComposeFileForTests(directory);
    }

    private async updateDevContainerFile(directory: string) {

        Log.info('Create Configuration for Dev Container');
        const file = path.join(directory, 'devcontainer.json');
        if (!fs.existsSync(file)) {

            const content = `// See https://aka.ms/vscode-remote/devcontainer.json for format details.
{
    "name": "${this.options.imageName}",
    "dockerComposeFile": [
        "docker-compose.yml",
        "docker-compose.dev.yml",
    ],
    "service": "run",
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
        } else {
            Log.warn('DevContainer Configuration could not created. File already exists.');
        }
    }

    private async updateDockerfile(directory: string) {

        Log.info('Create Dockerfile for Dev Container');
        const file = path.join(directory, 'Dockerfile');
        if (!fs.existsSync(file)) {

            const content = `FROM xcompany/xbuild:latest

COPY   ../src/${this.options.imageName}/build/ /build/

COPY   ../src/${this.options.imageName}/rootfs/ /

COPY    ./xbuild.conf /build/xbuild.conf

COPY    ./sources.list /build/sources.list

RUN    xb-build

WORKDIR /

`;
            await fs.writeFile(file, content, { encoding: 'utf8' });
            await fs.chmod(file, 0o644);
        } else {
            Log.warn('Dockerfile could not created. File already exists.');
        }
    }

    private async updateDockerComposeFile(directory: string, isCI: boolean = false) {

        Log.info('Create Docker Compose File for Dev Container');
        const file = path.join(directory, 'docker-compose.yml');
        if (!fs.existsSync(file)) {

            let content = `version: "3.7"
services:
  build:`;

            if (!isCI) {
                content += `    image: ${this.options.imageName}:devcontainer
    build: Dockerfile`;
            } else {
                content += `    image: ${this.options.imageName}:test
    build:
      context: ..
      dockerfile: Dockerfile

  test:
    image: xcompany/hellodocker:test
    depends_on:
      - build
    volumes:
      - ../tests/unit/:/tests/
    command: /usr/local/bin/xb-test
`;
            }

            await fs.writeFile(file, content, { encoding: 'utf8' });
            await fs.chmod(file, 0o644);
        } else {
            Log.warn('Docker Compose File could not created. File already exists.');
        }
    }

    private async updateDockerComposeFileForDev(directory: string) {

        Log.info('Create Docker Compose File for Dev Container');
        const file = path.join(directory, 'docker-compose.dev.yml');
        if (!fs.existsSync(file)) {

            const content = `version: "3.7"
services:
  run:
    image: ${this.options.imageName}:devcontainer
    depends_on:
      - build
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
        } else {
            Log.warn('Docker Compose File could not created. File already exists.');
        }
    }

    private async updateDockerComposeFileForTests(directory: string) {

        Log.info('Create Docker Compose Test File for Dev Container');
        const file = path.join(directory, 'docker-compose.test.yml');
        if (!fs.existsSync(file)) {

            const content = `version: "3.7"

services:
  test:
    image: ${this.options.imageName}:devcontainer
    depends_on:
      - build
    volumes:
      - ../tests/unit/:/tests/
    command: /usr/local/bin/xb-test
`;
            await fs.writeFile(file, content, { encoding: 'utf8' });
            await fs.chmod(file, 0o644);
        } else {
            Log.warn('Docker Compose File could not created. File already exists.');
        }
    }

    private async updateDockerComposeFileForCI(directory: string) {

        Log.info('Create Docker Compose Test File for Dev Container');
        const file = path.join(directory, 'docker-compose.test.yml');
        if (!fs.existsSync(file)) {

            const content = `version: "3.7"

services:
  test:
    image: ${this.options.imageName}:devcontainer
    depends_on:
      - build
    volumes:
      - ../tests/unit/:/tests/
      - ../src/${this.options.imageName}/build/:/build/
      - ./xbuild.ci.conf:/etc/xbuild/xbuild.conf
    command: /usr/local/bin/xb-test
`;
            await fs.writeFile(file, content, { encoding: 'utf8' });
            await fs.chmod(file, 0o644);
        } else {
            Log.warn('Docker Compose File could not created. File already exists.');
        }
    }
}
