FROM ubuntu:xenial

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN locale-gen en_GB.UTF-8
ENV LANG en_GB.UTF-8
ENV LANGUAGE en_GB:en
ENV LC_ALL en_GB.UTF-8
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && apt-get install -yq apt-utils wget build-essential software-properties-common

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'
RUN wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | apt-key add -
RUN apt-add-repository -y ppa:brightbox/ruby-ng
RUN wget https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb && dpkg -i erlang-solutions_1.0_all.deb

RUN apt-get update && apt-get install -yq \
      google-chrome-stable \
      xvfb redis-server ruby2.3 ruby2.3-dev \
      esl-erlang elixir openjdk-8-jre \
      libffi-dev nodejs npm \
      inotify-tools \
      imagemagick --fix-missing

ENV CHROME_DRIVER_VERSION 2.24
RUN wget --no-verbose -O /tmp/chromedriver_linux64.zip https://chromedriver.storage.googleapis.com/$CHROME_DRIVER_VERSION/chromedriver_linux64.zip \
  && rm -rf /opt/selenium/chromedriver \
  && unzip /tmp/chromedriver_linux64.zip -d /opt/selenium \
  && rm /tmp/chromedriver_linux64.zip \
  && mv /opt/selenium/chromedriver /opt/selenium/chromedriver-$CHROME_DRIVER_VERSION \
  && chmod 755 /opt/selenium/chromedriver-$CHROME_DRIVER_VERSION \
  && ln -fs /opt/selenium/chromedriver-$CHROME_DRIVER_VERSION /usr/bin/chromedriver

RUN npm install -g n
RUN n 6.3.1

RUN mkdir -p /opt/selenium \
&& wget http://selenium-release.storage.googleapis.com/2.53/selenium-server-standalone-2.53.1.jar \
-O /opt/selenium/selenium-server-standalone.jar

RUN gem install bundler

RUN mix local.hex
RUN mix archive.install --force https://github.com/phoenixframework/archives/raw/master/phoenix_new.ez

ADD xvfb /etc/init.d/xvfb
RUN chmod a+x /etc/init.d/xvfb

ENV DBUS_SESSION_BUS_ADDRESS /dev/null

ADD . /app
WORKDIR /app
RUN chmod a+x start.sh
RUN npm install
RUN bundle install
RUN mix local.hex --force
RUN mix deps.get --only-prod
RUN mix local.rebar --force
RUN mix compile
EXPOSE 9515
CMD ./start.sh
