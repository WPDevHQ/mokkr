defmodule Mockup.Repo.Migrations.CreateScreenshot do
  use Ecto.Migration

  def change do
    create table(:screenshots) do
      add :url, :string, null: false

      timestamps()
    end

  end
end
