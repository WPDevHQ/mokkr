defmodule Mockup.ScreenshotWorker do
  alias Mockup.{Screenshot, ScreenshotChannel}

  def perform(url, session_id, options) do
    url |> Screenshot.capture(options) |> ScreenshotChannel.complete(session_id)
  end
end
