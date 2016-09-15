ExUnit.start

Mix.Task.run "ecto.create", ~w(-r Mockup.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r Mockup.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(Mockup.Repo)

