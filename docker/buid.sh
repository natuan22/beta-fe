#!/bin/zsh

VERSION="0.0.35"

docker build -t ngthminhdev/stock-client-demo:${VERSION} --build-arg REACT_APP_BASE_URL=http://192.168.13.20:3002 --build-arg REACT_APP_SOCKET_URL=http://192.168.13.20/socket .
docker push ngthminhdev/stock-client-demo:${VERSION}