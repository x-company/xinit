FROM xcompany/xbuild:latest

LABEL   maintainer="<Your mail address>" \
        vendor="<Your Firm Name>" \
        description="<Describe your Image>" \
        version="0.1.0"

WORKDIR /build

COPY ./build/ /

RUN ./build.sh

ENTRYPOINT ["/sbin/xinit"]

HEALTHCHECK --interval=5s --timeout=3s CMD /usr/local/bin/healthcheck.sh || exit 1
