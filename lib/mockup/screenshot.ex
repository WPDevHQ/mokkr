defmodule Mockup.Screenshot do
  import Mogrify
  alias Poison.Parser

  @screensizes [
    %{
      name: "iMac",
      options: ["--height=974", "--width=1730"],
      crop_dimensions: "1920x1080",
      final_dimensions: "865x487"
    },
    %{
      name: "iPhone",
      options: [
        "--device=Apple iPhone 6",
        "--height=667",
        "--width=375",
      ],
      crop_dimensions: "375x667",
      final_dimensions: "135x240"
    },
    %{
      name: "iPad",
      options: [
        "--device=Apple iPad",
        "--height=1025",
        "--width=768",
      ],
      crop_dimensions: "768x1025",
      final_dimensions: "300x400"
    },
  ]

  @url_regex ~r/^(http|https|ftp|ftps):\/\/(([a-z0-9]+\:)?[a-z0-9]+\@)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(([0-9]{1,5})?\/.*)?$/ix

  def screensizes do
    @screensizes
  end

  def capture(url, options) do
    formatted_url = if url |> String.starts_with?("http") do
      url
    else
      "http://" <> url
    end

    case validate_uri(formatted_url) do
      {:ok, _} ->
        if Regex.match?(@url_regex, formatted_url) do
          capture_screenshot(formatted_url, options)
        else
          {:error, %{message: "Not a valid url"}}
        end
      {:error, _} -> {:error, %{message: "Not a valid url"}}
    end
  end

  defp capture_screenshot(url, %{"name" => name, "options" => options, "final_dimensions" => dimensions, "crop_dimensions" => crop_dimensions}) do
    {result, _} = System.cmd("ruby", ["saucelabs.rb", "--url=#{url}"] ++ options)

    case Parser.parse(result) do
      {:ok, screenshot_data} ->
        screenshot = screenshot_data
        |> Map.merge(%{
          "name" => name, "dimensions" => dimensions, "crop_dimensions" => crop_dimensions
        })
        |> convert_screenshot
        {:ok, screenshot}

      {:error, _} -> {:error, %{message: "Failed to parse response"}}
    end
  end

  defp convert_screenshot(%{"name" => name, "crop_dimensions" => crop_dimensions, "dimensions" => dimensions, "path" => path}) do
    path
    |> open
    |> gravity("NorthWest")
    |> custom("crop", "#{crop_dimensions}+0+0")
    |> resize(dimensions)
    |> save(in_place: true)

    {_, file_data} = File.read(path)
    File.rm(path)

    %{
      name: name,
      src: Base.encode64(file_data)
    }
  end

  defp validate_uri(str) do
    uri = URI.parse(str)

    case uri do
      %URI{scheme: nil} -> {:error, uri}
      %URI{host: nil} -> {:error, uri}
      uri -> {:ok, uri}
    end
  end
end
