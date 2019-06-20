#!/usr/bin/env bash
# -*- coding: utf-8 -*-

testarea="../../testarea"
imageName="xcompany/mariadb"
serviceName="TestService"
eventName="TestEvent"


rm -rf "$testarea"

# Create a Base Image Layout
xbuild layout create "$imageName" -d "$testarea"

# Create a Base Image Layout
# xbuild layout create "$imageName2" -d "$testarea"

# Create a Base Image Layout
# xbuild layout create "$imageName1" -d "$testarea"

# Create a new Service
xbuild service create "$serviceName" -i "$imageName" -d "$testarea"

# --init
# --prev-init
# --post-init
# --shutdown
# --prev-shutdown
# --post-shutdown

# Create new Event
# xbuild event create "$eventName" -i "$imageName" -d "$testarea" --init --prev-init --shutdown --post-shutdown
