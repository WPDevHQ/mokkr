defmodule Mockup.API.ScreenshotController do
  @screenshot_capture Application.get_env(:mockup, :screenshot_capture)

  use Mockup.Web, :controller

  alias Mockup.{ScreenshotWorker, Repo, Screenshot}

  def show(conn, %{"url" => url, "session" => session_id, "devices" => devices}) do
    case find_cached_screenshots(url) do
      {:ok, screenshots} -> render(conn, "show.json", screenshots)
      {:error, _} ->
        take_screenshots(url, session_id, devices)
        render(conn, "show.json")
    end
  end

  defp find_cached_screenshots(url) do
    case Repo.get_by(Screenshot, url: url) do
      nil           -> {:error, "Screenshots not cached"}
      screenshot    ->
        screenshot = Repo.preload(screenshot, :versions)
        {:ok, %{
          last_updated_at: screenshot.updated_at,
          screenshots: screenshot.versions
        }}
    end
  end

  defp take_screenshots(url, session_id, devices) do
    device_array = String.split(devices, ",")

    devices_to_capture = Enum.filter(@screenshot_capture.screensizes, fn(screensize) ->
      Enum.member?(device_array, screensize.name)
    end)

    Enum.each(devices_to_capture, fn(screensize) ->
      Exq.enqueue(Exq, "default", ScreenshotWorker, [url, session_id, screensize])
    end)
  end
end
