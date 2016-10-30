defmodule Mockup.API.ScreenshotWorkerTest do
  use Mockup.ModelCase
  alias Mockup.{Repo, Screenshot, ScreenshotWorker, Version}

  describe "perform/3" do
    test "when the screenshot is captured successfully" do
      screenshot = Screenshot.changeset(%Screenshot{}, %{url: "http://example.com"}) |> Repo.insert!
      screenshot = Repo.preload(screenshot, :versions)
      assert Enum.count(screenshot.versions) == 0

      ScreenshotWorker.perform(screenshot.id, "123", %{})

      screenshot = Repo.get(Screenshot, screenshot.id) |> Repo.preload(:versions)
      assert Enum.count(screenshot.versions) == 1
    end

    test "when a version already exists it updates it" do
      screenshot = Screenshot.changeset(%Screenshot{}, %{url: "http://example.com"}) |> Repo.insert!
      version = Version.changeset(%Version{}, %{name: "iMac", screenshot_id: screenshot.id, image: Path.join([Mockup.Endpoint.config(:root), "test", "support", "other_example.png"])})
                |> Repo.insert!

      ScreenshotWorker.perform(screenshot.id, "123", %{})

      previous_image = version.image
      previous_screenshot_timestamp = screenshot.updated_at

      version = Repo.get(Version, version.id)
      screenshot = Repo.get(Screenshot, screenshot.id)

      assert Enum.count(Repo.all(Version)) == 1
      assert version.image != previous_image
      assert previous_screenshot_timestamp != screenshot.updated_at
    end
  end
end
