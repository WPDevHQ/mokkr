defmodule Mockup.API.ScreenshotController do
  @screenshot_capture Application.get_env(:mockup, :screenshot_capture)

  use Mockup.Web, :controller

  alias Mockup.{ScreenshotWorker, Repo, Screenshot}

  def show(conn, %{"url" => url, "session" => session_id, "devices" => devices}) do
    formatted_url = ensure_url_is_http(url)

    case find_cached_screenshots(formatted_url) do
      {:ok, screenshots} -> render(conn, "show.json", screenshots)
      {:error, _} ->
          case take_screenshots(formatted_url, session_id, devices) do
            :ok -> render(conn, "show.json")
            :error -> render(conn, "error.json", %{message: "Sorry something went wrong"})
          end
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
    changeset = Screenshot.changeset(%Screenshot{}, %{url: url})

    case Repo.insert(changeset) do
      {:ok, screenshot} ->
        device_array = String.split(devices, ",")
        devices_to_capture = Enum.filter(@screenshot_capture.screensizes, fn(screensize) ->
          Enum.member?(device_array, screensize.name)
        end)

        Enum.each(devices_to_capture, fn(screensize) ->
          Exq.enqueue(Exq, "default", ScreenshotWorker, [screenshot.id, session_id, screensize])
        end)
        :ok
      {:error, _} -> :error
    end
  end

  defp ensure_url_is_http(url) do
    if url |> String.starts_with?("http") do
      url
    else
      "http://" <> url
    end
  end
end
