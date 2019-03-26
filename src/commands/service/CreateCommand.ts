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
 * @Last Modified At: 2019-03-27 00:09:49
 * @Description: This is description.
 */

import fs from 'fs-extra';
import { Command } from '../../helpers/Command';
import { ServiceCommandOptions } from './ServiceCommandOptions';

export class CreateCommand extends Command<ServiceCommandOptions> {


    constructor(options?: ServiceCommandOptions) {
        super(options);
    }

    protected async execute() {

        try {

            const scriptFile = `

#!/usr/bin/env bash
# -*- coding: utf-8 -*-

### BEGIN INIT INFO
# Provides:          ${this.options.name}
# Required-Start:    <List Services which should started, before this Service can started, e.g. $syslog>
# Required-Stop:     <List Services which should stopped, before this Service will stopped, e.g. $syslog>
# Should-Start:      <List Services which should started, before this Service will started, e.g. $syslog>
# Should-Stop:       <List Services which can stopped, after this Service is stopped, e.g. $syslog>
# Short-Description: <A short Description>
# Description:       <A long Description>
### END INIT INFO

SCRIPT=${this.options.name}
RUNAS=${this.options.user}

PIDFILE=/var/run/xinit/${this.options.name}.pid
LOGFILE=/var/log/xinit/${this.options.name}.log

start(){
  if [ -f "$PIDFILE" ] && kill -0 $(cat "$PIDFILE"); then
    echo 'Service already running' >&2
    return 1
  fi

  echo 'Starting service…' >&2
  local CMD="$SCRIPT &> \"$LOGFILE\" & echo \$!"

  su -c "$CMD" $RUNAS > "$PIDFILE"
  echo 'Service started' >&2
}

stop(){
  if [ ! -f "$PIDFILE" ] || ! kill -0 $(cat "$PIDFILE"); then
    echo 'Service not running' >&2
    return 1
  fi

  echo 'Stopping service…' >&2

  kill -15 $(cat "$PIDFILE") && rm -f "$PIDFILE"
  echo 'Service stopped' >&2
}

pre(){
  if [ ! -f "$PIDFILE" ] || ! kill -0 $(cat "$PIDFILE"); then
    echo 'Service not running' >&2
    return 1
  fi

  echo 'Stopping service…' >&2
}

post(){
  if [ -f "$PIDFILE" ] && kill -0 $(cat "$PIDFILE"); then
    echo 'Service already running' >&2
    return 1
  fi

  echo 'Stopping service…' >&2
}


# Carry out specific functions when asked to by the system
case "$1" in
  start)
    echo "Starting Service '${this.options.name}' ..."
    start
    ;;
  pre)
    echo "Execute PreShutdown Scripts before stopping Service '${this.options.name}' ..."
    pre
    ;;
  stop)
    echo "Stopping Service '${this.options.name}' ..."
    stop
    sleep 2
    ;;
  post)
    echo "Execute PostShutdown Scripts before stopping Service '${this.options.name}' ..."
    post
    ;;
  *)
    echo "Usage: /etc/xinit.d/${this.options.name} {start|pre|stop|post}"
    exit 1
    ;;
esac

exit 0
`;

            await fs.writeFile(this.options.name, scriptFile, { encoding: 'utf-8'});

        } catch (e) {
            throw e;
        }
    }
}
