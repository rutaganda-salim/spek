import { format } from "date-fns";

import { useTypeSafeQuery } from "@/hooks/useTypeSafeQuery";
import { Channel, User } from "@spek/client";
import { CreateInput } from "./create-input";
import { AvatarGroup } from "@/ui/avatar-group";
import { useRouter } from "next/navigation";
import { useTypeSafePrefetch } from "@/hooks/useTypeSafePrefetch";
import { CenterLoader } from "../CenterLoader";
import { Button } from "@spek/ui";
import { useState } from "react";
import { CreateRoomModal } from "../room/CreateRoomModal";

interface ThreadsFeedProps {
  communityId: string;
  isMember: boolean;
  isAdmin: boolean;
  currentUser: User;
  channel: Channel | undefined;
}

export const ThreadsFeed: React.FC<ThreadsFeedProps> = ({
  communityId,
  isMember,
  channel,
  currentUser,
}) => {
  const router = useRouter();
  const [createRoomModal, setCreateRoomModal] = useState(false);
  const { data, isLoading } = useTypeSafeQuery(
    ["getChannelThreads", channel?.id!],
    { refetchOnMount: false },
    [channel?.id!]
  );
  const prefetch = useTypeSafePrefetch();

  const handleCreateRoomModal = () => {
    setCreateRoomModal(!createRoomModal);
  };

  if (isLoading) {
    return <CenterLoader />;
  }

  return (
    <div className="flex flex-col gap-4 mt-2">
      {currentUser && isMember ? (
        // TODO: Lift this component up in the tree
        <div className="flex gap-3">
          <CreateInput channelId={channel?.id!} communityId={communityId} />
          <Button type="button" onClick={handleCreateRoomModal}>
            New room
          </Button>
        </div>
      ) : null}
      {data?.map((thread) => {
        const avatarSrc = thread.peoplePreviewList.map((p) => p.avatarUrl);
        return (
          <div
            className="cursor-pointer"
            key={thread.id}
            onClick={() => {
              prefetch(["joinThreadAndGetInfo", thread.id], [thread.id]);
              router.push(`/thread/${thread.id}`);
            }}
          >
            <div className="px-3 py-5 rounded-lg">
              <div className="flex flex-1 justify-between mb-2">
                <p>{thread.name}</p>
                <AvatarGroup srcArray={avatarSrc} />
              </div>
              <p className="text-sm text-primary-400">
                {format(thread.inserted_at, "MMMM d, hh:mm a")}
              </p>
            </div>
          </div>
        );
      })}
      {createRoomModal && (
        <CreateRoomModal
          onOpenChange={handleCreateRoomModal}
          open={createRoomModal}
        />
      )}
    </div>
  );
};
