#!/usr/bin/env bash
# -*- coding: utf-8 -*-

source /usr/local/sbin/xbuild

header "Prepare Docker Image for Bash Testing"

execute apt-get -q update

log "Install Bats ..."
install bats
