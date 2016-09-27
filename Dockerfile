FROM ubuntu:xenial

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN locale-gen en_GB.UTF-8
ENV LANG en_GB.UTF-8
ENV LANGUAGE en_GB:en
ENV LC_ALL en_GB.UTF-8
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && apt-get install -yq apt-utils wget build-essential software-properties-common

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'
RUN wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | apt-key add -
RUN apt-add-repository -y ppa:brightbox/ruby-ng
RUN wget https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb && dpkg -i erlang-solutions_1.0_all.deb

RUN apt-get update && apt-get install -yq \
      xvfb redis-server ruby2.3 ruby2.3-dev \
      esl-erlang elixir openjdk-8-jre \
      libffi-dev nodejs npm \
      inotify-tools \
      firefox \
      imagemagick --fix-missing

RUN npm install -g n
RUN n 6.3.1

RUN mkdir -p /opt/selenium \
&& wget http://selenium-release.storage.googleapis.com/3.0-beta3/selenium-server-standalone-3.0.0-beta3.jar \
-O /opt/selenium/selenium-server-standalone.jar

RUN wget https://github.com/mozilla/geckodriver/releases/download/v0.10.0/geckodriver-v0.10.0-linux64.tar.gz && \
tar xvfz geckodriver-v0.10.0-linux64.tar.gz && \
mv geckodriver /usr/bin/ && chmod +x /usr/bin/geckodriver

RUN gem install bundler

RUN mix local.hex
RUN mix archive.install --force https://github.com/phoenixframework/archives/raw/master/phoenix_new.ez

ADD xvfb /etc/init.d/xvfb
RUN chmod a+x /etc/init.d/xvfb

ADD . /app
WORKDIR /app
RUN chmod a+x start.sh
RUN npm install
RUN bundle install
RUN mix local.hex --force
RUN mix deps.get --only-prod
RUN mix local.rebar --force
RUN mix compile
EXPOSE 7054
CMD ./start.sh
