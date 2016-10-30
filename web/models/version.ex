defmodule Mockup.Version do
  use Mockup.Web, :model
  use Arc.Ecto.Schema

  schema "versions" do
    field :name, :string
    field :image, Mockup.Image.Type
    belongs_to :screenshot, Mockup.Screenshot

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :screenshot_id])
    |> cast_attachments(params, [:image])
    |> validate_required([:name, :image, :screenshot_id])
  end
end
