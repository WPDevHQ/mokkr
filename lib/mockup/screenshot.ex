defmodule Mockup.Screenshot do
  import Mogrify

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

  def screensizes do
    @screensizes
  end

  def capture(url, %{"name" => name, "options" => options, "final_dimensions" => dimensions, "crop_dimensions" => crop_dimensions}) do
    formatted_url = if url |> String.starts_with?("http") do
      url
    else
      "http://" <> url
    end

    {result, _} = System.cmd("ruby", ["saucelabs.rb", "--url=#{formatted_url}"] ++ options)
    result
    |> Poison.Parser.parse!
    |> Map.merge(%{"name" => name, "dimensions" => dimensions, "crop_dimensions" => crop_dimensions})
    |> convert_screenshot
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
end
