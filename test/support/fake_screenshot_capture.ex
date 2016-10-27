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
    {:ok, %{screenshot: "screenshot"}}
  end
end
