#!/bin/zsh

VERSION="0.0.1"

sudo docker build -t chauminh1212/beta-fe:${VERSION} .
sudo docker push chauminh1212/beta-fe:${VERSION}
