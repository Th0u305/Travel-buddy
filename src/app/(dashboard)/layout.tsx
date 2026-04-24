"use client";
import React, { useEffect } from "react";
import DashboardLayout from "./DashboardLayout";
import { useGetUserFullProfile, useGetUserProfile } from "@/src/tanstack/useQuery";

const RootDashboardLayout = ({ children }: { children: React.ReactNode }) => {

  const { userProfileRefetch } = useGetUserProfile();
  const { getUserFullProfileRefetch } = useGetUserFullProfile();
  
  useEffect(() => {
    getUserFullProfileRefetch()
    userProfileRefetch()
  }, [userProfileRefetch, getUserFullProfileRefetch])

  return (
    <div className="flex">
      <DashboardLayout />
      {children}
    </div>
  );
};

export default RootDashboardLayout;
