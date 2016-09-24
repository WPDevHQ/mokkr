#!/bin/bash

function cleanup {
  /etc/init.d/xvfb stop
  kill $SELENIUM_PID
  kill $REDIS_PID
  killall java
}

trap cleanup EXIT
export DISPLAY=:99
/etc/init.d/xvfb start
selenium-standalone start &
SELENIUM_PID=$!
redis-server &
REDIS_PID=$!
mix phoenix.server
