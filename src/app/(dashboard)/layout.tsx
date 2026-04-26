"use client";
import React, { useEffect } from "react";
import DashboardLayout from "./DashboardLayout";
import { useGetUserFullProfile } from "@/src/tanstack/useQuery";
import { useUserStore } from "@/src/store/zustand.store";
import UpdateUserError from "@/src/components/layout/UpdateUserError";

const RootDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { getUserFullProfileRefetch } = useGetUserFullProfile();
  const updateError = useUserStore((state) => state.updateError);

  useEffect(() => {
    getUserFullProfileRefetch();
  }, [getUserFullProfileRefetch]);

  return (
    <div className="flex">
      {updateError && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10">
          <UpdateUserError />
        </div>
      )}
      <DashboardLayout />
      {children}
    </div>
  );
};

export default RootDashboardLayout;
