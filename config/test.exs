use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :mockup, Mockup.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :mockup, Mockup.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "mockup_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

config :mockup, :screenshot_capture, Mockup.FakeScreenshotCaputre
config :arc, storage: Arc.Storage.Local

config :exq,
  name: Exq,
  namespace: "test",
  queues: ["default"],
  test_with_local_redis: true
