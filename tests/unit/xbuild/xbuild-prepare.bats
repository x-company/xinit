#!/usr/bin/env bats
# -*- coding: utf-8 -*-

@test "Test Base Image Preparation" {

    # Arrange
    flag_file=/var/local/xbuild/finished

    # Assert
    # Exists Install Flag
    [ -f "$flag_file" ]
}
