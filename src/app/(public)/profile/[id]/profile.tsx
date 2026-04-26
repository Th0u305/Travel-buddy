"use client";

import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent } from "@/src/components/ui/card";
import { MapPin, Calendar, Loader2 } from "lucide-react";
import Image from "next/image";
import {
  useGetUserViewProfile,
  useGetTravelListById,
} from "@/src/tanstack/useQuery";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { envVars } from "@/src/config/env";
import { TravelBuddiesTs } from "@/src/types/types";
import { useState } from "react";

const gallery = [
  {
    id: 1,
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCatxP_EMTjZ_qTz7R9vHAx0emN61xXHOwiX_Cz-LZhJ5Ulmz2c-4Bb0uxoCxWnLC-7PI94FytzKBm6t_6QNNjxbZd-Sub0GL56_FRQE0maMW4cxGfgwxsqU4j1VDlYQeA_ygQyu69ip9YKw3f8vOhjFpOouhBzCESDQFQtMvisUxZSIJ52_HmG3xLHTKwqbClgNRHcMUSrLJm4IvBv1c0j9CFV2jHVILUITy2cJ_ulaDxnr-lwMqsTSWu9gdtUuduwmeDOSKVudMg",
    span: "col-span-2 row-span-2",
    label: "Banff, 2023",
  },
  {
    id: 2,
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_pFANzmEpmUGHN6Xfo-f4sTIrxFujIy_nu2QQDP1G31TUQ63rTcNT-gELvjFtBlqbZ1oVxoF8vvTe-YM6qwXvNn_Pb_xN2kxNmpDD2MmO-3GmZZYngFANHRyygNkuRAVgN-9M-umt5I6AcVG-vlt_EWFYGpG_oeQkbT42GyliqNU7VXeMrKblstBSGL-mEGtMpB0xy0BnrH6d1ws9C4Pin1kyXFq-c4CQW8A_mjuv-99Emf53xR6nx_-3htsO36pyMlOT3QTbKfs",
    span: "col-span-1 row-span-1",
  },
  {
    id: 3,
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBm5lzeuEAOezvvAE6OhZueJjSh4C9z5Dw-jym6Kscw10G8ryr64DhFszbmwsYrlgGVyWfKaWQXx1BfVE_hbJiB_3STPAIggYEu6qXDcKLBKSKGhSR1NNN2_iIWdbMMedEZk07Ft5puvs0Zjs63Y6o6_GHYyLXYQFl8DMxr6fntrARe_nbxAYYz7wEDFLMD-Ma9bRApw7uqDJiTOOgXFGqwkGwlyagb8mbbH0qwgypcyugcLfEBu_VYOc99OGaEtxIqrFnZRQqoTcI",
    span: "col-span-1 row-span-1",
  },
  {
    id: 4,
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhFGLqShzGfwLjF-aq5hFhkPkGvC4XP_n0vGvvmJMX4S_FXEKKV2XrRtQmbC3af14wzEEVZxpVT4iq_Ud7Axcjj95XlpFy19uu-vznYfyh-EZFmmLSIfy981_ZglpKD566y1Te-b5i0tCh3IogP92ozD0tcauX50rQLMfDB9VY2bKAbt0IVQZvmuPRTJcXb08GR8-oCWr_BCZeS0odiiIqD4DyYJOrzDJu7W1FjcPq5FKPPXZUXCB4UmXukYpygUrHTGbebTf6A_g",
    span: "col-span-2 row-span-1",
    label: "Pyrenees, 2024",
  },
];

const fallbackProfilePic =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDf7XH1ozfPb_T7EFskMvlb1YbHb6nWxF4fY4g6oNaKScVCbG-EU4OBSp-qM9yqLmAVTdE7gjGGSEGwBNilzi1xBypp5NCZrRyna3RfvqhBt1k8B-OLwMsUfYaBSht5SWYLoATYESFAIPFxN9JBTX3qkLffdrGrlmbsbK71XfzTcyurowlsY57awnsC4Xk-KahHSkst1EUwLPuAjE_MPJHTQMEw3rbsqIsyueMGZO68KlO9W4RHSXDivxojBurNcqxjc0OpLzAksBA";

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
};

export default function Profile({ id }: { id: string }) {
  const router = useRouter();

  const { profile, isLoading } = useGetUserViewProfile(id);
  const [tripSlug, setTripSlug] = useState<string | null>(null);
  useGetTravelListById(tripSlug || "");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <h2 className="text-2xl font-bold">Profile not found</h2>
        <Button variant="ghost" onClick={() => router.back()} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  const travelInterests = Array.isArray(profile?.travel_interests) ? profile.travel_interests: [];

  return (
    <div className="bg-background text-foreground font-sans antialiased min-h-screen">
      <main className="pt-16 min-h-screen">
        {/* Hero Section: Cover & Profile */}
        <div className="relative w-full h-112.5 overflow-hidden">
          <Image
            width={1200}
            height={500}
            alt="Cover background"
            loading="eager"
            className="w-full h-full object-cover"
            src={`https://res.cloudinary.com/${envVars.NEXT_PUBLIC_IMAGE_CLOUD_NAME}/image/upload/q_auto/f_auto/v1736841697/dfth_omxv9o.jpg`}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>

          <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-6">
              <div className="relative">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-xl border-4 border-background overflow-hidden shadow-xl bg-background">
                  <Image
                    width={200}
                    height={200}
                    alt={`Profile of ${profile?.full_name || "User"}`}
                    className="w-full h-full object-cover"
                    src={
                      profile?.avatar_url ||
                      fallbackProfilePic
                    }
                  />
                </div>
              </div>

              <div className="flex-1 mb-2">
                <h1 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
                  {profile?.full_name}
                </h1>
                <div className="flex items-center gap-3 text-white/90 font-medium">
                  {profile?.country && (
                    <>
                      <MapPin className="h-4 w-4" />
                      <span className="text-lg">{profile.country}</span>
                      <span className="mx-2 opacity-50">•</span>
                    </>
                  )}
                  <span className="text-lg">
                    {profile?.travel_plans?.length} Expeditions
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Bio & Interests */}
            <div className="lg:col-span-4 space-y-12">
              <Card className="bg-muted/30 border-none shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">
                    About {profile?.full_name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {profile.bio || "No bio available."}
                  </p>
                </CardContent>
              </Card>

              {travelInterests?.length > 0 && (
                <section>
                  <h3 className="text-xl font-bold mb-6">Interests</h3>
                  <div className="flex flex-wrap gap-3">
                    {travelInterests.map((interest: string, index: number) => (
                      <Badge
                        key={index}
                        variant={index < 2 ? "default" : "secondary"}
                        className="px-4 py-2 rounded-full font-semibold text-xs uppercase tracking-wider"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </section>
              )}

              <Card className="bg-muted/50 border-none shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">Stats</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-orange-600 text-3xl font-bold">
                        {profile?.visited_countries?.length}
                      </div>
                      <div className="text-muted-foreground text-xs uppercase font-bold tracking-widest mt-1">
                        Countries Visited
                      </div>
                    </div>
                    <div>
                      <div className="text-orange-600 text-3xl font-bold">
                        {profile?.travel_plans?.length}
                      </div>
                      <div className="text-muted-foreground text-xs uppercase font-bold tracking-widest mt-1">
                        Trips Planned
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Trips & Gallery */}
            <div className="lg:col-span-8 space-y-16">
              {/* Current & Upcoming Trips */}
              <section>
                <div className="flex justify-between items-end mb-8">
                  <h2 className="text-3xl font-bold">
                    Current & Upcoming Trips
                  </h2>
                  {/* {travelPlans.length > 3 && (
                    <Link className="text-orange-600 font-bold text-sm hover:underline" href="/trips">View All Itineraries</Link>
                  )} */}
                </div>

                {profile?.travel_plans?.length > 0 ? (
                  <div className="space-y-6">
                    {profile?.travel_plans.map((trip: TravelBuddiesTs, i: number) => {
                      return (
                        <div
                          key={i}
                          className="group relative flex flex-col md:flex-row bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md border transition-shadow duration-300"
                        >
                          <Image
                            width={500}
                            height={500}
                            alt={trip.title}
                            className={`w-60 h-60 object-cover transition-all duration-500 group-hover:scale-105 ${!profile?.travel_plans[0]?.status ? "grayscale group-hover:grayscale-0" : ""}`}
                            src={profile?.travel_plans[0]?.image}
                          />

                          <div className="flex-1 p-6 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start mb-2">
                                <Badge
                                  className={`${profile?.travel_plans[0]?.status === "upcoming" ? "bg-orange-100 text-orange-700 hover:bg-orange-100" : "bg-blue-100 text-blue-700 hover:bg-blue-100"} px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border-none`}
                                >
                                  {profile?.travel_plans[0]?.status}
                                </Badge>
                                <span className="text-muted-foreground text-sm font-medium flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {formatDate(trip.start_date)} -{" "}
                                  {formatDate(trip.end_date)}
                                </span>
                              </div>
                              <h4 className="text-xl font-bold mb-2">
                                {trip.title}
                              </h4>
                              <p className="text-muted-foreground text-sm line-clamp-2">
                                {trip.city ? `${trip.city}, ` : ""}
                                {trip.country}
                                {trip.tags && trip.tags.length > 0
                                  ? ` • ${trip.tags.join(", ")}`
                                  : ""}
                              </p>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                              <Badge size="lg" variant="secondary">
                                {trip.travel_type}
                              </Badge>

                              <Button
                                onMouseEnter={() => setTripSlug(trip.slug)}
                                variant={"outline"}
                                className={`font-bold text-sm rounded-full`}
                              >
                                <Link
                                  prefetch={true}
                                  href={`/trips/${trip.slug}`}
                                >
                                  Details
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-8 text-center bg-muted/30 rounded-xl border border-dashed text-foreground">
                    <p className="text-muted-foreground">
                      No travel plans yet.
                    </p>
                  </div>
                )}
              </section>

              {/* Travel Gallery: Bento Style */}
              <section>
                <div className="flex justify-between items-end mb-8">
                  <h2 className="text-3xl font-bold">Travel Gallery</h2>
                  <Button
                    variant="secondary"
                    className="rounded-full font-bold"
                  >
                    Open Portfolio
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 h-150">
                  {gallery.map((item) => (
                    <div
                      key={item.id}
                      className={`${item.span} rounded-xl overflow-hidden relative group bg-muted`}
                    >
                      <Image
                        width={500}
                        height={500}
                        alt="Gallery image"
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                        src={item.src}
                      />
                      {!item.label && (
                        <div className="absolute inset-0 bg-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      )}
                      {item.label && (
                        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] uppercase font-bold tracking-widest">
                          {item.label}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
