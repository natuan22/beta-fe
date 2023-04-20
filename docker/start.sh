#!/bin/bash

# shellcheck disable=SC2164
cd /SERVICE

CONFIG_ARGS="s|CONFIG_NODE_ENV|${CONFIG_NODE_ENV}|g;\
            s|CONFIG_SERVER_HOST|${CONFIG_SERVER_HOST}|g;\
            s|CONFIG_SERVER_PORT|${CONFIG_SERVER_PORT}|g"

sed -i -e "$CONFIG_ARGS" .env

npm i -g serve

serve -l -s 3000

exec "$@"