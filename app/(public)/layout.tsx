"use client";

import { useEffect } from "react";
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";
import { useUserStore } from "@/src/store/zustand.store";
import {useGetUserProfile} from "@/src/tanstack/useQuery";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userProfileRefetch } = useGetUserProfile();
  const { userData, setHasHydrated } = useUserStore();

  useEffect(() => {
    if (!userData) {
      userProfileRefetch();
    }
  }, [userData, userProfileRefetch, setHasHydrated]);
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
