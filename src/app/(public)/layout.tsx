"use client";

import { useEffect } from "react";
import Footer from "@/src/components/layout/Footer";
import Navbar from "@/src/components/layout/Navbar";
import { useGetChatUsers, useGetUserFullProfile, useGetUserProfile } from "@/src/tanstack/useQuery";
import Loading from "@/src/components/loading";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userProfileRefetch, isLoading } = useGetUserProfile();
  const { getUserFullProfileRefetch } = useGetUserFullProfile();
  const { chatUsersRefetch } = useGetChatUsers();

  useEffect(() => {
    userProfileRefetch();
    getUserFullProfileRefetch();
    chatUsersRefetch();
  }, [userProfileRefetch, getUserFullProfileRefetch, chatUsersRefetch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#212121]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="relative">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
