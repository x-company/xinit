#!/usr/bin/env bash
# -*- coding: utf-8 -*-

testarea="../../testarea"
imageName="xcompany/mariadb"
serviceName="TestService"
eventName="TestEvent"


rm -rf "$testarea"

# Create a Base Image Layout
xinit layout create "$imageName" -d "$testarea"

# Create a Base Image Layout
# xinit layout create "$imageName2" -d "$testarea"

# Create a Base Image Layout
# xinit layout create "$imageName1" -d "$testarea"

# Create a new Service
# xinit service create "$serviceName" -i "$imageName" -d "$testarea"

# --init
# --prev-init
# --post-init
# --shutdown
# --prev-shutdown
# --post-shutdown

# Create new Event
# xinit event create "$eventName" -i "$imageName" -d "$testarea" --init --prev-init --shutdown --post-shutdown
