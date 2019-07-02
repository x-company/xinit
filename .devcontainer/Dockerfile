#########################################
# Global Base Image for Development
FROM    xcompany/xbuild:latest

COPY ./xbuild.local /build/
COPY ./sources.list /build/

WORKDIR /workspace
RUN     xb-build
