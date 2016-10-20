defmodule Mockup.API.ScreenshotController do
  use Mockup.Web, :controller

  alias Mockup.{ScreenshotWorker, Screenshot}

  def show(conn, %{"url" => url, "session" => session_id, "devices" => devices}) do
    device_array = String.split(devices, ",")
    devices_to_capture = Enum.filter(Screenshot.screensizes, fn(screensize) ->
      Enum.member?(device_array, screensize.name)
    end)

    Enum.each(devices_to_capture, fn(screensize) ->
     Exq.enqueue(Exq, "default", ScreenshotWorker, [url, session_id, screensize])
    end)

    render(conn, "show.json")
  end
end
