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
xbuild service create "$serviceName" -i "$imageName" -d "$testarea" --add-fix --add-log --add-init --add-finish --add-shutdown --add-rules --priority 20

# xbuild service modify "$serviceName" -i "$imageName" -d "$testarea"
