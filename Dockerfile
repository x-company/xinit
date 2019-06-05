#########################################
# Global Base Image
FROM xcompany/xbuild:latest AS prod

LABEL maintainer="info@x-company.de" \
    vendor="IT Solutions Roland Breitschaft" \
    description="A Base Image for Development of xinit" \
    version="0.1.0"


#########################################
# Global Base Image for Development
FROM prod AS dev

LABEL maintainer="info@x-company.de" \
    vendor="IT Solutions Roland Breitschaft" \
    description="A Base Image for Development of xinit" \
    version="0.1.0"

COPY ./.build/install.node.sh /

COPY ./*.json /code/

WORKDIR /code

RUN /install.node.sh
