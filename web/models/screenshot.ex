defmodule Mockup.Screenshot do
  use Mockup.Web, :model
  alias Mockup.Version

  @url_regex ~r/^(http|https|ftp|ftps):\/\/(([a-z0-9]+\:)?[a-z0-9]+\@)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(([0-9]{1,5})?\/.*)?$/ix

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
    |> validate_format(:url, @url_regex)
    |> unique_constraint(:url)
  end
end
