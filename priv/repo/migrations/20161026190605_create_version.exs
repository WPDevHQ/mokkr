defmodule Mockup.Repo.Migrations.CreateVersion do
  use Ecto.Migration

  def change do
    create table(:versions) do
      add :name, :string, null: false
      add :image, :string
      add :screenshot_id, references(:screenshots, on_delete: :nothing)

      timestamps()
    end
    create index(:versions, [:screenshot_id])

  end
end
