#########################################
# Global Base Image for Development
FROM    xcompany/xbuild:latest

COPY ./xbuild.conf /etc/xbuild/
COPY ./sources.list /etc/xbuild/

WORKDIR /workspace
RUN     xb-build
