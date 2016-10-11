#!/bin/bash

function cleanup {
  kill $REDIS_PID
  rm *.png
}

trap cleanup EXIT
redis-server &
REDIS_PID=$!
mix deps.get
mix phoenix.server
