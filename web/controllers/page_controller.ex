defmodule Mockup.PageController do
  use Mockup.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
