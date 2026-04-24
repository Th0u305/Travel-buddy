import { Suspense } from "react";
import Loading from "@/src/components/loading";
import Profile from "./profile";

export default async function Page({ params }: PageProps<"/profile/[id]">) {
  const { id } = await params;
  return (
    <Suspense fallback={<Loading />}>
      <Profile id={id} />
    </Suspense>
  );
}
