#!/usr/bin/env bash
# -*- coding: utf-8 -*-

testarea="../../testarea"
serviceName="TestService"
imageName1="TestBaseImage"

rm -rf "$testarea"

# Create a Base Image Layout
xinit layout create "$imageName1" -d "$testarea"

# Create a Base Image Layout
# xinit layout create "$imageName2" -d "$testarea"

# Create a Base Image Layout
# xinit layout create "$imageName1" -d "$testarea"

# Create a new Service
xinit service create "$serviceName" -i "$imageName1" -d "$testarea"
