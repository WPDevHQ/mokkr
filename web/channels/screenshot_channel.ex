defmodule Mockup.ScreenshotChannel do
  use Mockup.Web, :channel
  alias Mockup.{Endpoint}

  def join("screenshots:" <> _session_id, payload, socket) do
    if authorized?(payload) do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (screenshots:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # This is invoked every time a notification is being broadcast
  # to the client. The default implementation is just to push it
  # downstream but one could filter or change the event.
  def handle_out(event, payload, socket) do
    push socket, event, payload
    {:noreply, socket}
  end

  def complete(screenshot, session_id) do
    Endpoint.broadcast("screenshots:#{session_id}", "screenshot:complete", screenshot)
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
