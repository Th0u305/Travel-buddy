"use client";
import React, { useEffect } from "react";
import DashboardLayout from "./DashboardLayout";
import { useGetUserFullProfile } from "@/src/tanstack/useQuery";

const RootDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { getUserFullProfileRefetch } = useGetUserFullProfile();

  useEffect(() => {
    getUserFullProfileRefetch();
  }, [getUserFullProfileRefetch]);

  return (
    <div className="flex">
      <DashboardLayout />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default RootDashboardLayout;
