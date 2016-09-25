defmodule Mockup.ScreenshotWorker do
  alias Mockup.{Screenshot, ScreenshotChannel}

  def perform(url, session_id, options) do
    Screenshot.capture(url, options) |> ScreenshotChannel.complete(session_id)
  end
end
