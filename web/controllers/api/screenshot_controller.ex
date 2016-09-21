defmodule Mockup.API.ScreenshotController do
  use Mockup.Web, :controller

  alias Mockup.{Screenshot}

  def show(conn, %{"url" => url}) do
    screenshots = Screenshot.capture(url)
    render(conn, "show.json", screenshots: screenshots)
  end
end
