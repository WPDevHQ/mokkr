defmodule Mockup.API.ScreenshotView do
  use Mockup.Web, :view
  alias Mockup.Image

  def render("show.json", %{last_updated_at: last_updated_at, screenshots: screenshots}) do
    %{
      last_updated_at: Ecto.DateTime.to_string(last_updated_at),
      screenshots: Enum.map(screenshots, fn(screenshot) ->
        %{
          name: screenshot.name,
          image: Image.url({screenshot.image, screenshot}, :original)
        }
      end)
    }
  end

  def render("show.json", _assigns) do
  end

  def render("error.json", %{message: message}) do
    %{message: message}
  end
end
