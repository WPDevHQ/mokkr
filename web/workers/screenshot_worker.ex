defmodule Mockup.ScreenshotWorker do
  alias Mockup.{Screenshot}

  def perform(url, options) do
    Screenshot.capture(url, options)
  end
end
