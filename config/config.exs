# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :mockup, Mockup.Endpoint,
  url: [host: "localhost"],
  root: Path.dirname(__DIR__),
  secret_key_base: "bbrdvR0Jl1xRKd+yo37uQGAzmsT49nZkZWU/qUuzEuM0uzALmhnspP6V9McLpLwi",
  render_errors: [accepts: ~w(html json)],
  pubsub: [name: Mockup.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Configure phoenix generators
config :phoenix, :generators,
  migration: true,
  binary_id: false

# Configure exq
config :exq,
  host: "127.0.0.1",
  port: 6379,
  namespace: "exq",
  concurrency: 5,
  scheduler_enable: true,
  max_retries: 0,
  queues: ["default"]

config :mockup, ecto_repos: [Mockup.Repo]
config :mockup, :screenshot_capture, Mockup.ScreenshotCapture

config :arc,
  bucket: {:system, "S3_BUCKET"},
  asset_host: "https://s3-eu-west-1.amazonaws.com/mokkr"


config :ex_aws,
  access_key_id: System.get_env("AWS_ACCESS_KEY_ID"),
  secret_access_key: System.get_env("AWS_SECRET_ACCESS_KEY"),
  s3: [
    scheme: "https://",
    host: "s3-eu-west-1.amazonaws.com",
    region: "eu-west-1"
  ]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
