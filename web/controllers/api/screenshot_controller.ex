defmodule Mockup.API.ScreenshotController do
  use Mockup.Web, :controller

  alias Mockup.{ScreenshotWorker, Screenshot}

  def show(conn, %{"url" => url, "session" => session_id}) do
    Enum.each(Screenshot.screensizes, fn(screensize) ->
     Exq.enqueue(Exq, "default", ScreenshotWorker, [url, session_id, screensize])
    end)

    render(conn, "show.json")
  end
end
