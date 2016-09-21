defmodule Mockup.Parallel do
  def map(collection, func) do
    collection
    |> Enum.map(&(Task.async(fn -> func.(&1) end)))
    |> Enum.map(&Task.await(&1, 10000))
  end
end
