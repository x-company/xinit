#!/usr/bin/env bash
# -*- coding: utf-8 -*-

source /usr/local/include/xbuild

header "Prepare Docker Image for Node Testing"

nodeVer="12"
if [ "$XBUILD_MIRROR_IS_AVAIL" = "true" ]
then
    if [ "$XBUILD_OSNAME" = "ubuntu" ]
    then
        {
            echo "deb [arch=amd64] $XBUILD_MIRROR/node/node_$nodeVer.x $XBUILD_OSCODENAME main"
        } > /etc/apt/sources.list.d/node.list
    else
        {
            echo "deb [arch=amd64] $XBUILD_MIRROR/node/node_$nodeVer.x $XBUILD_OSCODENAME main"
            echo "#deb [arch=amd64] $XBUILD_MIRROR/node/node_$nodeVer.x sid main"
        } > /etc/apt/sources.list.d/node.list
    fi
else
    {
        echo "deb https://deb.nodesource.com/node_$nodeVer.x $XBUILD_OSCODENAME main"
        echo "deb-src https://deb.nodesource.com/node_$nodeVer.x $XBUILD_OSCODENAME main"
    } > /etc/apt/sources.list.d/node.list
fi

wget -qO- https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add -

execute apt-get -q update

log "Install NodeJS $nodeVer ..."
install nodejs

log "Install required Node Packages ..."
npm install -g nodemon typescript ts-node rimraf yarn mocha chai

log "Install Node Dependencies ..."
npm install
