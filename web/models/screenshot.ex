defmodule Mockup.Screenshot do
  use Mockup.Web, :model
  alias Mockup.Version

  schema "screenshots" do
    field :url, :string

    has_many :versions, Version
    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:url])
    |> validate_required([:url])
  end
end
