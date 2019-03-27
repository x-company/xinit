#!/usr/bin/env bash
# -*- coding: utf-8 -*-

set -e
source /usr/local/include/sbin/xbuild.sh

# Comment out if you don't want Debug Messages
set -x

# Services to Install
services="<List your Services which will installed by apt>"

header "Install Services ..."
install --packages "$services"

header "Configure Services ..."
configure --services "$services"

header "Cleanup the Build ..."
cleanup

