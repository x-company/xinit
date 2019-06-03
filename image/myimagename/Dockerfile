FROM mybaseimagename

LABEL   maintainer="<Your mail address>" \
        vendor="<Your Firm Name>" \
        description="<Describe your Image>" \
        version="0.1.0"

WORKDIR /build

COPY ./dist/ /

RUN ./build.sh

ENV LANG="de_DE.UTF-8"

ENTRYPOINT ["/sbin/xinit"]

HEALTHCHECK --interval=5s --timeout=3s CMD /usr/local/bin/healthcheck.sh || exit 1
