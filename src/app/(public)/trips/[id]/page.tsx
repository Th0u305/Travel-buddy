import { Suspense } from "react";
import SingleTravel from "./singleTravel";
import Loading from "@/src/components/loading";

export async function generateMetadata({ params }: PageProps<"/trips/[id]">) {
  const { id } = await params;

  return {
    title: id
  };
}

export default async function Page({ params }: PageProps<"/trips/[id]">) {
  const { id } = await params;
  return (
    <Suspense fallback={<Loading />}>
      <SingleTravel id={id} />
    </Suspense>
  );
}
