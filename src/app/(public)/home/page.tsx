"use client";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarRange,
  CompassIcon,
  GlobeIcon,
  Handshake,
  MapIcon,
  MapPin,
  PlaneTakeoff,
  Search,
  TrendingUp,
  Users2,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";
import { Input } from "@/src/components/ui/input";
import { useGetTravelListsByPagination } from "@/src/tanstack/useQuery";
import { useUserStore } from "@/src/store/zustand.store";
import Link from "next/link";

export default function Home2() {
  const { isLoading } = useGetTravelListsByPagination(1, "", "", 3);
  const { travelLists } = useUserStore();
  return (
    <div className="bg-surface font-body text-on-surface">

      {/* floating feed */}
      <div className="fixed bottom-0 w-full z-40 bg-surface-container/90 backdrop-blur-md border-t border-outline-variant/20 py-2 hidden md:block">
        <div className="ticker flex gap-12 items-center whitespace-nowrap min-w-max text-sm font-medium">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <b>Alex</b> and <b>Sarah</b> matched for a hike in Patagonia
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            <b>David</b> just created a new expedition: Kyoto Autumn Leaves
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <b>Emma</b> joined Moroccan Desert Trek
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <b>Michael</b> and <b>Elena</b> matched for a surf trip in Bali
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <b>Sophie</b> just created a new expedition: Swiss Alps Hut-to-Hut
          </span>
          {/* Duplicate for seamless looping */}
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <b>Alex</b> and <b>Sarah</b> matched for a hike in Patagonia
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <b>David</b> just created a new expedition: Kyoto Autumn Leaves
          </span>
        </div>
      </div>
      
      {/* hero */}
      <main className="pb-12 md:pb-0">
        <section className="relative h-screen flex items-center pt-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              width={1920}
              height={1080}
              loading="eager"
              className="w-full h-full object-cover"
              alt="Wide panoramic shot of a mountain lake at sunrise"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5fINVwMU8xKTc-bTXs-r1iTMPzOZSRr6Mspg2olLAgHaVjgt3qplHfqpeN-zje9yyZbZECmdGDiV6H_Yr8bWwcJa62R5tBLxoflyczoO9A2fN3mePR8SB8WDbsqcbukjifbH80vgIgvhCWwwVMIiksMnl1GdkF2WtZR3gvEWoVdmibF4Z9tNaPu61e_Kc-nZIP8skWtfgGI10FJy1DVJ1ur_EkyHEbEmDf20Nh3UUSzLxD1lCJ9cdMw6i3QFeohacvJc6E50ZXHY"
            />
            <div className="absolute inset-0 hero-gradient"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary text-sm font-bold text-white shadow-sm">
                <p className="w-4 h-3 sm:w-2 sm:h-2 rounded-full bg-secondary animate-pulse"></p>
                1,204 explorers planning trips right now
              </div>
              <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-on-surface leading-tight tracking-tight drop-shadow-sm">
                Don&apos;t just travel. <br />
                <span className="text-primary italic relative inline-block">
                  Connect.
                  <svg
                    className="absolute -bottom-2 left-0 w-full text-tertiary/40"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 20"
                  >
                    <path
                      d="M0,10 Q50,20 100,10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></path>
                  </svg>
                </span>
              </h1>
              <p className="text-xl text-on-surface-variant max-w-xl leading-relaxed">
                Find intentional travel companions for your next adventure. We
                bridge the gap between solo wanderlust and shared experiences.
              </p>

              <div className="bg-surface-container-lowest p-2 rounded-3xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-2 max-w-2xl border border-outline-variant/20 transition-transform hover:scale-[1.01] duration-300">
                <div className="flex items-center flex-1 px-6 py-3 gap-3 w-full group min-w-0">
                  <MapPin className="stroke-green-600 shrink-0" />
                  <Input
                    className="border-0 outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 bg-transparent w-full"
                    placeholder="Where is your heart leading?"
                    type="text"
                  />
                </div>
                <div className="h-8 w-px bg-outline-variant/30 hidden md:block"></div>
                <div className="flex items-center flex-1 px-6 py-3 gap-3 w-full group min-w-0">
                  <CalendarRange className="stroke-blue-600 shrink-0" />
                  <Input
                    className="border-0 outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 bg-transparent w-full"
                    placeholder="When?"
                    type="text"
                  />
                </div>
                <Button
                  size="xl"
                  variant="default"
                  className="cta-gradient text-on-primary rounded-full hover:shadow-lg transition-all hover:-translate-y-0.5 border-0 active:scale-[0.98] w-full md:w-auto"
                >
                  <Search />
                </Button>
              </div>
            </div>
            <div className="hidden lg:block relative h-150">
              <div className="absolute top-10 right-0 w-64 h-80 rounded-2xl overflow-hidden shadow-2xl animate-float border-4 border-surface-container-lowest">
                <Image
                  width={256}
                  height={384}
                  loading="eager"
                  className="w-full h-full object-cover"
                  alt="Solo traveler looking at a coastal view"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4Te3kT1sbKGFzs_-i8b4pXt3cJyNJ3YAk5P9knAmViDL2BOHZi5vPN9zjErIFRWsRK29hYHeJBvEGv02hhthFQSEy5QhMI7XAqTqkC6oMe3bIVe4YaUMRkRJq_mIbfRdKpS039CuZsLE1RJB8TC5DX7AEpPXbwiNuNL1VK5-c3gRx_idTWvegmTs5P-P4w-VVtwy_oHl9dB-xsPm8RPwIYMVlRyJkj9xgIBIrw0Ti_qEqQ4PxiFYWAQ-A9WGPKl0gR66uqJJigiI"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-surface-container-lowest/90 backdrop-blur-sm p-3 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <Image
                      width={32}
                      height={32}
                      loading="eager"
                      alt="User avatar"
                      className="w-8 h-8 rounded-full border-2 border-primary"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaZM41SzZYjY_xLi8uuuX34n1lX2buKO0CSPvQKU_9wckiBXgDOf5je9ZMsPxw-jdjLv8DWsiBqYjq6mIDpWH1wUyPzGkryjYuIkXoLRcg9ZfDFsYEjrTiBUixWuy1gDj-WflN2TtIfgUu3Eefk_WZPGoXvAuxAPepvwuPVdpLSXasQDvtgWfpeczal-5S1qj9jY16qiy29cDj40UJm35eQuqbXaVpqnn0ekt2iIf2x8z2RRZPZ1DlN_H_9Pwc6_i1XHgFB9Ih0LQ"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">
                        Amalfi Coast Roadtrip
                      </p>
                      <p className="text-[10px] text-white">
                        Looking for 1 more buddy
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-10 left-0 w-72 h-96 rounded-2xl overflow-hidden shadow-2xl animate-float-reverse z-10 border-4 border-surface-container-lowest">
                <Image
                  width={288}
                  height={384}
                  loading="eager"
                  className="w-full h-full object-cover"
                  alt="Road trip through desert mountains"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYQnfLc9HAX-yBS6r2oPkh5OBhbrVJdF28d4Ta677Nz0EPPrUpo3DFB-NMysOtseXhEYYoNcgyhDVLb5Bes1RRA8JaOEsCUeRg7Ii-9LozJKB9Q5ZS0lXP4JAzZQ0IvLeIjeNJZtb1u6-lAMvcsyPT0Y9hqnGV7dRjPUXli0wxOYLVoUCsgXkQueRm-TUcF67AB4CbqdEFpQOnP63xBYNqP9mAEWrFcK7FbEYu5UXmXnui-fHfJ8rjLMS3ZAvrjHGrJAPxYBDtQMg"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-surface-container-lowest/90 backdrop-blur-sm p-3 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <Image
                        width={32}
                        height={32}
                        loading="eager"
                        alt="User avatar"
                        className="w-8 h-8 rounded-full border-2 border-surface-container-lowest"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDk8mG4uBGLQC9OXaS5LZEpGz6duNFom5JYjNSpAH52rZE46uqzUrih8L6BE2CIg9dxsCAToH1RsTm9fwzdZOXl8ffKHhOqD0tWRRAF6lvfqlS46hkaND3-9C_8eOuNlBtcZQXnJc4kbU9bRl6i_kxbkdPr8rCEg5bcHN6VWAsnaLW-ve8V679j0pQ-5db54WhX-WbbJK5m3WNezGTQHnEK14bTWkYOtHVHhqdY79Gj9HChJwaCfGOBdHMtzFTV8mj5JYjOKVnal90"
                      />
                      <Image
                        width={32}
                        height={32}
                        loading="eager"
                        alt="User avatar"
                        className="w-8 h-8 rounded-full border-2 border-surface-container-lowest"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3l2ydJOCHTcTeZeARac2FmTEudiHhyAMSAJEKB8HmswZ3-ut5BanR9lNaDfRlEsYYgIoaSK-NmYd2Upy7ahAei8B81ChmnEtU8SVar26FKsal85_pBZR7T_kNtOgkRcCb1nZzwnm7c6tvaM_TjEr92sk34yB4SgOo2Ozn-84aNDkHkkIktoxxxOaf0xe2cIbvbNVp3bYeHSEutqlD203NM3lgfSSJC9akobJeqeYgtHfYuYC_yHTTgGUXpD-Z7TRru0HHoGXeyEg"
                      />
                      <div className="w-8 h-8 rounded-full border-2 border-surface-container-lowest bg-primary flex items-center justify-center text-[10px] text-on-primary font-bold">
                        +2
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">
                        Route 66 Adventure
                      </p>
                      <p className="text-[10px] text-white">
                        Matches confirmed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="space-y-4">
                <span className="text-tertiary font-headline font-bold tracking-widest text-xs uppercase flex items-center gap-2">
                  <TrendingUp className="stroke-cyan-500" />
                  Trending Expeditions
                </span>
                <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface">
                  Highly active trips looking for buddies
                </h2>
              </div>
              <Link
                className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all duration-300"
                href="/trips"
              >
                Browse all trips
                <ArrowRight />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {isLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-96 bg-surface-container-low animate-pulse rounded-2xl"
                    ></div>
                  ))
                : travelLists?.slice(0, 3).map((item, idx: number) => (
                    <motion.div
                      key={item.id || idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * idx }}
                      className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-outline-variant/10"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          width={384}
                          height={256}
                          loading="eager"
                          alt={item?.title || "Trip Image"}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          src={item?.image || ""}
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <span className="bg-white backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm uppercase">
                            {item?.travel_type || "TRIP"}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 space-y-6">
                        <div>
                          <h3 className="text-xl font-headline font-bold text-on-surface mb-2 group-hover:text-primary transition-colors line-clamp-1">
                            {item?.title}
                          </h3>
                          <p className="text-on-surface-variant text-sm line-clamp-2">
                            {item?.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
                          <div className="flex flex-col">
                            <span className="text-xs text-on-surface-variant font-medium">
                              {item?.start_date?.split("T")[0]} -{" "}
                              {item?.end_date?.split("T")[0]}
                            </span>
                            <span className="text-sm font-bold text-on-surface">
                              {Math.ceil(
                                (new Date(item?.end_date).getTime() -
                                  new Date(item?.start_date).getTime()) /
                                  (1000 * 60 * 60 * 24),
                              )}{" "}
                              Days
                            </span>
                          </div>
                          <div className="flex -space-x-3">
                            <Image
                              width={40}
                              height={40}
                              loading="eager"
                              alt="User"
                              className="w-10 h-10 rounded-full border-2 border-surface-container-lowest relative z-10 object-cover"
                              src={
                                item?.profiles?.avatar_url ||
                                "https://res.cloudinary.com/dzt17r4ls/image/upload/q_auto/f_auto/v1736827012/charlesdeluvio-kVg2DQTAK7c-unsplash_faxgm3.jpg"
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#ecede6] overflow-hidden">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="w-full md:w-1/3 space-y-8">
                <div className="space-y-4">
                  <p className="text-secondary font-headline font-bold tracking-widest text-xs uppercase">
                    Global Activity
                  </p>
                  <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface">
                    Where connections are happening right now
                  </h2>
                </div>
                <p className="text-on-surface-variant leading-relaxed">
                  Our community spans across 150+ countries. Explore the map to
                  see real-time connections, trending destinations, and newly
                  formed expedition teams.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-outline-variant/20">
                    <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center">
                      <PlaneTakeoff className="stroke-amber-700" />
                    </div>
                    <div>
                      <p className="font-bold text-on-surface">
                        Top Destination: Japan
                      </p>
                      <p className="text-sm text-on-surface-variant">
                        342 active trips
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-outline-variant/20">
                    <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center">
                      <Handshake className="stroke-violet-700" />
                    </div>
                    <div>
                      <p className="font-bold text-on-surface">
                        Matches This Week
                      </p>
                      <p className="text-sm text-on-surface-variant">
                        1,894 buddies connected
                      </p>
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all duration-300">
                  Explore Interactive Map
                  <ArrowRight className="stroke-primary" />
                </button>
              </div>

              {/* map */}
              <div className="w-full md:w-2/3 relative h-125 bg-white rounded-3xl overflow-hidden border border-outline-variant/20 shadow-inner">
                <div
                  className="absolute inset-0 opacity-50"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 2px 2px, var(--color-outline-variant) 1px, transparent 0)",
                    backgroundSize: "24px 24px",
                  }}
                ></div>

                <svg
                  className="w-full h-full absolute inset-0 text-outline-variant/30 fill-current p-8"
                  viewBox="0 0 800 400"
                >
                  <path
                    d="M150,100 Q180,80 200,120 T250,150 T300,100 T350,130 T400,90 T450,140 T500,110 T550,160 T600,120 T650,150"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  ></path>
                  <path
                    d="M200,200 Q230,180 250,220 T300,250 T350,200 T400,230 T450,190 T500,240 T550,210 T600,260"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  ></path>
                  <path
                    d="M100,250 Q130,230 150,270 T200,300 T250,250 T300,280 T350,240 T400,290 T450,260 T500,310"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  ></path>
                </svg>

                <div className="absolute top-[30%] left-[25%] group cursor-pointer">
                  <div className="w-4 h-4 bg-primary rounded-full animate-ping absolute inset-0 opacity-75"></div>
                  <div className="w-4 h-4 bg-primary rounded-full relative z-10 border-2 border-surface-container-lowest"></div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-surface-container-lowest p-2 rounded-lg shadow-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    New York, USA
                  </div>
                </div>
                <div className="absolute top-[40%] left-[45%] group cursor-pointer">
                  <div className="w-4 h-4 bg-primary rounded-full animate-ping absolute inset-0 opacity-75"></div>
                  <div className="w-4 h-4 bg-primary rounded-full relative z-10 border-2 border-surface-container-lowest"></div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-surface-container-lowest p-2 rounded-lg shadow-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    Lima, Peru
                  </div>
                </div>
                <div className="absolute top-[45%] left-[55%] group cursor-pointer">
                  <div className="w-6 h-6 bg-secondary rounded-full animate-pulse absolute -inset-1 opacity-50"></div>
                  <div className="w-4 h-4 bg-secondary rounded-full relative z-10 border-2 border-surface-container-lowest"></div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-surface-container-lowest p-2 rounded-lg shadow-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    Rome, Italy (Trending)
                  </div>
                </div>
                <div className="absolute top-[60%] left-[80%] group cursor-pointer">
                  <div
                    className="w-4 h-4 bg-primary rounded-full animate-ping absolute inset-0 opacity-75"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div className="w-4 h-4 bg-primary rounded-full relative z-10 border-2 border-surface-container-lowest"></div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-surface-container-lowest p-2 rounded-lg shadow-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    Tokyo, Japan
                  </div>
                </div>
                <div className="absolute top-[70%] left-[30%] group cursor-pointer">
                  <div className="w-4 h-4 bg-primary rounded-full animate-ping absolute inset-0 opacity-75"></div>
                  <div className="w-4 h-4 bg-primary rounded-full relative z-10 border-2 border-surface-container-lowest"></div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-surface-container-lowest p-2 rounded-lg shadow-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    Lima, Peru
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#fafaf5]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16 space-y-4 max-w-2xl mx-auto">
              <p className="text-secondary font-headline font-bold tracking-widest text-xs uppercase">
                Curated Stories
              </p>
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface">
                The Explorer&apos;s Journal
              </h2>
              <p className="text-on-surface-variant">
                Real stories from travelers who met through our platform and
                embarked on life-changing journeys together.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group cursor-pointer"
              >
                <div className="relative h-100 rounded-2xl overflow-hidden mb-6 shadow-md">
                  <Image
                    width={384}
                    height={256}
                    loading="eager"
                    alt="Two friends looking at mountains"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWS_h-eQHrQNQFVQRj-Av6mC3BMA2Qgpbi_js7OsNhSMAg6a1UugJlIu__cGBgxXYE60cgB8928I_Eye5j0t7-Z8NxV2rQ8KclDVlmYOp3K4GvI3ASmrE5hXs80v8gUQk4u7N0Sz8aKKmPsFLGOIdZnmSUzepLAiZFRxEXlYoPlViRHLF6VOvbMsE7Mr2tuI4ggQ4Ez13kzgibNtKLN5x3o3ySKCerLgh8W5Fmiu0enV_GAhUhoxtTGQDXlQssNiHMhwrIEtkj9dU"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="space-y-4 pr-8">
                  <div className="flex items-center gap-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    <span className="text-primary">Featured Story</span>
                    <span>•</span>
                    <span>5 min read</span>
                  </div>
                  <h3 className="text-3xl font-headline font-extrabold text-on-surface group-hover:text-primary transition-colors leading-tight">
                    From Strangers to Summit: Conquering Kilimanjaro
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed line-clamp-3">
                    I had the permit, but my original group canceled. Posting on
                    Modern Explorer was a last resort, but it led me to find the
                    three best hiking partners I could have asked for.
                  </p>
                  <div className="flex items-center gap-3 pt-4">
                    <Image
                      width={40}
                      height={40}
                      loading="eager"
                      alt="Author"
                      className="w-10 h-10 rounded-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmSzhjjWmbb49qVM6GbkjkdT-UmbpAyaJPPNMNZaPVTmp0ApD4qShUX3mCXlll06hB3yzZsRY6xUMP0eSAtEkpmb2VlBByVCtY9nwxh7xBBVQky1Y3hZTKPqrqf0_k8ETZgjee5d-QRTv0aQC_uwzUn1qWbQ9SsxQXJftBFuOqPviblDE7L2nKPzPeefVeJpYJWDuPb8fDucKdg-NeLEzz8njg0Zo2EVczo-eBflLXeSoy6yPYacyHUgSuTMCOFXE9NjcHQDIg9KM"
                    />
                    <div>
                      <p className="text-sm font-bold text-on-surface">
                        Written by Sarah Jenkins
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        Travelled to Tanzania
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
              <div className="space-y-12">
                <motion.article
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="group cursor-pointer flex flex-col sm:flex-row gap-6 items-center"
                >
                  <div className="w-full sm:w-1/3 aspect-square rounded-xl overflow-hidden shadow-sm shrink-0">
                    <Image
                      width={384}
                      height={256}
                      loading="eager"
                      alt="Street food in Asia"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJSYhmx-d6lpVu8UJtTcJdiRgMXMfipAGOKHaLC1mCANXZDVfrg1qw7lb5KWH9hq3umsLw7TNpcFTrHLboBhqGl8rTvybbZMENDlfPshsrqd48ri25WK-eAWltMxZ4WrpE1wAmq5U0Pb-4_hznInHM6ht90-BNQ7hwwlcK7h6YCUPOw6WCIOXG6UE0SeX7FYAMJkdLfaicWQOv4VjcSCJoGE_VpmhlHYIAYf2TB70_uPS3S7kP1Vvw46dcRnh0tkIplc_9bHGo318"
                    />
                  </div>
                  <div className="space-y-2 text-center sm:text-left">
                    <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                      Culinary Trail
                    </span>
                    <h3 className="text-xl font-headline font-bold text-on-surface group-hover:text-primary transition-colors leading-snug">
                      Eating our way through Osaka&aposs back alleys
                    </h3>
                    <p className="text-sm text-on-surface-variant line-clamp-2">
                      How two foodies matched over a shared obsession with
                      authentic takoyaki.
                    </p>
                    <p className="text-xs text-on-surface-variant font-medium pt-2">
                      By David Chen
                    </p>
                  </div>
                </motion.article>

                <motion.article
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="group cursor-pointer flex flex-col sm:flex-row gap-6 items-center"
                >
                  <div className="w-full sm:w-1/3 aspect-square rounded-xl overflow-hidden shadow-sm shrink-0">
                    <Image
                      width={384}
                      height={256}
                      loading="eager"
                      alt="Paris streets"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbx8c0i4QxMxnYzVsMDHmFvYfS-VDO1_ZaZVL_q2VPhjXUqKx-6EhrL1HozH_NmhCZQuz4M57_Mgqfx9Fee5WzyQu4ArMQmnv6iWFZnMJVmTg-wqiD0arxdDYhWTfuHJk_rBrB-d1Jzm57mG4cHWr_KrLMdS7WKtWut_9Clz_c8cn4Co1Gi-2RNiG0vTp5DQ5CRc2z4HQzfhok3dhzpbDfRzYAmE7_iixzZFfiGTY61I5jttjpRvFRjo0ivgbFgx7Xn1dX2Oy0khM"
                    />
                  </div>
                  <div className="space-y-2 text-center sm:text-left">
                    <span className="text-xs font-bold text-tertiary uppercase tracking-wider">
                      Urban Exploration
                    </span>
                    <h3 className="text-xl font-headline font-bold text-on-surface group-hover:text-primary transition-colors leading-snug">
                      A slow month in Paris: Beyond the tourist traps
                    </h3>
                    <p className="text-sm text-on-surface-variant line-clamp-2">
                      Matching with a local architect changed how I saw the city
                      completely.
                    </p>
                    <p className="text-xs text-on-surface-variant font-medium pt-2">
                      By Emma Thompson
                    </p>
                  </div>
                </motion.article>

                <motion.article
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="group cursor-pointer flex flex-col sm:flex-row gap-6 items-center"
                >
                  <div className="w-full sm:w-1/3 aspect-square rounded-xl overflow-hidden shadow-sm shrink-0">
                    <Image
                      width={384}
                      height={256}
                      loading="eager"
                      alt="Camping under stars"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBakdvjEehsWhhRh-gIxh2eYKDA07IeWwpu2UrzlK1WCwljFaaPKEIh3QRn7ZHcqIi1lJG5Ocjg_VCp6_FuVSZwgjHLGHq_lKwgc2vm4j-YWGGGQ17zVv8KeLvU0KJhWKrvQlWfC8LdFaFuS4YYHwxI_zcYeCfpWFwhSQfaZt2Edu1j3lIiUiW1mS4JNxbbbQ2SieJVQNOJgQ03uM1i7J-jvYXW1Ng6BsstBiOBtjNLrK1HgOPsRBnD3gV2k5TgjfMIF7EJalrgZAs"
                    />
                  </div>
                  <div className="space-y-2 text-center sm:text-left">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">
                      Off Grid
                    </span>
                    <h3 className="text-xl font-headline font-bold text-on-surface group-hover:text-primary transition-colors leading-snug">
                      Van life convoy: 3 vans, 6 strangers, 1 desert
                    </h3>
                    <p className="text-sm text-on-surface-variant line-clamp-2">
                      When solo van-lifers team up for the ultimate Southwest
                      road trip.
                    </p>
                    <p className="text-xs text-on-surface-variant font-medium pt-2">
                      By The Nomads
                    </p>
                  </div>
                </motion.article>
              </div>
            </div>
            <div className="mt-12 text-center">
              <button className="px-8 py-3 border-2 border-outline-variant/30 rounded-full font-bold text-on-surface hover:bg-surface-container-high transition-colors">
                Read all stories
              </button>
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#f4f5f0] border-t border-outline-variant/10">
          <div className="max-w-7xl mx-auto px-8">
            <div className="mb-20 space-y-4 max-w-2xl">
              <span className="text-primary/90 font-headline font-bold tracking-widest text-xs uppercase">
                The Journey Guide
              </span>
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface">
                How we craft your connection
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              <div className="absolute top-[45%] left-0 w-full h-0.5 border-t-2 border-dashed border-primary/30 hidden md:block -translate-y-16"></div>
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-lg transition-transform hover:scale-110 duration-300">
                  <MapIcon />
                </div>
                <h3 className="text-2xl font-headline font-bold">
                  1. Define Your Vibe
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Whether it&aposs a quiet hike through Alpine meadows or a
                  bustling street-food crawl in Tokyo, set your pace and
                  priorities.
                </p>
              </div>
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 duration-300">
                  <Users2 />
                </div>
                <h3 className="text-2xl font-headline font-bold">
                  2. Meet the Match
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Our matching system suggests travelers with shared interests
                  and complementary temperaments for a seamless trip.
                </p>
              </div>
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 duration-300">
                  <CompassIcon />
                </div>
                <h3 className="text-2xl font-headline font-bold">
                  3. Wander Together
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Finalize your itinerary through our secure planning tools and
                  step into the world with a new friend by your side.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex justify-between items-end mb-16">
              <div className="space-y-4">
                <span className="text-tertiary font-headline font-bold tracking-widest text-xs uppercase">
                  Community Spotlight
                </span>
                <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface">
                  The Modern Explorers
                </h2>
              </div>
              <Link
                className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all duration-300"
                href="/findBuddies"
              >
                Meet everyone
                <ArrowRight />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-200">
              <div className="md:col-span-2 md:row-span-2 bg-surface-container-lowest rounded-2xl overflow-hidden relative group shadow-sm border border-outline-variant/10">
                <Image
                  width={384}
                  height={256}
                  loading="eager"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt="Portrait of a female traveler with mountains in background"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJr-4N2r4jLC0EkZvaxu8GjniYjNR6rcKPKh2K7SnsxOPI091W8eEU-sqjjvCqymVaVBrG5aWa0tZPlVsvPw0Oo6PAKSJIyuDyO3YiOc1A-OvErkb9FWQjGt8Of-peoG5l48sSPpSvVFFqb6RS2Mkv5ltBkJAuSo6jqGWWxeWOi8_Vp87IFKsBpKfCZS6PTReVPxv1vxSc0lAW-paXLZhhH1_66DYwRz7ZME7NsGA-C-35ebN3TM4sHBVD00ROZijEKy6ESN_aif8"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-10 text-white space-y-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-tertiary/80 backdrop-blur-md rounded-full text-xs font-bold tracking-wider">
                      HIKING
                    </span>
                    <span className="px-3 py-1 bg-secondary/80 backdrop-blur-md rounded-full text-xs font-bold tracking-wider">
                      ICELAND
                    </span>
                  </div>
                  <h3 className="text-4xl font-headline font-extrabold">
                    Elena, 29
                  </h3>
                  <p className="text-on-primary-container/90 max-w-sm text-lg leading-snug">
                    Looking for a partner to trek the Laugavegur trail this
                    August. Let&apos;s chase waterfalls together.
                  </p>
                  <button className="mt-4 px-6 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full font-bold transition-colors">
                    Connect
                  </button>
                </div>
              </div>

              <div className="md:col-span-2 bg-surface-container-lowest rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-sm border border-outline-variant/10 group">
                <div className="md:w-1/2 overflow-hidden">
                  <Image
                    width={384}
                    height={256}
                    loading="eager"
                    alt="Male traveler in a vibrant urban market"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD41cnwxnlUt0SctopC3epsz5Vwrl8q4ehvdfPTM00Aapgq59e0qmj9jM8rULL3r6UjBIoQgn-z0fOm5X-13yTswjsRw9xX5N6bPoGCtQw2-0qCqA71MSzpeRGYvvQJiCPoj4GpiCWC410Rs3H0Kaa3JaOL7T-FPCVmDiZDnRmPeeDZ2H5ksgc_PEysYKHMOSTFq8OA4Escg8UM_6Pzw5_dPdBJtDKm_7kBcrw_mV-nZbmU7M_YbCsMxnpcB_75bsPaGjiIa2bJNfo"
                  />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center space-y-4 bg-surface-container-lowest relative z-10">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold">
                      STREET FOOD
                    </span>
                  </div>
                  <h3 className="text-3xl font-headline font-extrabold">
                    Marcus, 34
                  </h3>
                  <p className="text-on-surface-variant text-base">
                    Passionate about finding the hidden culinary gems in
                    Vietnam. Next stop: Da Nang.
                  </p>
                  <button className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all w-fit mt-2">
                    View Profile
                    <ArrowRight />
                  </button>
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-2xl p-8 flex flex-col items-center text-center space-y-4 shadow-sm border border-outline-variant/10 hover:shadow-md transition-shadow">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-2 ring-4 ring-surface-container">
                  <Image
                    width={384}
                    height={256}
                    loading="eager"
                    alt="Profile of a woman with a backpack"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJzeBKApDRFzw7U6M2Kv6Ja7GU9KPJuGMaAMJXeCqfYEWDtvZcte65fEwFVMl4KzWF_HKaEl3i4m1EYXHyLy0UDZjdxWqw8YTBq9lEoDn9BgF0W6fkrvx4CBigf3kD0lcfFALFhCtundUMHPdW1msBSzgLYdmBe4PR3wgXs2vrpN_Ib9s2S2y904q0IfqurqOr7tmj4h_I4X5s1KWkfYl8gJyT1ZkVtPHQV4Uxe_8Hp2ioUia3WQr5j6F77pqlQa2htEKk97cYsNo"
                  />
                </div>
                <h4 className="text-xl font-headline font-bold">Sophia</h4>
                <p className="text-sm text-on-surface-variant font-medium">
                  Japan &amp; Korea • Fall 2024
                </p>
                <Button
                  size="xl"
                  variant="default"
                  className="active:scale-95 transition-all"
                >
                  Message
                </Button>
              </div>
              <div className="cta-gradient text-on-primary rounded-2xl p-8 flex flex-col justify-center space-y-6 shadow-xl relative overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <GlobeIcon />
                <div className="space-y-2">
                  <h4 className="text-2xl font-headline font-extrabold leading-tight">
                    Join 50,000+ Explorers Today
                  </h4>
                  <p className="text-base text-on-primary/90">
                    Your next adventure is waiting to be shared.
                  </p>
                </div>
                <Button className="border-0 bg-white text-primary font-bold py-3 rounded-full text-sm shadow-md hover:shadow-lg hover:bg-white transition-shadow relative z-10 w-full">
                  Sign Up Free
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 bg-surface-container-low px-8 overflow-hidden relative border-t border-outline-variant/10">
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <h2 className="text-5xl md:text-7xl font-headline font-extrabold text-on-surface tracking-tight">
              The world is wider when
              <span className="text-primary italic">shared.</span>
            </h2>
            <p className="text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              Get curated travel stories, trending expeditions, and personalized
              buddy matches delivered to your inbox every Sunday morning.
            </p>
            <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto mt-8">
              <Input
                placeholder="explorer@journal.com"
                type="email"
                className="h-15 ring-3 ring-primary/70 px-6 py-4 rounded-full font-medium shadow-inner"
              />
              <Button className="h-15 border-0 cta-gradient text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Subscribe
              </Button>
            </div>
          </div>

          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary-container/40 rounded-full blur-[100px]"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-container/30 rounded-full blur-[100px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-tertiary-container/10 rounded-full blur-[120px] -z-10"></div>
        </section>
      </main>
    </div>
  );
}
