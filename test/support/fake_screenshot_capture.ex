defmodule Mockup.FakeScreenshotCaputre do
  @screensizes [
    %{
      name: "iMac"
    },
    %{
      name: "iPad"
    }
  ]

  def screensizes do
    @screensizes
  end

  def capture(_url, _options) do
    :timer.sleep(1000)
    {:ok, %{name: "iMac", path: Path.join([Mockup.Endpoint.config(:root), "test", "support", "example.png"])}}
  end
end
