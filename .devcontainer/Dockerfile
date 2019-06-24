#########################################
# Global Base Image for Development
FROM  xcompany/xbuild:latest

COPY ./build /build/

RUN xb-build

WORKDIR /workspace
