defmodule Models.Channel do
  alias Models.Community
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder,
           only: ~w(id name slug description community isPrivate isDefault memberCount)a}
  @primary_key {:id, :binary_id, []}
  schema "channels" do
    field(:name, :string)
    field(:slug, :string)
    field(:description, :string)
    field(:isPrivate, :boolean)
    field(:isDefault, :boolean)
    field(:memberCount, :integer, default: 1)
    field(:archivedAt, :utc_datetime_usec)

    belongs_to(:community, Community, foreign_key: :communityId, type: :binary_id)

    timestamps()
  end

  def changeset(channel, params \\ %{}) do
    channel
    |> cast(params, [:name, :slug, :description, :isPrivate, :isDefault])
    |> validate_required([:name, :slug, :description])
    |> unique_constraint(:name)
  end
end
