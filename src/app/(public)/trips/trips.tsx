"use client";

import { Button } from "@/src/components/ui/button";
import {
  ArrowRight,
  CalendarIcon,
  Heart,
  LayoutGrid,
  List,
  MapPinIcon,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  useGetTravelListById,
  useGetTravelListsByPagination,
} from "@/src/tanstack/useQuery";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { TravelListTs } from "@/src/types/types";
import { Input } from "@/src/components/ui/input";
import Pagination from "@/src/components/ui/pagination";
import { envVars } from "@/src/config/env";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useForm } from "@tanstack/react-form";
import { useUserStore } from "@/src/store/zustand.store";
import Link from "next/link";
import Skeleton from "@/src/components/ui/skeleton";

const getTripStatus = (startDate: string, endDate: string) => {
  if (!startDate || !endDate) return "Upcoming";
  const start = new Date(startDate);
  const end = new Date(endDate);
  const todayDate = new Date();

  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  todayDate.setHours(0, 0, 0, 0);

  if (start > todayDate) return "Upcoming";
  if (end < todayDate) return "Completed";
  return "Ongoing";
};

export default function ExploreAdventures() {
  const [travelType, setTravelType] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { isLoading } = useGetTravelListsByPagination(
    currentPage,
    searchQuery,
    travelType,
  );
  const { travelLists } = useUserStore();
  // const { updateTripStatusRefetch } = useUpdateTripStatus();

  // useEffect(() => {
  //   updateTripStatusRefetch()
  // }, [updateTripStatusRefetch])

  useGetTravelListById(hoveredId || "");
  const [isGrid, setIsGrid] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<
    "all" | "upcoming" | "ongoing" | "completed"
  >("all");
  const items = [
    { label: "Solo", value: "solo" },
    { label: "Couple", value: "couple" },
    { label: "Group", value: "group" },
  ];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredTravelLists =
    travelLists?.filter((trip) => {
      if (!trip?.start_date || !trip?.end_date) return true;
      const startDate = new Date(trip?.start_date);
      const endDate = new Date(trip?.end_date);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      if (activeTab === "upcoming") {
        return startDate > today;
      }
      if (activeTab === "ongoing") {
        return startDate <= today && endDate >= today;
      }
      if (activeTab === "completed") {
        return endDate < today;
      }
      return true;
    }) || [];

  const form = useForm({
    defaultValues: {
      search: "",
    },

    onSubmit: async ({ value }) => {
      if (value.search.length === 0) {
        return;
      }
      setSearchQuery(value.search);
    },
  });

  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden min-h-100 flex items-center p-4 sm:p-8 md:p-16">
          <div className="absolute inset-0 z-0">
            <Image
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
              loading="eager"
              data-alt="Breathtaking wide shot of misty mountain peaks at dawn with layered blue and purple hues"
              src={`https://res.cloudinary.com/${envVars.NEXT_PUBLIC_IMAGE_CLOUD_NAME}/image/upload/q_auto/f_auto/v1776111476/alwen4cdhccyggalbitw.png`}
              alt="Mountain landscape"
            />
            <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[2px]"></div>
          </div>
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1]">
              Where will you drift next?
            </h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="bg-white flex flex-col md:flex-row gap-2 p-2 rounded-2xl shadow-xl"
            >
              <div className="flex-1 flex items-center sm:px-4 sm:border-r sm:border-outline-variant/20">
                <span className="hidden sm:block material-symbols-outlined text-primary mr-3">
                  search
                </span>
                <form.Field name="search">
                  {(field) => {
                    return (
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        className="bg-white w-full border-none focus:ring-0 h-full"
                        placeholder="Search by country or city"
                        type="text"
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    );
                  }}
                </form.Field>
              </div>
              <Button className="border-0 h-1 sm:h-15 bg-secondary text-white px-8 py-4 rounded-xl font-semibold transition-transform active:scale-95 shadow-lg shadow-primary/20">
                Find Adventures
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Trip Grid */}
      <div className="px-6 space-y-5 py-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-on-surface-variant font-medium flex sm:text-[15px] lg:text-lg gap-1 justify-center items-center sm:justify-start flex-col sm:flex-row">
            <p>Showing</p>
            <p className="text-on-surface font-bold">
              {filteredTravelLists.length} Adventures
            </p>
            <p>matching your criteria</p>
          </div>
          <div className="flex gap-2 justify-end">
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

            <Select
              aria-label="Select Types"
              items={items}
              onValueChange={(e) => {
                setTravelType(e as string);
              }}
              value={travelType}
            >
              <SelectTrigger className="md:w-35">
                <SelectValue placeholder="Select Types" />
              </SelectTrigger>
              <SelectPopup>
                {items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectPopup>
            </Select>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap sm:justify-start justify-center mt-2 mb-4">
          <Button
            variant={activeTab === "all" ? "default" : "outline"}
            onClick={() => setActiveTab("all")}
            size="sm"
          >
            All
          </Button>
          <Button
            variant={activeTab === "upcoming" ? "default" : "outline"}
            onClick={() => setActiveTab("upcoming")}
            size="sm"
          >
            Upcoming
          </Button>
          <Button
            variant={activeTab === "ongoing" ? "default" : "outline"}
            onClick={() => setActiveTab("ongoing")}
            size="sm"
          >
            Ongoing
          </Button>
          <Button
            variant={activeTab === "completed" ? "default" : "outline"}
            onClick={() => setActiveTab("completed")}
            size="sm"
          >
            Completed
          </Button>
        </div>

        <div
          className={`${isLoading || filteredTravelLists.length === 0 || !isGrid ? "flex gap-5 flex-col justify-center items-center" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}`}
        >
          {isLoading ? (
            <Skeleton />
          ) : filteredTravelLists.length > 0 ? (
            filteredTravelLists.map((item: TravelListTs, idx: number) => (
              <Card
                onMouseEnter={() => {
                  setHoveredId(item.slug);
                }}
                key={idx}
                className="py-0 w-full group overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border-none bg-surface-container-lowest"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    width={800}
                    height={600}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={item?.image}
                    alt={item?.title}
                  />

                  {/* Floating Badges */}

                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <div className="flex gap-2 flex-wrap">
                      <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                        <span
                          className={`text-[11px] font-bold uppercase tracking-wider ${
                            getTripStatus(item?.start_date, item?.end_date) ===
                            "Upcoming"
                              ? "text-blue-600"
                              : getTripStatus(
                                    item?.start_date,
                                    item?.end_date,
                                  ) === "Completed"
                                ? "text-gray-600"
                                : "text-green-600"
                          }`}
                        >
                          {getTripStatus(item?.start_date, item?.end_date)}
                        </span>
                      </div>

                      <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                        {/* trip type badge */}
                        <p className="">
                          {item?.travel_type.toLowerCase() === "couple" ? (
                            <Heart className="fill-red-500 w-4 h-4" />
                          ) : item?.travel_type.toLowerCase() === "solo" ? (
                            <User className="fill-blue-500 w-4 h-4" />
                          ) : (
                            <Users className="fill-green-500 w-4 h-4" />
                          )}
                        </p>
                        <p className="text-[11px] font-bold uppercase tracking-wider">
                          {item?.travel_type.toLowerCase() === "couple"
                            ? "Couple Trip"
                            : item?.travel_type.toLowerCase() === "solo"
                              ? "Solo Trip"
                              : item?.max_buddies > 2 &&
                                `${item?.max_buddies - 1} Travelers`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Header Section (Title, Destination, Dates) */}
                <CardHeader className="pb-2 pt-6">
                  <CardTitle className="text-2xl font-bold text-on-surface group-hover:text-primary transition-colors mb-2">
                    {item?.title}
                  </CardTitle>

                  <div className="flex flex-col gap-3 mt-2">
                    <p className="font-bold text-secondary uppercase tracking-widest flex items-center gap-1">
                      <MapPinIcon className="stroke-green-600 w-4 h-4" />{" "}
                      {item?.country}/{item?.city}
                    </p>
                    <p className="font-medium text-on-surface-variant flex items-center gap-1">
                      <CalendarIcon className="stroke-blue-500 w-4 h-4" />{" "}
                      {item?.start_date?.split("T")[0]} -{" "}
                      {item?.end_date?.split("T")[0]}
                    </p>
                  </div>
                </CardHeader>

                {/* 3. Content Section (Description & Tags) */}
                <CardContent className="flex flex-col gap-3">
                  {/* CardDescription automatically handles accessible muted text colors */}
                  <CardDescription className="text-sm text-on-surface-variant line-clamp-2">
                    {item?.description}
                  </CardDescription>

                  {item?.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.tags.slice(0, 6).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-accent text-accent-foreground text-[10px] uppercase font-bold tracking-wider rounded-md"
                        >
                          #{tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>

                {/* 4. Footer Section (Avatars and Trip Type) */}
                <CardFooter className="flex items-center justify-between border-t border-outline-variant/10 pt-4 pb-6">
                  {/* Avatar Stack */}
                  <div className="flex -space-x-2">
                    <Image
                      width={32}
                      height={32}
                      loading="eager"
                      alt={
                        item?.profiles.avatar_url ||
                        `https://res.cloudinary.com/${envVars.NEXT_PUBLIC_IMAGE_CLOUD_NAME}/image/upload/q_auto/f_auto/v1736827012/charlesdeluvio-kVg2DQTAK7c-unsplash_faxgm3.jpg`
                      }
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                      src={
                        item?.profiles.avatar_url ||
                        `https://res.cloudinary.com/${envVars.NEXT_PUBLIC_IMAGE_CLOUD_NAME}/image/upload/q_auto/f_auto/v1736827012/charlesdeluvio-kVg2DQTAK7c-unsplash_faxgm3.jpg`
                      }
                    />

                    {/* Overflow Counter */}

                    {/* {item?.extraExplorersCount > 0 && (
                          <div className="w-8 h-8 rounded-full bg-surface-container-high border-2 border-white flex items-center justify-center text-[10px] font-bold text-on-surface-variant z-10">
                            +{item?.extraExplorersCount}
                          </div>
                        )} */}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-on-surface-variant">
                      {item?.travel_type}
                    </span>
                    <Link
                      prefetch={true}
                      href={`/trips/${item.slug}`}
                      className="material-symbols-outlined text-on-surface-variant transition-transform active:scale-95"
                    >
                      <ArrowRight />
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] dark:bg-slate-900 p-6 sm:px-20 sm:py-14 flex items-center justify-center flex-col gap-1 rounded-xl">
              <Image
                loading="eager"
                width={200}
                height={200}
                src={`https://res.cloudinary.com/${envVars.NEXT_PUBLIC_IMAGE_CLOUD_NAME}/image/upload/q_auto/f_auto/v1776118058/o9d1b5iquarrf9l0leez.png`}
                alt="empty/image"
                className="w-full sm:w-50"
              />

              <h1 className="text-[1.4rem] dark:text-[#abc2d3] mt-6 font-medium text-black">
                No trips found
              </h1>

              <p className="text-[0.9rem] dark:text-slate-400 text-gray-500">
                Find your next adventure
              </p>
            </div>
          )}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </main>
  );
}
