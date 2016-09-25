defmodule Mockup.Screenshot do
  import Mogrify

  @screensizes [
    %{
      name: "large",
      options: ["--height=974", "--width=1730"],
      final_dimensions: "865x487"
    },
    %{
      name: "iPhone 6",
      options: ["--device=Apple iPhone 6"],
      final_dimensions: "132x240"
    },
    %{
      name: "iPad",
      options: ["--device=Apple iPad"],
      final_dimensions: "300x400"
    },
  ]

  def screensizes do
    @screensizes
  end

  def capture(url, %{"name" => name, "options" => options, "final_dimensions" => dimensions}) do
    {result, _} = System.cmd("ruby", ["screenshot.rb", "--url=#{url}"] ++ options)
    data = Poison.Parser.parse!(result)
    Map.merge(data, %{"name" => name, "dimensions" => dimensions}) |> convert_screenshot
  end

  defp convert_screenshot(%{"name" => name, "dimensions" => dimensions, "height" => height, "width" => width, "path" => path}) do
    path
    |> open
    |> custom("crop", "#{width}x#{height}+0+0")
    |> save(in_place: true)

    path
    |> open
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
