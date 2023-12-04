#!/bin/zsh

VERSION="0.0.1"

docker build -t baohuydev/beta-stock-frontend:${VERSION}
docker push baohuydev/beta-stock-frontend:${VERSION}
