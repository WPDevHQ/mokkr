defmodule Mockup.API.ScreenshotView do
  use Mockup.Web, :view

  def render("show.json", %{screenshots: screenshots}) do
    screenshots
  end
end
