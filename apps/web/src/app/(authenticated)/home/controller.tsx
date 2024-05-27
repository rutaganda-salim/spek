"use client";

import React from "react";

import { useTypeSafeQuery } from "@/hooks/useTypeSafeQuery";
import { useRouter } from "next/navigation";
import { ThreadCard } from "@spek/ui";
import Link from "next/link";

interface ControllerProps {}

export const HomeController: React.FC<ControllerProps> = () => {
  const { push } = useRouter();
  const { data, isLoading } = useTypeSafeQuery("getTopActiveThreads");

  if (isLoading) {
    return <div>loading....</div>;
  }

  return (
    <div className="flex flex-col flex-1">
      <h2>Feed</h2>
      <div className="flex flex-col gap-4 mt-3">
        {data?.map((thread) => (
          <Link key={thread.id} href={`/thread/${thread.id}`}>
            <ThreadCard
              avatars={thread.peoplePreviewList.map((p) => ({
                image: p.avatarUrl,
                alt: p.displayName,
              }))}
              conversation={{
                channelName: thread.channel.name,
                communityName: thread.community.name,
                description: thread.name,
                messageCount: 21,
                name: thread.name,
              }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
