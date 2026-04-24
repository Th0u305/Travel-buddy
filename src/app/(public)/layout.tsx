"use client";

import { useEffect } from "react";
import Footer from "@/src/components/layout/Footer";
import Navbar from "@/src/components/layout/Navbar";
import { useGetUserProfile } from "@/src/tanstack/useQuery";
// import Loading from "@/src/components/loading";
// import { useUserStore } from "@/src/store/zustand.store";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userProfileRefetch } = useGetUserProfile();
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
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
