#########################################
# Global Base Image for Development
FROM  xcompany/xbuild:latest

LABEL maintainer="info@x-company.de" \
    vendor="IT Solutions Roland Breitschaft" \
    description="A Base Image for Development of xinit" \
    version="0.1.0"

WORKDIR /workspace

COPY ./build.sh /

RUN /build.sh
