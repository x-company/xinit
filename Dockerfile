#########################################
# Global Base Image
FROM debian:stretch-slim AS xbaseimage

LABEL vendor="IT Solutions Roland Breitschaft" \
    version="0.1.0" \
    description="A Base Image for Development of xinit and xbuild"

# Copy xbuild Files to root
COPY ./src/.template/ /

WORKDIR /code

RUN xbuild

#########################################
# Bash Base Image
FROM xbaseimage AS xbashimage

LABEL vendor="IT Solutions Roland Breitschaft" \
    version="0.1.0" \
    description="A Base Image for Development of xbuild"

COPY ./.build/install.bats.sh /

RUN /install.bats.sh

#########################################
# Node Base Image
FROM xbaseimage AS xnodeimage

LABEL vendor="IT Solutions Roland Breitschaft" \
    version="0.1.0" \
    description="A Base Image for Development of xinit"

COPY ./.build/install.node.sh /

COPY ./*.json /code/

RUN /install.node.sh
