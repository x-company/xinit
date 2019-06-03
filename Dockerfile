#########################################
# Global Base Image
FROM debian:stretch-slim AS xbaseimage

# Copy xbuild Files to root
COPY ./src/.template/ /

WORKDIR /code

RUN xbuild

#########################################
# Bash Base Image
FROM xbaseimage AS xbashimage

COPY ./.build/install.bats.sh /

RUN /install.bats.sh

#########################################
# Node Base Image
FROM xbaseimage AS xnodeimage

COPY ./.build/install.node.sh /

COPY ./*.json /code/

RUN /install.node.sh
