defmodule Mockup.ScreenshotWorker do
  @screenshot_capture Application.get_env(:mockup, :screenshot_capture)
  alias Mockup.{ScreenshotChannel, Repo, Version, Screenshot}

  def perform(screenshot_id, session_id, options) do
    screenshot = Repo.get(Screenshot, screenshot_id)

    case @screenshot_capture.capture(screenshot.url, options) do
      {:ok, screenshot_capture} ->
        version = case Repo.get_by(Version, name: screenshot_capture.name, screenshot_id: screenshot.id) do
          nil     -> create_version(screenshot_capture, screenshot.id)
          version -> update_version(screenshot_capture, version)
        end

        touch_screenshot(screenshot)
        ScreenshotChannel.complete(screenshot_capture, session_id)
      {:error, error}       -> ScreenshotChannel.error(error, session_id)
    end
  end

  defp update_version(screenshot_capture, version) do
    changeset = Version.changeset(version, %{image: screenshot_capture.path})
    {:ok, version} = Repo.update(changeset)
    version
  end

  defp create_version(screenshot_capture, screenshot_id) do
    Version.changeset(%Version{}, %{name: screenshot_capture.name, image: screenshot_capture.path, screenshot_id: screenshot_id})
    |> Repo.insert
  end

  defp touch_screenshot(screenshot) do
    changeset = Screenshot.changeset(screenshot, %{updated_at: Ecto.DateTime.utc})
    Repo.update(changeset)
  end
end
