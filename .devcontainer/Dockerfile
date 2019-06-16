#########################################
# Global Base Image for Development
FROM  xcompany/xbuild:latest

WORKDIR /workspace

COPY ./build.sh /build/

RUN /build/build.sh

SHELL ["/bin/bash", "-l", "-c"]
