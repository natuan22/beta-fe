#!/bin/bash

ENDPOINT="http://binfo.bsi.com.vn/api"
VERSION="0.0.32"

sudo docker build -t ngthminhdev/stock-client-demo:${VERSION} --build-arg REACT_APP_BASE_URL=${ENDPOINT} --build-arg REACT_APP_SOCKET_URL=${ENDPOINT} .
sudo docker push ngthminhdev/stock-client-demo:${VERSION}