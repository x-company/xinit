#!/usr/bin/env bash
# -*- coding: utf-8 -*-

testarea1="../../testarea/without"
testarea2="../../testarea/with"
imageName="xcompany/mariadb"
serviceName="TestService"

rm -rf "$testarea1"
rm -rf "$testarea2"

# Creates a Image Layout without a Project Structure
xbuild layout create --directory "$testarea1"

# Create a new Service
xbuild service create --directory "$testarea1" --name "$serviceName"


# Creates a Image Layout with a Project Structure
xbuild layout create --directory "$testarea2" --name "$imageName" --with-project-layout

# Create a new Service
xbuild service create --directory "$testarea2" --name "$serviceName"
