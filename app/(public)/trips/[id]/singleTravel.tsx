"use client";

import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";
import { envVars } from "@/src/config/env";
import {
  Banknote,
  CalendarIcon,
  Clock,
  Heart,
  MapPinIcon,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useGetTravelListById } from "@/src/tanstack/useQuery";
import { useParams } from "next/navigation";

const SingleTravel = ({id} : {id : string}) => {

  const {id: paramsId} = useParams() 

  const {travelList, isLoading} = useGetTravelListById(id ? id : paramsId as string)

  const calculateDuration = () => {
    if (!travelList) return 0;
    const startDate = new Date(travelList?.start_date);
    const endDate = new Date(travelList?.end_date);
    const diffTime = Math.abs(Number(endDate) - Number(startDate));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const orderStatus = [
    {
      id: 1,
      date: "Day 01 — Arrival",
      title: "Puerto Natales Gathering",
      description:
        "Check-in at our base camp hotel. Welcome dinner and gear orientation. We prepare our spirits for the southern wind.",
    },
    {
      id: 2,
      date: "Day 02-05 — The W-Trek North",
      title: "Into the Heart of Granite",
      description:
        "Hiking to the base of Las Torres. The ascent is challenging but the reward is a front-row seat to the granite giants reflecting in the lake.",
    },
    {
      id: 3,
      date: "Day 06-10 — Glacial Spirits",
      title: "French Valley & Grey Glacier",
      description:
        "We cross the French Valley with its hanging glaciers and constant roar of ice-avalanches before reaching the colossal Grey Glacier field.",
    },
  ];

  const imageList = [
    {
      id: 1,
      src: `https://res.cloudinary.com/${envVars.NEXT_PUBLIC_IMAGE_CLOUD_NAME}/image/upload/q_auto/f_auto/v1776234313/ughr5xdhrc1x7yvgj2va.png`,
      alt: "middle-aged man with graying hair in a professional outdoor photo",
    },
    {
      id: 2,
      src: `https://res.cloudinary.com/${envVars.NEXT_PUBLIC_IMAGE_CLOUD_NAME}/image/upload/q_auto/f_auto/v1776234313/oxpuatb74h7lpaisxdh3.png`,
      alt: "portrait of a man with sunglasses and an outdoor hat smiling in bright sunlight",
    },
    {
      id: 3,
      src: `https://res.cloudinary.com/${envVars.NEXT_PUBLIC_IMAGE_CLOUD_NAME}/image/upload/q_auto/f_auto/v1776225555/fytplzipunjeg6kkgejo.png`,
      alt: "woman in hiking gear standing on a rock overlooking a valley",
    },
    {
      id: 4,
      src: `https://res.cloudinary.com/${envVars.NEXT_PUBLIC_IMAGE_CLOUD_NAME}/image/upload/q_auto/f_auto/v1776234313/wzzrakohxs76t6qygogb.png`,
      alt: "vibrant portrait of a woman with curly hair laughing outdoors",
    },
    {
      id: 5,
      src: `https://res.cloudinary.com/${envVars.NEXT_PUBLIC_IMAGE_CLOUD_NAME}/image/upload/q_auto/f_auto/v1776234313/hif3inrvpfeidwgkhwiy.png`,
      alt: "happy young man in a yellow raincoat in a misty forest",
    },
    {
      id: 6,
      src: `https://res.cloudinary.com/${envVars.NEXT_PUBLIC_IMAGE_CLOUD_NAME}/image/upload/q_auto/f_auto/v1776234313/urutbci05huidgn3t4jn.png`,
      alt: "profile of a woman with braided hair looking at a mountain range",
    },
  ];

  if (isLoading) {
    return <Loading />
  }

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-12 mt-20">
      {/* Hero Section */}
      <section className="relative h-154 md:h-192 w-full rounded-[2.5rem] overflow-hidden group">
        <Image
          loading="eager"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          data-alt="dramatic wide angle shot of snowy jagged mountain peaks in Patagonia at sunrise with golden light reflecting on a calm turquoise lake in the foreground"
          src={travelList?.image}
          alt="Patagonia landscape"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex gap-2 mb-4">
              <span className="px-4 py-1 rounded-full bg-primary text-white text-xs font-bold tracking-widest uppercase ">
                Adventurous
              </span>
              <span className="px-4 py-1 rounded-full bg-secondary text-on-secondary text-xs font-bold tracking-widest uppercase">
                {travelList?.city}
              </span>
            </div>
            <h1 className="text-white text-5xl md:text-7xl font-extrabold mb-4 leading-tight">
              {travelList?.title}
            </h1>
            <div className="flex items-center gap-6 text-white/90 font-medium">
              <p className="flex flex-row items-center gap-2">
                <CalendarIcon className="stroke-blue-500" />
                {travelList?.start_date} - {travelList?.end_date}
              </p>
              <p className="flex flex-row items-center gap-2">
                <MapPinIcon className="stroke-green-500" />
                {travelList?.country}
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <Button className="text-white px-12 py-5 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all">
              Join Trip
            </Button>
          </div>
        </div>
      </section>

      {/* Bento Overview Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Summary */}
        <div className="md:col-span-2 bg-[#f3f4ee] rounded-4xl p-8 md:p-12 relative overflow-hidden">
          <h2 className="text-3xl font-bold mb-6">Trip Overview</h2>
          <p className="text-on-surface-variant text-lg leading-relaxed mb-6 font-body">
            {travelList?.description}
          </p>

          {travelList?.tags && travelList.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {travelList.tags.map((tag: string, i: number) => (
                <span key={i} className="px-3 py-1 md:px-4 md:py-1.5 bg-accent text-accent-foreground text-xs uppercase font-bold tracking-wider rounded-md">
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest font-bold text-outline">
                Difficulty
              </p>
              <p className="text-xl font-bold flex items-center gap-2">
                <TrendingUp className="text-secondary stroke-primary" />
                Intermediate
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest font-bold text-outline">
                Start Date
              </p>
              <p className="text-xl font-bold flex items-center gap-2">
                <Clock className="text-secondary stroke-primary" />
                {travelList?.start_date}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest font-bold text-outline">
                End Date
              </p>
              <p className="text-xl font-bold flex items-center gap-2">
                <Clock className="text-secondary stroke-primary" />
                {travelList?.end_date}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest font-bold text-outline">
                Duration
              </p>
              <p className="text-xl font-bold flex items-center gap-2">
                <Clock className="text-secondary stroke-primary" />
                {calculateDuration()} Days
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest font-bold text-outline">
                Cost
              </p>
              <p className="text-xl font-bold flex items-center gap-2">
                <Banknote className="text-secondary stroke-primary" />$
                {travelList?.max_budget}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest font-bold text-outline">
                Travel Type
              </p>
              <p className="text-xl font-bold flex items-center gap-2">
                {travelList?.travel_type.toLowerCase() === "couple" ? (
                  <Heart className="fill-red-500 w-4 h-4" />
                ) : travelList?.travel_type.toLowerCase() === "solo" ? (
                  <User className="fill-blue-500 w-4 h-4" />
                ) : (
                  <Users className="fill-green-500 w-4 h-4" />
                )}
                {travelList?.travel_type}
              </p>
            </div>
          </div>
        </div>

        {/* Host Card */}
        <div className="bg-surface-container-highest rounded-4xl p-8 flex flex-col items-center text-center justify-center bg-[#dfe4dd]">
          <Image
            loading="eager"
            width={100}
            height={100}
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-6 object-cover"
            data-alt="smiling woman with brown hair in outdoor gear with blurred mountain background"
            src={
              travelList?.profiles?.profile_picture ||
              travelList?.profiles?.avatar_url ||
              `https://res.cloudinary.com/${envVars.NEXT_PUBLIC_IMAGE_CLOUD_NAME}/image/upload/q_auto/f_auto/v1776225555/fytplzipunjeg6kkgejo.png`
            }
            alt="Elena Rodriguez"
          />
          <p className="text-xs uppercase tracking-widest font-bold text-outline mb-2">
            Hosted by
          </p>
          <h3 className="text-2xl font-bold mb-2 leading-tight">
            {travelList?.profiles?.full_name}
          </h3>
          <p className="text-on-surface-variant text-sm mb-6 max-w-50">
            Certified mountain guide & Patagonia specialist with 10+ years
            experience.
          </p>
          <button className="cursor-pointer active:scale-95 transition-all w-full bg-white py-3 rounded-xl font-bold text-primary hover:bg-primary hover:text-white border border-outline-variant/30">
            Message Host
          </button>
        </div>
      </section>

      {/* Itinerary & Buddies Section */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Itinerary (Chronological) */}

        <div className="lg:col-span-3 space-y-8">
          <h2 className="text-3xl font-bold">The Journey Path</h2>

          <Timeline defaultValue={3} className="">
            {orderStatus.map((item) => (
              <TimelineItem
                key={item.id}
                step={item.id}
                className="group-data-[orientation=vertical]/timeline:ms-10"
              >
                <TimelineHeader>
                  <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />

                  <TimelineDate className="text-xs font-extrabold uppercase tracking-tighter text-tertiary">
                    {item.date}
                  </TimelineDate>
                  <TimelineTitle className="text-xl font-bold">
                    {item.title}
                  </TimelineTitle>
                  <TimelineTitle>
                    {item.title === "Puerto Natales Gathering" && (
                      <Image
                        loading="eager"
                        className="w-full h-48 object-cover rounded-xl mt-4"
                        src={travelList?.image}
                        alt="a"
                        width={1000}
                        height={1000}
                      />
                    )}
                  </TimelineTitle>
                  <span className="absolute -left-9.5 top-0.5 w-5 h-5 bg-primary rounded-full border-4 border-surface ring-4 ring-primary/10"></span>
                </TimelineHeader>
                <TimelineContent className="text-on-surface-variant text-lg leading-relaxed mb-8 font-body">
                  {item.description}
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </div>

        {/* Side Sidebar: Buddies & Map */}
        <div className="lg:col-span-2 space-y-8">
          {/* Buddies Section */}
          <div className="bg-surface-container-low rounded-4xl p-8 bg-[#f3f4ee]">
            <h3 className="text-2xl font-bold mb-6 flex justify-between items-center">
              Joined Buddies
              <span className="text-sm font-medium text-secondary">
                {travelList?.max_buddies - (travelList?.max_buddies - 1)} /
                {travelList?.max_buddies - 1} Spots
              </span>
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {imageList?.map((item) => (
                  <Image
                    loading="eager"
                    key={item.id}
                    className="w-full aspect-square rounded-2xl object-cover hover:scale-105 transition-transform"
                    data-alt={item.alt}
                    src={item.src}
                    alt={item.alt}
                    width={100}
                    height={100}
                  />
                ))}
              <div className="w-full aspect-square rounded-2xl bg-surface-container-highest flex items-center justify-center text-outline-variant font-bold text-lg">
                +{travelList?.max_buddies - 1}
              </div>
            </div>
            <Button variant="link" className="w-full mt-6 flex items-center justify-center gap-2 text-primary font-bold hover:underline">
              View all participants
            </Button>
          </div>

          {/* Map Section */}
          <div className="rounded-4xl p-8 h-100 flex flex-col bg-[#f3f4ee]">
            <h3 className="text-2xl font-bold mb-6">Route Map</h3>
            <div className="grow rounded-2xl overflow-hidden relative border border-outline-variant/10">
              <Image
                width={200}
                height={200}
                loading="eager"
                className="w-full h-full object-cover grayscale opacity-50"
                data-alt="stylized satellite topographic map of a mountainous region with lakes and jagged terrain in muted earthy tones"
                data-location="Torres del Paine, Chile"
                src={`https://res.cloudinary.com/${envVars.NEXT_PUBLIC_IMAGE_CLOUD_NAME}/image/upload/q_auto/f_auto/v1776238720/ry7eoe90ctuzkvb0zwid.png`}
                alt="Route map"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Mock Route Line */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 400 300"
                  >
                    <path
                      d="M50,250 Q150,200 200,150 T350,50"
                      fill="none"
                      stroke="#a33f00"
                      strokeDasharray="8 8"
                      strokeWidth="4"
                    ></path>
                    <circle cx="50" cy="250" fill="#3f6754" r="8"></circle>
                    <circle cx="350" cy="50" fill="#a33f00" r="8"></circle>
                  </svg>
                  {/* Labels */}
                  <div className="absolute bottom-10 left-10 bg-white px-3 py-1 rounded shadow-sm font-bold text-xs text-black">
                    Puerto Natales
                  </div>
                  <div className="absolute top-10 right-10 bg-white px-3 py-1 rounded shadow-sm font-bold text-xs text-black">
                    Torres del Paine
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SingleTravel;
