"use client";

import { Button } from "@/src/components/ui/button";
import { useUserStore } from "@/src/store/zustand.store";
import { useGetTravelListById } from "@/src/tanstack/useQuery";
import { TravelListTs } from "@/src/types/types";
import { ArrowRight, CalendarIcon, Map, MedalIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

// --- Sub-components for Modularity ---

const StatItem = ({
  value,
  label,
  colorClass,
}: {
  value: string;
  label: string;
  colorClass: string;
}) => (
  <div className="flex flex-col">
    <span className={`text-2xl font-headline font-extrabold ${colorClass}`}>
      {value}
    </span>
    <span className="text-xs font-body text-on-surface-variant">{label}</span>
  </div>
);

// --- Main Page Component ---

export default function MyTripsDashboard() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const userFullProfile = useUserStore((state) => state.userFullProfile);
  useGetTravelListById(hoveredId || "");
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col max-w-7xl mx-auto mt-16 md:mt-20 gap-5 px-4 lg:ml-8 pb-10">
      {/* Page Header & Tabs */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-end">
          <h1 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight">
            My Trips
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <Button
            size="lg"
            className=" text-white rounded-full hover:scale-105 transition-all active:scale-100"
          >
            Upcoming
          </Button>
          <Button
            size="lg"
            className="rounded-full hover:scale-105 transition-all active:scale-100"
          >
            Past
          </Button>
        </div>
      </div>

      <div className="flex w-full flex-col lg:flex-row-reverse gap-6 items-stretch lg:items-start justify-end">
        <div className="bg-gray-200 rounded-3xl p-6 flex flex-col gap-1.5 w-full lg:w-1/3 xl:w-1/4">
          {/* User Profile Header */}
          <div className="flex items-center gap-4 overflow-hidden">
            <Image
              alt="User profile avatar"
              className="w-15 h-15 object-cover rounded-full"
              data-alt="User Avatar"
              src={
                userFullProfile?.avatar_url ||
                "https://res.cloudinary.com/jingalahuhu69/image/upload/v1776234313/wzzrakohxs76t6qygogb.png"
              }
              width={500}
              height={500}
            />
            <div>
              <h3 className="font-headline font-bold text-lg text-on-surface">
                {userFullProfile?.full_name || "Unknown User"}
              </h3>
              <p className="text-xs font-body truncate max-w-35">
                {userFullProfile?.bio || "Global Nomad"}
              </p>
            </div>
          </div>

          <div className="bg-surface-container-low h-px w-full"></div>

          {/* Stats Grid */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold text-outline uppercase tracking-widest">
              Explorer Stats
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <StatItem
                value={
                  userFullProfile?.visited_countries?.length?.toString() || "0"
                }
                label="Countries"
                colorClass="text-primary"
              />
              <StatItem
                value={userFullProfile?.travel_plans?.length?.toString() || "0"}
                label="Total Trips"
                colorClass="text-secondary"
              />
            </div>
          </div>

          {/* Achievement Banner */}
          <div className="bg-[#f4f5f0] rounded-xl p-4 flex items-start gap-3 mt-2">
            <MedalIcon />
            <div>
              <h5 className="text-sm font-headline font-bold text-on-surface mb-1">
                {userFullProfile?.subscription_tier || "Basic"} Status
              </h5>
              <p className="text-xs font-body text-on-surface-variant">
                {userFullProfile?.is_premium ? "Premium" : "Basic"}
              </p>
            </div>
          </div>
        </div>

        {/* Left Column: Tabs & Content */}
        <div className="w-full lg:w-2/3 xl:w-3/4">
          {/* Trip Grid (Bento/Asymmetric feel) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* trip card */}
            {userFullProfile?.travel_plans?.length || 0 > 0 ? (
              userFullProfile?.travel_plans?.map(
                (item: TravelListTs, i: number) => (
                  <div
                    key={i}
                    className="bg-accent rounded-3xl p-3 flex flex-col gap-4 relative overflow-hidden group"
                  >
                    {/* Image Header */}
                    <div className="relative w-full h-56 rounded-3xl overflow-hidden">
                      <Image
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={item.image}
                        width={500}
                        height={500}
                        alt={item.title}
                      />
                      <div className="absolute top-3 left-3 bg-surface/80 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm text-white font-semibold">
                        <CalendarIcon className="stroke-yellow-700 w-5 h-5" />
                        {item?.start_date?.split("T")[0]}-
                        {item?.end_date?.split("T")[0]}
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      className="px-2 pb-2 flex flex-col gap-3"
                      onMouseEnter={() => setHoveredId(item.slug)}
                    >
                      <div>
                        <span className="text-xs font-bold text-tertiary uppercase tracking-wider mb-1 block">
                          {item?.country}
                        </span>
                        <h2 className="text-xl font-headline font-bold text-on-surface leading-tight">
                          {item.title}
                        </h2>
                      </div>

                      {/* Footer actions & status */}
                      <div className="flex items-center justify-between mt-2">
                        {item.looking_for_buddy ? (
                          <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-full">
                            <span className="material-symbols-outlined text-[16px] text-outline">
                              search
                            </span>
                            <span className="text-xs font-medium text-on-surface-variant">
                              Looking for buddies
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-full bg-white">
                            <div className="flex -space-x-2">
                              <div className="w-6 h-6 rounded-full bg-primary-container border-2 border-surface-container-lowest flex items-center justify-center text-[10px] font-bold text-on-primary-container">
                                J
                              </div>
                              <div className="w-6 h-6 rounded-full bg-secondary-container border-2 border-surface-container-lowest flex items-center justify-center text-[10px] font-bold text-on-secondary-container">
                                M
                              </div>
                              <div className="w-6 h-6 rounded-full bg-tertiary-container border-2 border-surface-container-lowest flex items-center justify-center text-[10px] font-bold text-on-tertiary-container">
                                +1
                              </div>
                            </div>
                            <span className="text-xs font-medium text-on-surface-variant">
                              {item.travel_type}
                            </span>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button
                            size="lg"
                            variant="link"
                            onClick={() => router.push(`/trips/${item.slug}`)}
                            className="bg-white hover:scale-105 transition-all active:scale-100 w-10 h-10 rounded-full border border-primary"
                          >
                            <ArrowRight className="material-symbols-outlined text-[20px]" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              )
            ) : (
              <div className="flex items-center justify-center bg-accent rounded-3xl p-3 flex-col gap-4 relative overflow-hidden group">
                <p className="text-on-surface-variant">No trips found</p>
              </div>
            )}

            {/* Static New Trip Action Card */}
            <div className="bg-accent rounded-3xl p-6 flex flex-col items-center justify-center text-center gap-4 min-h-75 border border-outline-variant/15 border-dashed">
              <div className="w-16 h-16 rounded-full bg-primary-container/30 flex items-center justify-center text-primary mb-2 bg-primary">
                <span className="material-symbols-outlined text-[32px]">
                  <Map className="text-white" />
                </span>
              </div>
              <div>
                <h3 className="text-lg font-headline font-bold text-on-surface mb-1">
                  Plan Your Next Escape
                </h3>
                <p className="text-sm font-body text-on-surface-variant max-w-50 mx-auto">
                  Start charting a new path. Where to next?
                </p>
              </div>
              <Button
                onClick={() => router.push("/create-travel-plan")}
                size="lg"
                className="text-white rounded-full hover:scale-105 transition-all active:scale-100"
              >
                Create Trip
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Sidebar Stats (Visible on desktop) */}
    </main>
  );
}
