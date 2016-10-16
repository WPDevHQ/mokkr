defmodule Mockup.ScreenshotWorker do
  alias Mockup.{Screenshot, ScreenshotChannel}

  def perform(url, session_id, options) do
    case Screenshot.capture(url, options) do
      {:ok, screenshot} -> ScreenshotChannel.complete(screenshot, session_id)
      {:error, error}       -> ScreenshotChannel.error(error, session_id)
    end
  end
end
