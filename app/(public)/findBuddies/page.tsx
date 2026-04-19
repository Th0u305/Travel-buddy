"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  MessageCircle,
  LayoutGrid,
  List,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { useUserStore } from "@/src/store/zustand.store";
import { useFindBuddies, useGetFullProfile, useGetTravelListById } from "@/src/tanstack/useQuery";
import Pagination from "@/components/ui/pagination";
import Skeleton from "@/components/ui/skeleton";
import { TravelBuddiesTs } from "@/src/types/types";

export default function FindBuddies() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchCountryOrCity, setSearchCountryOrCity] = useState<string>("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  useGetTravelListById(hoveredId || "");
  const [isGrid, setIsGrid] = useState<boolean>(true);
  const [userSlug, setUserSlug] = useState<string | null>(null);
  useGetFullProfile(userSlug || "");

  const { isLoading } = useFindBuddies(
    searchQuery,
    searchCountryOrCity,
    currentPage,
  );
  const { travelBuddies } = useUserStore();

  const form = useForm({
    defaultValues: {
      search: "",
      searchByCountryOrCity: "",
    },
    onSubmit: async ({ value }) => {
      setSearchQuery(value.search);
      setSearchCountryOrCity(value.searchByCountryOrCity);
      setCurrentPage(1);
    },
  })

  return (
    <>
      {/* Main Content */}
      <main className="pt-24 pb-12 px-8 max-w-360 mx-auto min-h-screen">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar / Filters */}
          <aside className="w-full md:w-72 shrink-0 space-y-8">
            <Card className="border-none shadow-sm bg-muted/30">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">Filters</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                  }}
                  className="space-y-6"
                >
                  {/* General Search */}
                  <div>
                    <label className="block text-sm font-bold text-muted-foreground mb-3">
                      Search Names
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground stroke-green-600" />
                      <form.Field name="search">
                        {(field) => (
                          <Input
                            id={field?.name}
                            name={field?.name}
                            value={field?.state.value}
                            onBlur={field?.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="bg-[#dfe4dd] h-15 border-none rounded-xl pl-9 focus:ring-2 focus:ring-primary/20 transition-all text-lg font-medium"
                            placeholder="Find by name..."
                          />
                        )}
                      </form.Field>
                    </div>
                  </div>

                  {/* Destination */}
                  <div>
                    <label className="block text-sm font-bold text-muted-foreground mb-3">
                      Specific Destination
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground stroke-red-500" />
                      <form.Field name="searchByCountryOrCity">
                        {(field) => (
                          <Input
                            id={field?.name}
                            name={field?.name}
                            value={field?.state.value}
                            onBlur={field?.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="bg-[#dfe4dd] h-15 border-none rounded-xl pl-9 focus:ring-2 focus:ring-primary/20 transition-all text-lg font-medium"
                            placeholder="Filter by country or city"
                          />
                        )}
                      </form.Field>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      variant="secondary"
                      type="submit"
                      size="xl"
                      className="w-full rounded-full font-bold shadow-md"
                    >
                      Update Search
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Promo Card */}
            <div className="relative overflow-hidden rounded-xl bg-orange-100 p-6 text-orange-900 border border-orange-200">
              <div className="relative z-10">
                <h3 className="font-bold text-lg mb-2">Safety First</h3>
                <p className="text-xs leading-relaxed opacity-90">
                  Always verify your travel buddies through our secure community
                  protocol before meeting.
                </p>
                <button className="mt-4 text-xs font-bold underline decoration-2 underline-offset-4">
                  Read Guide
                </button>
              </div>
              <ShieldCheck className="absolute -right-4 -bottom-4 h-32 w-32 opacity-10 rotate-12" />
            </div>
          </aside>

          {/* Feed */}
          <section className="w-full">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight">
                  Buddy Discovery
                </h1>
                <p className="text-muted-foreground mt-2 font-medium">
                  {travelBuddies?.length} travelers looking for partners in your
                  region
                </p>
              </div>
              <div className="flex gap-2 justify-end h-10">
                <Button
                  size="lg"
                  variant={isGrid ? "secondary" : "outline"}
                  onClick={() => setIsGrid(true)}
                >
                  <LayoutGrid />
                </Button>
                <Button
                  onClick={() => setIsGrid(false)}
                  size="lg"
                  variant={isGrid ? "outline" : "secondary"}
                >
                  <List />
                </Button>
              </div>
            </div>

            {/* Traveler Grid */}
            <div
              className={`${isLoading || travelBuddies?.length === 0 || !isGrid ? "flex gap-5 flex-col justify-center items-center" : "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"}`}
            >
              {isLoading ? (
                <Skeleton />
              ) : travelBuddies?.length > 0 ? (
                travelBuddies?.map((traveler: TravelBuddiesTs, idx: number) => (
                  <Card
                    onMouseEnter={() => {
                      setHoveredId(traveler.slug);
                      setUserSlug(traveler?.profiles?.username_slug);
                    }}
                    key={idx}
                    className="w-full overflow-hidden group hover:-translate-y-1 transition-all duration-300 border-none shadow-md hover:shadow-lg"
                  >
                    <div className="relative h-64 m-4 overflow-hidden rounded-lg">
                      <Image
                        width={500}
                        height={500}
                        className="object-cover w-full h-full"
                        alt={`Portrait of ${traveler?.profiles?.full_name}`}
                        src={
                          traveler?.profiles?.profile_picture ||
                          traveler?.profiles?.avatar_url
                        }
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <div>
                          <h3 className="text-white font-bold text-xl">
                            {traveler?.profiles?.full_name}
                          </h3>
                          <div className="flex items-center text-white/90 text-xs font-medium mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {traveler?.city}, {traveler?.country}
                          </div>
                        </div>
                        <div className="bg-white/20 backdrop-blur-md rounded-full px-3 py-1 border border-white/30">
                          <span className="text-white text-[10px] font-bold uppercase tracking-wider">
                            {traveler?.travel_type}
                          </span>
                        </div>
                      </div>
                    </div>

                    <CardContent className="px-6 pb-6 pt-2">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">
                            Trip Name
                          </span>
                          <span className="text-sm font-bold text-orange-600 line-clamp-1">
                            {traveler?.title}
                          </span>
                        </div>
                        <div className="flex flex-col text-right">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">
                            Dates
                          </span>
                          <span className="text-xs font-bold w-24 line-clamp-1">
                            {traveler?.start_date} - {traveler?.end_date}
                          </span>
                        </div>
                      </div>

                      {traveler?.tags && traveler?.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {traveler?.tags?.slice(0, 6)?.map((tag, i) => (
                            <Badge
                              key={i}
                              className="text-[11px] font-bold rounded-lg bg-accent text-accent-foreground border-none"
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center w-fit gap-2 flex-wrap">
                          <Link
                            prefetch={true}
                            href={`/trips/${traveler.slug}`}
                            className="flex-1 flex"
                          >
                            <Button size="lg" className="rounded-full font-bold text-xs">
                              View Trip
                            </Button>
                          </Link>
                          <Link
                            prefetch={true}
                            href={`/profile/${traveler.profiles.username_slug}`}
                            className="flex-1 flex"
                          >
                            <Button size="lg" className="rounded-full font-bold text-xs">
                              View user profile
                            </Button>
                          </Link>
                        </div>

                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full shrink-0 aspect-square w-10 h-10 border-muted-foreground/30 text-orange-600 hover:bg-orange-50"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] p-6 sm:px-20 sm:py-14 flex items-center justify-center flex-col gap-1 rounded-xl">
                  <h1 className="text-[1.4rem] mt-6 font-medium text-black">
                    No travelers found
                  </h1>
                  <p className="text-[0.9rem] text-gray-500">
                    Try finding another adventure
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
        {/* Pagination Controls */}
        <div className="mt-12 text-center">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </main>
    </>
  );
}
