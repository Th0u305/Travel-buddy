"use client";

import { useEffect } from "react";
import Footer from "@/src/components/layout/Footer";
import Navbar from "@/src/components/layout/Navbar";
import { useGetUserProfile } from "@/src/tanstack/useQuery";
import UpdateUserError from "@/src/components/layout/UpdateUserError";
import { useUserStore } from "@/src/store/zustand.store";
// import Loading from "@/src/components/loading";
// import { useUserStore } from "@/src/store/zustand.store";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userProfileRefetch } = useGetUserProfile();
  const updateError = useUserStore((state) => state.updateError);
  // const hasHydrated = useUserStore((state) => state.hasHydrated);

  useEffect(() => {
    userProfileRefetch();
  }, [userProfileRefetch]);

  // if (!hasHydrated) {
  //   return (
  //     <div className="flex items-center justify-center h-screen bg-[#212121]">
  //       <Loading />
  //     </div>
  //   );
  // }

  return (
    <div className="relative">
      {updateError && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10">
          <UpdateUserError />
        </div>
      )}
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
