defmodule Mockup.ScreenshotWorker do
  @screenshot_capture Application.get_env(:mockup, :screenshot_capture)
  alias Mockup.ScreenshotChannel

  def perform(url, session_id, options) do
    case @screenshot_capture.capture(url, options) do
      {:ok, screenshot} -> ScreenshotChannel.complete(screenshot, session_id)
      {:error, error}       -> ScreenshotChannel.error(error, session_id)
    end
  end
end
