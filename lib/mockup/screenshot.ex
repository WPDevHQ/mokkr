defmodule Mockup.Screenshot do
  import Mogrify

  @screensizes [
    %{
      name: "iMac",
      options: ["--height=974", "--width=1730"],
      final_dimensions: "865x487"
    },
    %{
      name: "iPhone",
      options: [
        "--height=667",
        "--width=375",
        "--useragent=Mozilla/5.0 (iPhone; CPU iPhone OS 9_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13C75 Safari/601.1"
      ],
      final_dimensions: "135x240"
    },
    %{
      name: "iPad",
      options: [
        "--height=1025",
        "--width=768",
        "--useragent=Mozilla/5.0 (iPad; CPU OS 9_0 like Mac OS X) AppleWebKit/601.1.16 (KHTML, like Gecko) Version/8.0 Mobile/13A171a Safari/600.1.4"
      ],
      final_dimensions: "300x400"
    },
  ]

  def screensizes do
    @screensizes
  end

  def capture(url, %{"name" => name, "options" => options, "final_dimensions" => dimensions}) do
    formatted_url = unless url |> String.starts_with?("http") do
      "http://" <> url
    else
      url
    end

    {result, _} = System.cmd("ruby", ["screenshot.rb", "--url=#{formatted_url}"] ++ options)
    data = Poison.Parser.parse!(result)
    Map.merge(data, %{"name" => name, "dimensions" => dimensions})
    |> convert_screenshot
  end

  defp convert_screenshot(%{"name" => name, "dimensions" => dimensions, "path" => path}) do
    path
    |> open
    |> resize_to_fill(dimensions)
    |> save(in_place: true)

    {_, file_data} = File.read(path)
    File.rm(path)

    %{
      name: name,
      src: Base.encode64(file_data)
    }
  end
end
