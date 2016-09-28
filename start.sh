#!/bin/bash

function cleanup {
  /etc/init.d/xvfb stop
  kill $CHROMEDRIVER_PID
  kill $SELENIUM_PID
  kill $REDIS_PID
  killall java
  rm *.png
}

trap cleanup EXIT
export DISPLAY=:99
/etc/init.d/xvfb stop
/etc/init.d/xvfb start
java -jar /opt/selenium/selenium-server-standalone.jar &
SELENIUM_PID=$!
redis-server &
REDIS_PID=$!
mix deps.get
mix phoenix.server
