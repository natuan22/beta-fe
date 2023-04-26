#!/bin/zsh

VERSION="0.1.0"

docker build -t ngthminhdev/b-info-frontend:${VERSION} .
docker push ngthminhdev/b-info-frontend:${VERSION}
