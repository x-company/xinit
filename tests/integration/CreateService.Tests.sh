#!/usr/bin/env bash
# -*- coding: utf-8 -*-

testarea="../../testarea"
imageName="xcompany/mariadb"
serviceName="TestService"


rm -rf "$testarea"

# Create a Base Image Layout
xinit layout create "$imageName" -d "$testarea"

# Create a Base Image Layout
# xinit layout create "$imageName2" -d "$testarea"

# Create a Base Image Layout
# xinit layout create "$imageName1" -d "$testarea"

# Create a new Service
xinit service create "$serviceName" -i "$imageName" -d "$testarea"
