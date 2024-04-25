import React from "react";
import { Channel, CommunityWithPermissions } from "@spek/client";
import Tabs, { TabsContents, TabsTitles } from "@/ui/tabs";
import { EditForm } from "./EditForm";
import { Button } from "@/ui/button";
import { useTypeSafeMutation } from "@/hooks/useTypeSafeMutation";
import { useRouter } from "next/navigation";
import { confirmModal } from "../ConfirmModal";

interface OverviewProps {
  channels: Channel[];
  community: CommunityWithPermissions;
  communitySlug: string;
}

export const Overview: React.FC<OverviewProps> = ({
  channels,
  community,
  communitySlug,
}) => {
  const { push } = useRouter();
  const { mutateAsync: deleteCommunity, isLoading: deleteLoading } =
    useTypeSafeMutation("deleteCommunity");

  return (
    <div>
      <Tabs>
        <TabsTitles titles={["Overview", "Members", "Channels"]} />
        <TabsContents
          items={[
            {
              content: (
                <>
                  <EditForm community={community} />
                  <h3>Danger zone</h3>
                  <Button
                    color="primary"
                    loading={deleteLoading}
                    onClick={() => {
                      confirmModal(
                        "Are you sure you want to delete this community",
                        () => {
                          deleteCommunity([community.id]);
                          push("/home");
                        }
                      );
                    }}
                  >
                    Delete
                  </Button>
                </>
              ),
            },
            {
              content: (
                <>
                  <p>members</p>
                </>
              ),
            },
            {
              content: (
                <>
                  <p>channels</p>
                </>
              ),
            },
          ]}
        />
      </Tabs>
    </div>
  );
};
