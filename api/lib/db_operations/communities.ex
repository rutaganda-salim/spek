defmodule Operations.Communities do
  # ACCESS
  defdelegate get_top_communities(limit), to: Operations.Access.Communities
  defdelegate get_community_by_id(id), to: Operations.Access.Communities
  defdelegate get_community_members(communityId), to: Operations.Access.Communities
  defdelegate get_community_permissions(communityId, userId), to: Operations.Access.Communities

  # MUTATIONS
  defdelegate create_community(data), to: Operations.Mutations.Community
  defdelegate join_community(communityId, userId), to: Operations.Mutations.Community
  defdelegate create_thread(data), to: Operations.Mutations.Community
end
