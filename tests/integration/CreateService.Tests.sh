#!/usr/bin/env bash
# -*- coding: utf-8 -*-

testDir="testarea"
serviceName="TestService"
imageName1="TestBaseImage1"
imageName2="TestBaseImage2"

# Create a Base Image Layout
xinit layout create "$imageName1" -d "$testDir"

# Create a Base Image Layout
xinit layout create "$imageName2" -d "$testDir"

# Create a Base Image Layout
xinit layout create "$imageName1" -d "$testDir"

# Create a new Service
xinit service create "$serviceName" -i "$imageName1" -d "$testDir"
