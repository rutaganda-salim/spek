import { defaultQueryFn } from "@/utils/defaultQueryFn";
import { UserDm } from "@spek/client";
import { Metadata, ResolvingMetadata } from "next";
import { DmPageController } from "./controller";

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const dm: UserDm = await defaultQueryFn({ queryKey: `dms/${params.id}` });

  return {
    title: dm.peoplePreviewList.map((p) => p.displayName).join(", "),
  };
}

export default function DmPage({ params }: Props) {
  return (
    <>
      <DmPageController dmId={params.id} />
    </>
  );
}
