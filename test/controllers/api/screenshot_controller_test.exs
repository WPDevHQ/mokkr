defmodule Mockup.API.ScreenshotControllerTest do
  use Mockup.ConnCase, async: false
  alias Mockup.{Repo, Screenshot, Version}

  describe "show/2" do
    setup do
      params = %{url: "example.com", session: "123", devices: "iMac,iPad"}

      on_exit fn ->
        Exq.Api.remove_queue(Exq.Api, "default")
      end

      {:ok, params: params}
    end

    @tag token: "UncachedScreenshots"

    test "enques screenshot taking", %{params: params} do
     build_conn |> get("api/screenshot", params)

     {:ok, jobs} = Exq.Api.jobs(Exq.Api, "default")
     assert Enum.count(jobs) == 2,  "2 jobs not enqued"
    end

    @tag token: "CachedScreenshots"

    test "when there are cached screenshots", %{params: params} do
      screenshot = Screenshot.changeset(%Screenshot{}, %{url: "http://example.com"}) |> Repo.insert!

      versions = [
        Version.changeset(%Version{}, %{screenshot_id: screenshot.id, name: "iMac", image: Path.join([Mockup.Endpoint.config(:root), "test", "support", "example.png"])}),
        Version.changeset(%Version{}, %{screenshot_id: screenshot.id, name: "iPad", image: Path.join([Mockup.Endpoint.config(:root), "test", "support", "example.png"])})
      ]

      Enum.each(versions, &Repo.insert!(&1))

      response = build_conn |> get("api/screenshot", params) |> json_response(200)

      assert response["last_updated_at"] == Ecto.DateTime.to_string(screenshot.updated_at)
      assert Enum.count(response["screenshots"]) == 2
    end

    test "when there is a cached screenshot but not the correct versions", %{params: params} do
      Screenshot.changeset(%Screenshot{}, %{url: "http://example.com"}) |> Repo.insert!
      build_conn |> get("api/screenshot", params)

      {:ok, jobs} = Exq.Api.jobs(Exq.Api, "default")
      assert Enum.count(Repo.all(Screenshot)) == 1
      assert Enum.count(jobs) == 2,  "2 jobs not enqued"
    end
  end
end
