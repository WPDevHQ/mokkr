#!/bin/bash

function cleanup {
  kill $REDIS_PID
  rm *.png
}

trap cleanup EXIT
redis-server &
REDIS_PID=$!
if [ "$MIX_ENV" == "prod" ]
then
  echo "Deploying"
  npm install -g brunch
  npm install --production
  mix local.hex --force
  mix deps.get --only prod --force
  mix compile
  brunch build --production
  mix phoenix.digest
  PORT=$PORT mix phoenix.server
else
  mix deps.get
  mix compile
  mix phoenix.server
fi
