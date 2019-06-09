#!/usr/bin/env bash
# -*- coding: utf-8 -*-

testArea="testarea"
serviceName="TestService"
imageName1="TestBaseImage1"
imageName2="TestBaseImage2"

# Create a Base Image Layout
xinit layout create "$imageName1" -d "$testArea"

# Create a Base Image Layout
# xinit layout create "$imageName2" -d "$testArea"

# Create a Base Image Layout
# xinit layout create "$imageName1" -d "$testArea"

# Create a new Service
xinit service create "$serviceName" -i "$imageName1" -d "$testArea"
