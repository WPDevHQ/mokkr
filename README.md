# Mockup

To start your Phoenix app:

  * Install dependencies with `mix deps.get`
  * Install Node.js dependencies with `npm install`
  * Install Ruby dependencies with `bundle install`
  * Make sure you have redis running `redis-server`
  * Set your env variables. Look in `.env.example` to see what needs to be set.
  * Source them so they're available to our phoenix app `set -a; source .env`
  * Create your database with `mix ecto.create`.
Note if you don't have a postgres user
```
CREATE USER postgres;
ALTER USER postgres PASSWORD 'postgres';
ALTER USER postgres WITH SUPERUSER;
```
  * Migrate with `mix ecto.migrate`
  * Start Phoenix endpoint with `mix phoenix.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.
