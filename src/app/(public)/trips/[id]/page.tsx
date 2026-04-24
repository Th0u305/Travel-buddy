import { Suspense } from "react";
import SingleTravel from "./singleTravel";
import Loading from "@/src/components/loading";
import { axiosInstance } from "@/src/lib/axios/httpUtils";
import { envVars } from "@/src/config/env";

export async function generateMetadata({ params }: PageProps<"/trips/[id]">) {
  const { id } = await params;
  const res = await axiosInstance.get(
    envVars.NEXT_PUBLIC_GET_TRAVEL_LISTS_BY_ID + `/${id}`,
  );

  return {
    title: res?.data?.data?.title,
    description: res?.data?.data?.description,
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
