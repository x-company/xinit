/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: CreateCommand.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-03-26 21:47:35
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-03-27 12:17:03
 * @Description: This is description.
 */

import fs from 'fs-extra';
import path from 'path';
import { Command } from '../../helpers/Command';
import { ServiceCommandOptions } from './ServiceCommandOptions';
import { CliManager } from '../../helpers/CliManager';
import { Info } from '../../helpers/Info';

export class CreateCommand extends Command<ServiceCommandOptions> {


    constructor(options?: ServiceCommandOptions) {
        super(options);
    }

    protected async execute() {

        try {

            const imageRoot = Info.getImageRoot(this.options.imageName, this.options.directory);

            const svInstallDir = path.join(imageRoot, 'build', 'services', this.options.serviceName);
            const svRunitDir = path.join(imageRoot, 'dist', 'etc', 'sv', this.options.serviceName);
            const xinitDir = path.join(imageRoot, 'dist', 'etc', 'xinit.d');

            fs.ensureDirSync(svInstallDir);
            fs.ensureDirSync(svRunitDir);
            fs.ensureDirSync(xinitDir);

            await this.createServiceControlFile(svInstallDir);
            await this.createServiceInstallFile(svInstallDir);
            await this.createServiceFile(svInstallDir);
            await this.createHealthcheckFile(svInstallDir);

        } catch (e) {
            throw e;
        }
    }

    private async createServiceControlFile(directory: string) {

        const content = `#!/usr/bin/env bash
# -*- coding: utf-8 -*-

### BEGIN INIT INFO
# Provides:          ${this.options.serviceName}
# Required-Start:    <List Services which should started, before this Service can started, e.g. $syslog>
# Required-Stop:     <List Services which should stopped, before this Service will stopped, e.g. $syslog>
# Should-Start:      <List Services which should started, before this Service will started, e.g. $syslog>
# Should-Stop:       <List Services which can stopped, after this Service is stopped, e.g. $syslog>
# Short-Description: <A short Description>
# Description:       <A long Description>
### END INIT INFO

SCRIPT="${this.options.serviceName}"
RUNAS="${this.options.user}"

PIDFILE=/var/run/xinit/${this.options.serviceName}.pid
LOGFILE=/var/log/xinit/${this.options.serviceName}.log

start(){
  if [ -f "$PIDFILE" ] && kill -0 $(cat "$PIDFILE"); then
    echo 'Service already running' >&2
    return 1
  fi

  echo 'Starting service' >&2
  local CMD="$SCRIPT &> \"$LOGFILE\" & echo \$!"

  su -c "$CMD" $RUNAS > "$PIDFILE"
  echo 'Service started' >&2
}

stop(){
  if [ ! -f "$PIDFILE" ] || ! kill -0 $(cat "$PIDFILE"); then
    echo 'Service not running' >&2
    return 1
  fi

  echo 'Stopping service' >&2

  kill -15 $(cat "$PIDFILE") && rm -f "$PIDFILE"
  echo 'Service stopped' >&2
}

pre(){
  if [ ! -f "$PIDFILE" ] || ! kill -0 $(cat "$PIDFILE"); then
    echo 'Service not running' >&2
    return 1
  fi

  echo 'Stopping service' >&2
}

post(){
  if [ -f "$PIDFILE" ] && kill -0 $(cat "$PIDFILE"); then
    echo 'Service already running' >&2
    return 1
  fi

  echo 'Stopping service' >&2
}


# Carry out specific functions when asked to by the system
case "$1" in
  start)
    echo "Starting Service '${this.options.serviceName}' ..."
    start
    ;;
  pre)
    echo "Execute PreShutdown Scripts before stopping Service '${this.options.serviceName}' ..."
    pre
    ;;
  stop)
    echo "Stopping Service '${this.options.serviceName}' ..."
    stop
    sleep 2
    ;;
  post)
    echo "Execute PostShutdown Scripts before stopping Service '${this.options.serviceName}' ..."
    post
    ;;
  *)
    echo "Usage: /etc/xinit.d/${this.options.serviceName} {start|pre|stop|post}"
    exit 1
    ;;
esac

exit 0
`;

        // const scriptFileName = path.join(directory, this.options.serviceName);
        const scriptFileName = path.join(directory, `${this.options.serviceName}.service`);
        await fs.writeFile(scriptFileName, content, { encoding: 'utf-8' });
    }

    private async createServiceInstallFile(directory: string) {

        const content = `#!/usr/bin/env bash
# -*- coding: utf-8 -*-

# Set the Error Handling for the first Error and for unused Variables
set -eu -o pipeline

# If you want more Debug Infos comment the follow line out
# set -eux -o pipeline

source /usr/local/include/xbuild


# Execute Commands to Configure the Service
$services=(<List your Services which will installed by apt>)

header "Install Service  ..."
install --packages "$services"

header "Configure Services ..."
configure --services "$services"

`;
        const scriptFileName = path.join(directory, `${this.options.serviceName}.build`);
        await fs.writeFile(scriptFileName, content, { encoding: 'utf-8' });
    }

    private async createServiceFile(directory: string) {

        const content = `#!/usr/bin/env bash
# -*- coding: utf-8 -*-

# Set the Error Handling for the first Error and for unused Variables
set -eu -o pipeline

# If you want more Debug Infos comment the follow line out
# set -eux -o pipeline

# Execute the Service
exec 2>&1
exec <Service Command>

`;

        // const scriptFileName = path.join(directory, 'run');
        const scriptFileName = path.join(directory, `${this.options.serviceName}.runit`);
        await fs.writeFile(scriptFileName, content, { encoding: 'utf-8' });

    }

    private async createHealthcheckFile(directory: string) {

        const content = `#!/usr/bin/env bash
# -*- coding: utf-8 -*-

# Set the Error Handling for the first Error and for unused Variables
set -eu -o pipeline

# If you want more Debug Infos comment the follow line out
# set -eux -o pipeline

# Place here your Health Check Tests

# When everything is ok, than return 0, otherwise return 1
exit 0
`;

        const scriptFileName = path.join(directory, `${this.options.serviceName}.health`);
        await fs.writeFile(scriptFileName, content, { encoding: 'utf-8' });
        await fs.chmod(scriptFileName, 0o755);
    }
}
