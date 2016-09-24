defmodule Mockup.Screenshot do
  use Hound.Helpers
  import Mogrify

  def capture(url, %{"name" => name, "height" => height, "width" => width}) do
    session = change_session_to(:os.system_time(:nano_seconds))
    navigate_to url
    execute_scroll
    screenshot = capture_screenshot(%{name: name, height: height, width: width}) |> convert_screenshot
    Hound.Helpers.Session.end_session(session)
    screenshot
  end

  defp capture_screenshot(%{name: name, height: height, width: width}) do
    current_window_handle |> set_window_size(width, height)
    screenshot_path = take_screenshot("#{:os.system_time(:nano_seconds)}.png")
    %{path: screenshot_path, name: name, height: height, width: width}
  end

  defp convert_screenshot(%{name: name, height: height, width: width, path: path}) do
    path |> open |> resize_to_fill("#{width}x#{height}") |> resize("#{width/2}x#{height/2}") |> save(in_place: true)

    {_, file_data} = File.read(path)
    File.rm(path)

    %{
      name: name,
      src: Base.encode64(file_data)
    }
  end

  defp execute_scroll do
    script = "function scrollTo(to, duration) {
     var scroll = function(amount) {
      window.scrollBy(0, amount);
     }
    var perTick = to / duration * 10;
    var scrolled = 0;

    var interval = setInterval(function() {
      if (scrolled > to) {
       clearInterval(interval);
       window.scrollTo(0, 0);
       setTimeout(function() {
        var div = document.createElement('div');
        div.id = 'mockup-finished-scrolling';
        div.style.display = 'none';
        document.body.appendChild(div);
      }, 1000);
      } else {
        scroll(perTick);
        scrolled += perTick;
      }
    }, 20);

    }
    scrollTo(document.body.scrollHeight, 500);"

    execute_script(script)
    find_element(:css, "#mockup-finished-scrolling", 100)
  end
end
