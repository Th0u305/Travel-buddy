"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Filter, Grid, List } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import TripFilters from "./tripFilters";

export default function ExploreAdventures() {
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden min-h-100 flex items-center p-8 md:p-16">
          <div className="absolute inset-0 z-0">
            <Image
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
              data-alt="Breathtaking wide shot of misty mountain peaks at dawn with layered blue and purple hues"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDI6fa_S3J4qCxMgSFYVM06-SdAsyvoYOeNnMLffBj7wgv1Ey98QI0PSMdPXvStPA0Dcb3FeUyzRJumkwMN7TFUIlVXnlrZu5uPvnx1BbQUukCrvjQm4K_IOSxqpu0yRWmPE6QMo2KbJCR5CkqxGnFE3WiwCRUJB-T9QVPwMQlPhSgdU7F43v_tHLw8sAYEgEON7HLQgKm6WvosOefA_7bwHGzkhn29gOmY2ouS9PPTYWk_cVTsrLHRqj4G1JjJM1SYEzjlcyfwO1c"
              alt="Mountain landscape"
            />
            <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[2px]"></div>
          </div>
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1]">
              Where will you drift next?
            </h1>
            <div className="flex flex-col md:flex-row gap-2 bg-surface-container-lowest p-2 rounded-2xl shadow-xl">
              <div className="flex-1 flex items-center px-4 border-r border-outline-variant/20">
                <span className="material-symbols-outlined text-primary mr-3">
                  search
                </span>
                <input
                  className="w-full border-none focus:ring-0 bg-transparent py-4 text-on-surface"
                  placeholder="Search destinations or vibes..."
                  type="text"
                />
              </div>
              <button className="bg-bg-linear-to-r from-primary to-primary-dim text-white px-8 py-4 rounded-xl font-semibold transition-transform active:scale-95 shadow-lg shadow-primary/20">
                Find Adventures
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Layout: Filters + Grid */}
      <section className="px-6 py-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-72 space-y-8">
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <span className="material-symbols-outlined mr-2">
                filter_list
              </span>
              Refine Search
            </h3>

            {/* Destination Filter */}
            <div className="mb-6">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-3 block">
                Destination
              </label>
              <select className="w-full bg-surface-container-highest border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20">
                <option>All Continents</option>
                <option>South America</option>
                <option>Europe</option>
                <option>Asia</option>
              </select>
            </div>

            {/* Date Range Filter */}
            <div className="mb-6">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-3 block">
                Travel Window
              </label>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between px-4 py-3 bg-surface-container-highest rounded-xl text-sm">
                  <span>Upcoming (Next 3 mo)</span>
                  <span className="material-symbols-outlined text-sm">
                    calendar_month
                  </span>
                </button>
              </div>
            </div>

            {/* Travel Type Filter */}
            <div className="mb-6">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-3 block">
                Travel Type
              </label>
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold">
                  Group
                </button>
                <button className="px-4 py-2 bg-surface-container-highest text-on-surface-variant rounded-full text-xs font-bold hover:bg-stone-200">
                  Solo
                </button>
                <button className="px-4 py-2 bg-surface-container-highest text-on-surface-variant rounded-full text-xs font-bold hover:bg-stone-200">
                  Couple
                </button>
              </div>
            </div>

            {/* Budget Filter */}

          </div>
        </aside>

        {/* Trip Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <p className="text-on-surface-variant font-medium">
              Showing
              <span className="text-on-surface font-bold">24 Adventures</span>{" "}
              matching your criteria
            </p>
            <div className="flex gap-2">
              <Button size="lg" variant="outline" className="p-2 bg-surface-container-highest rounded-lg">
                <Grid />
              </Button>
              <Button size="lg" variant="outline" className="p-2 hover:bg-surface-container-highest rounded-lg">
                <List />
              </Button>

              <Drawer position="right" open={openFilter} onOpenChange={setOpenFilter}>
                <DrawerTrigger render={<Button variant="outline" />}>
                  <Filter />
                </DrawerTrigger>
                <DrawerPopup variant="straight" showCloseButton={true} showBar={false}>
                  <DrawerHeader>
                    <DrawerTitle>Filter</DrawerTitle>
                  </DrawerHeader>
                  <DrawerPanel>
                    <TripFilters />
                  </DrawerPanel>
                </DrawerPopup>
              </Drawer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Trip Card 1 */}
            <div className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <Image
                  width={1920}
                  height={1080}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  data-alt="Aerial view of jagged granite peaks and turquoise glacial lakes in Patagonia under bright clear sky"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVeEkE3lQve9OyTel8aRQteTqgBCgYlIcEHVwKRrYeb43MYF769cx___g_07LpgyH_dkub-g_aWPoh5HMiscq3cepgRG_8ZXCynbRfJoOZI7Nlb1RkTARmFHVMdrxgen5dxHiw8coCA_3nwXddiXeMs9JqIeJtuJaCQIQhhFbeexBHl_7zrt8b_3BPVoEDNepgLpUSmYvcbeyiw_WZ56EWDCUVd7D_WLloLDejoBBnHUmS1D15wzqLuBEp9TScuClkJNqL1pGWS0I"
                  alt="Patagonia"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <span
                    className="material-symbols-outlined text-[16px] text-tertiary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    group
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-tertiary">
                    3 Buddies Wanted
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-secondary uppercase tracking-widest">
                    Chile/Argentina
                  </span>
                  <span className="text-xs font-medium text-on-surface-variant">
                    Oct 12 - 28, 2024
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-on-surface group-hover:text-primary transition-colors">
                  Patagonia Expedition
                </h3>
                <p className="text-sm text-on-surface-variant line-clamp-2 mb-6">
                  Trek through the iconic peaks of Torres del Paine and gaze at
                  the Perito Moreno Glacier in this high-intensity photography
                  and hiking tour.
                </p>
                <div className="flex items-center justify-between border-t border-outline-variant/10 pt-4">
                  <div className="flex -space-x-2">
                    <Image
                      width={1920}
                      height={1080}
                      alt="Explorer 1"
                      className="w-8 h-8 rounded-full border-2 border-white"
                      data-alt="Portrait of a bearded man with a beanie and outdoorsy gear"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuApKQ37kUpYb2Xf6ON_q9TF9b6b9uSLQRJysm6TTbesyFLR5reUhU2DsnI8nw6_HizWR6-IMVRYEbnVSgeeetvlDWYofblnlY9ZldyGcspG6Ks2j61DwNG4OYbmC4fyvi7xUHetlZse7LUVzGrjvQK7YBuvHS_QORB0gjOrAl71gw1AiCNXDOEYFV6rH6d9-qypSM_YYLSAfcdMI4bzqGjtBCv-pSc7THxJap2qCmCndHRj1cqthCGvsOlEp3_f0EFHd7GSQWUEUpY"
                    />
                    <Image
                      width={1920}
                      height={1080}
                      alt="Explorer 2"
                      className="w-8 h-8 rounded-full border-2 border-white"
                      data-alt="Smiling woman with hiking equipment and a sunny disposition"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHiwVTHO_J6Cl0TS0w_HhCoayyebgkTYhYkb6kSslrEamOkzvf5lk7TowP2CvlZSygIe2RHJRuUKcIfQta73Ip5K3R68U8Bj32nrpDFzW1NftS8AFcljfLMjrCssx0xbxSz53U6OrT86WkHVPd7mb4A2d56JTGbyFxCmZg3oE_VMckJurG0YktX4auS40fuZ7cUGqq_arlUemVTY-ukcDgw9R4ekP5QXNWCz6qRP1kmklrqUvvBIRAML6SFIX2TXu9RMpG9Gs_hZg"
                    />
                    <div className="w-8 h-8 rounded-full bg-surface-container-high border-2 border-white flex items-center justify-center text-[10px] font-bold text-on-surface-variant">
                      +4
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-on-surface-variant">
                      Group Trip
                    </span>
                    <span className="material-symbols-outlined text-on-surface-variant">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trip Card 2 */}
            <div className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <Image
                  width={1920}
                  height={1080}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  data-alt="Golden hour light hitting the ancient wooden temples of Kyoto surrounded by autumn maple leaves"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvmu5gh6a4c_b6AncIP3AdyQUnH6SMc0q006g5Hpo_wmz2bxLYa-F1T7NnryVNQkALOBHExdgQ5ROb1fOEDWfa3DiHJ_j1Odg8PI6UZnnyzx2BbCbq5pChXAl3q610MZsseuPY6FpN1rGldRMv5Q2OYSvOumqw4KQeYDON-8GtPhhyB7ZhzZuf6Myg9o1XY4rELPc1Hw3I3e9zsrdlmHQHZEzMTi7CiP_H1xjMZ7kbSVY5X-vZbGfnjh5Z_Ck8ihvQACtwZ9719Gg"
                  alt="Kyoto"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <span
                    className="material-symbols-outlined text-[16px] text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    favorite
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                    Fully Booked
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-secondary uppercase tracking-widest">
                    Japan
                  </span>
                  <span className="text-xs font-medium text-on-surface-variant">
                    Nov 02 - 15, 2024
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-on-surface group-hover:text-primary transition-colors">
                  Kyoto Zen Retreat
                </h3>
                <p className="text-sm text-on-surface-variant line-clamp-2 mb-6">
                  Experience the silent beauty of ancient temples, private tea
                  ceremonies, and the vibrant colors of Kouyou in the heart of
                  Kyoto.
                </p>
                <div className="flex items-center justify-between border-t border-outline-variant/10 pt-4">
                  <div className="flex -space-x-2">
                    <Image
                      width={1920}
                      height={1080}
                      alt="Explorer 3"
                      className="w-8 h-8 rounded-full border-2 border-white"
                      data-alt="Calm man in casual linen clothing in a peaceful garden setting"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuByNr3VRvx5imkNDvWcFzHnDKqrA_mZdHzmsVJTe6Zbw5o53xKh_hyr87DcWWVx9QFH1Rn5mUSq2lPns6citM7znXwtCmntje7Fw1PQaLxpOjpMQi-GOb1T8pCfvEazWkkzExPV1frUNl0SQOm3zZFWpHhDRqgZJvUd2yIj8_3ta_lggia0hxh4HcVBxfSotOpoefso1DPp54km4KctSWRUhyuQlr7OJfBKdHQVwrcTEOQgqMmvzMZLiAU2H5EjlbU4m1-ZfNcOKkU"
                    />
                    <Image
                      width={1920}
                      height={1080}
                      alt="Explorer 4"
                      className="w-8 h-8 rounded-full border-2 border-white"
                      data-alt="Thoughtful woman with glasses in a traditional Japanese setting"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBD_kJApOwGnDTtKnDB6WbbqbmUWoVMdm3NUnq_HrfbtxdhxyS03Hl93l90ibq5lUo5umwkUJlW4TugU38brFiZO4-QyiZ5NAQR3nEytl0MX_MFNkEVnoZd2x5tlJwQK1dTGyEM3zo103dW6qRak3iSZ_nlK8RYyuWxAIDB2p7UIvOUrkB5oTA-M13T00ef6Wn5gN--Gdg1DKX-d5xAqY-_d3DzHbL5bhT1hJYSOpnUdOSeJ5HT4Gvn47omXNv34L2L_-zc8DuSXQc"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-on-surface-variant">
                      Couple Trip
                    </span>
                    <span className="material-symbols-outlined text-on-surface-variant">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trip Card 3 */}
            <div className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <Image
                  width={1920}
                  height={1080}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  data-alt="Sunset over the Serengeti plains with a single acacia tree silhouette against a burning orange sky"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuACZP9ML8Fmw7h_gcBgvPiZY3kxa51pggpCz5odHphzRDfRlg8kgTwL6dPyF7uhJ_lXnxlvGib49pfgfAB6HClO6AyIfahU6UmWmBKakhK06RKqRDjXIXBx5eVXq5uMp0YZJDBES7OxT6Z_pEVjJcZkdV__sZIze3gGrtMSMLaKcf1i3ylH35NSq1ojf7O8PEsMxwzcUYbwJ3MbXMENwa7XtN3JF5IcVYnOsQlWih3q2-jYyA7IvqRaitW-DS6gNLHbkYnsiyfwTTI"
                  alt="Serengeti"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <span
                    className="material-symbols-outlined text-[16px] text-tertiary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    person_search
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-tertiary">
                    1 Buddy Wanted
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-secondary uppercase tracking-widest">
                    Tanzania
                  </span>
                  <span className="text-xs font-medium text-on-surface-variant">
                    Dec 05 - 18, 2024
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-on-surface group-hover:text-primary transition-colors">
                  Serengeti Safari
                </h3>
                <p className="text-sm text-on-surface-variant line-clamp-2 mb-6">
                  A deep dive into the wild. Track the Great Migration and spend
                  nights under the stars in luxury eco-lodges across the
                  savannah.
                </p>
                <div className="flex items-center justify-between border-t border-outline-variant/10 pt-4">
                  <div className="flex -space-x-2">
                    <Image
                      width={1920}
                      height={1080}
                      alt="Explorer 5"
                      className="w-8 h-8 rounded-full border-2 border-white"
                      data-alt="Enthusiastic photographer with a camera and sun hat in a warm climate"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDk4S7x5qrk1Iqiw14ECgE1IbUhKcVwcoOeCFYEeaSyjGT-QLye3zFefTqKkky5bUk0bYsdid09v3sRxqNxxTcEdZ5mLwPEMBXsFP5LBu9tdveJJLImujoEAGaOoA0CtEbOx2oX97Ny5mGXcjDLKBnwuE-OSkCRrITv_h1kB0RAmG6pOVFQP6aEx4yd5golvuKvqid5Tdx7kiM6OMhCu1Fz7kJ99R95JjRU3_cLOyhdfhYQj-TcAE7vhXSxUNw5_rRfRmm3IvFx7aA"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-on-surface-variant">
                      Solo Trip
                    </span>
                    <span className="material-symbols-outlined text-on-surface-variant">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trip Card 4 */}
            <div className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <Image
                  width={1920}
                  height={1080}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  data-alt="Vibrant red train winding through lush green Swiss Alpine mountains and snow-capped peaks"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCc85gIw4Wj9f0HaJnZrrXzEGDRoohzMwV_s3VRh14JJRZPKaYARiMgEbHeU3CXvR_D_qP0IW1GeMtNAsq3Inl6C5rgmcyJaIUXf-q4zzPD0DLqElp50BA0Bsz_s0Kbb3MSjuMybMpL3b6fb-8mMUN_9RJPmWSvQ1YKRpsJGzTrzazL8XtnyEGBHzhFpa3_2YHel9A36NpZupzzpThThw4Iqa24jqiMEAjVkCezkUrWdy3BGv56SKVBfoTOU5WLxseeZuQjgqUnx-g"
                  alt="Swiss Alps"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <span
                    className="material-symbols-outlined text-[16px] text-secondary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    bolt
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-secondary">
                    Instant Join
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-secondary uppercase tracking-widest">
                    Switzerland
                  </span>
                  <span className="text-xs font-medium text-on-surface-variant">
                    Jan 10 - 20, 2025
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-on-surface group-hover:text-primary transition-colors">
                  Alpine Rail Adventure
                </h3>
                <p className="text-sm text-on-surface-variant line-clamp-2 mb-6">
                  Cross the heart of the Alps via the Glacier Express. Gourmet
                  dining meets jaw-dropping mountain views from panoramic
                  windows.
                </p>
                <div className="flex items-center justify-between border-t border-outline-variant/10 pt-4">
                  <div className="flex -space-x-2">
                    <Image
                      width={1920}
                      height={1080}
                      alt="Explorer 6"
                      className="w-8 h-8 rounded-full border-2 border-white"
                      data-alt="Happy young traveler with a scarf looking out of a train window"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlAAgr2Xc9VYbZAXtOJKme-rI408fVi8iHQHuraNZNY1Q_c_Fj52Fa6moLChjoV_tlbS4kRcu_fwoXRIJAlc2iDzXEw0A211OnOpa5iovmFhkFff1fW9WnVvAElKZjtvOCtyoJ5NYa0JVQwuCNJ5mZWMep_YMOinSakXSnA2jjW2eeLvlUt6xJ8jFi-fYjymmE7rLzjOILHlYety_yJ5NbfXsC-YRxpoxIKG5-so5uVhmEbKVFoPK3NgaZHuZxP7ZlAuihcPTVQo0"
                    />
                    <Image
                      width={1920}
                      height={1080}
                      alt="Explorer 7"
                      className="w-8 h-8 rounded-full border-2 border-white"
                      data-alt="Smiling man in winter clothing with a mountain backdrop"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBc8wMvaxRrNlVWpkBSxTmXnlvQo6BtmV58jtcu-bmr8HjlAKSCfcD6iGpcCLoK4bDEUJ-pOIcKJ2XNECjPLb074aXFSYNbaWUwfBAYppkma1H3_WGVQn7yHxENAel5f6W0QBO3-R5umFZ68gypIIkej0kOwYH-Q4eXEDWnV0HhIgFZkv7BmPQ23veg50uztNKhy-wSvlkq7ROMlcSdc3aZQAYcyu7KdiIv2ZKq4iH8kowyBGsWF70_2wOqaoeG8inoWdnobaIKxTA"
                    />
                    <div className="w-8 h-8 rounded-full bg-surface-container-high border-2 border-white flex items-center justify-center text-[10px] font-bold text-on-surface-variant">
                      +12
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-on-surface-variant">
                      Group Trip
                    </span>
                    <span className="material-symbols-outlined text-on-surface-variant">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <button className="px-10 py-4 bg-surface-container-high text-on-surface font-bold rounded-2xl hover:bg-stone-200 transition-colors inline-flex items-center gap-2">
              Discover More Journeys
              <span className="material-symbols-outlined">expand_more</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
