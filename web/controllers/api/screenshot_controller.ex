defmodule Mockup.API.ScreenshotController do
  use Mockup.Web, :controller

  alias Mockup.{ScreenshotWorker}

  @screensizes [
    %{
      name: "large",
      height: 1080,
      width: 1920
    },
    %{
      name: "iPhone 6",
      height: 667,
      width: 375
    },
    %{
      name: "iPad",
      height: 660,
      width: 1100,
    },
  ]

  def show(conn, %{"url" => url}) do
    Enum.each(@screensizes, fn(screensize) -> Exq.enqueue(Exq, "default", ScreenshotWorker, [url, screensize]) end)
    render(conn, "show.json", screenshots: [])
  end
end
