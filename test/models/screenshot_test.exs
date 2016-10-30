defmodule Mockup.ScreenshotTest do
  use Mockup.ModelCase

  alias Mockup.Screenshot

  @valid_attrs %{url: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Screenshot.changeset(%Screenshot{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Screenshot.changeset(%Screenshot{}, @invalid_attrs)
    refute changeset.valid?
  end
end
