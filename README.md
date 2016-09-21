# Mockup

To start your Phoenix app:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Install Node.js dependencies with `npm install`
  * Start Phoenix endpoint with `mix phoenix.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

# Capturing screenshots

In order to capture screenshots you will need selenium, firefox and xvfb installed

  * `npm install -g selenium-standalone@latest`
  * `selenium-standalone install`

Copy the init.d xvfb script over

  * `cp xvfb /etc/init.d/xvfb`
  * `chmod +x /etc/init.d/xvfb` note that this may need to be run as sudo

Make the startup script executable

  * `chmod +x ./start.sh`

Start the app
  * `./start.sh`

Ready to run in production? Please [check our deployment guides](http://www.phoenixframework.org/docs/deployment).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: http://phoenixframework.org/docs/overview
  * Docs: http://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix
