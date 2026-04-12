import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Send, ArrowRight } from "lucide-react";
import Image from 'next/image';

// Extracted data for clean mapping
const interests = [
  "High Alpine", 
  "Luminescence", 
  "Slow Travel", 
  "Astrophotography", 
  "Wild Camping"
];

const stats = [
  { value: "14", label: "Countries" },
  { value: "8.4k", label: "Miles Hiked" }
];

const trips = [
  {
    id: 1,
    title: "The Dolomite Circuit",
    dates: "May 12 - 24",
    status: "Ongoing",
    statusColor: "bg-orange-100 text-orange-700 hover:bg-orange-100",
    description: "Exploring the Alta Via 1 trail through the heart of the Italian Alps. Currently at Refugio Lagazuoi.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqUGmrbByLcpUVKDmhCgXWrck4_SLsZEjuWSj5-L0gr4sxw_oIp-BHYswIleLWR1Jw0RQmXQ71b5W7b_9VF6G-WuVV0HBdkBST-B9O0_b4PlykO5JVyaZR5hziR9ILnO4K2VjkAXyZdOpRRlxumJBMoQqmKRh-DwCylzzxDwIO_7jgQj-lF0HLkEMKBvckgOM7nheumNYllM_tK1yp4Q8mwRlC7jkNxU5XxALNhnPseYD6Qao0B-PHzYP0vZXuvm5Y3wyVcASSSDY",
    participants: 3,
    action: "Join Trip",
    showActionIcon: true
  },
  {
    id: 2,
    title: "Icelandic Ring Road",
    dates: "August 05 - 15",
    status: "Planned",
    statusColor: "bg-blue-100 text-blue-700 hover:bg-blue-100",
    description: "A photographic journey across the South Coast to Jökulsárlón. Focusing on long exposure work.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkILsyX4q_1o4crAXADV4BsEFoxyNp_o28gqsCLQ4XvmrRRP8XIHD7aElmadMgjNOoGgmXyf30bX66EWqE1ICOi0-S_ummTIVLZ5eMpWygCILoXTZBFOvJlOmaTykha6AnsUU8Aa94rfJDNjV3a6QW3Fj4VAGQoG1O2TzKRsSTsNAL4IkKjcjjmm-jLFqWceSQxNxC9Kuq44-uKePDi69wRQ4xt24vrMZgmwLE50PCFLXjGB7hfHYwawy-g40HNCQWNFSmEs1OCkg",
    note: "Awaiting confirmations",
    action: "Details",
    showActionIcon: false
  }
];

const gallery = [
  { id: 1, src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCatxP_EMTjZ_qTz7R9vHAx0emN61xXHOwiX_Cz-LZhJ5Ulmz2c-4Bb0uxoCxWnLC-7PI94FytzKBm6t_6QNNjxbZd-Sub0GL56_FRQE0maMW4cxGfgwxsqU4j1VDlYQeA_ygQyu69ip9YKw3f8vOhjFpOouhBzCESDQFQtMvisUxZSIJ52_HmG3xLHTKwqbClgNRHcMUSrLJm4IvBv1c0j9CFV2jHVILUITy2cJ_ulaDxnr-lwMqsTSWu9gdtUuduwmeDOSKVudMg", span: "col-span-2 row-span-2", label: "Banff, 2023" },
  { id: 2, src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_pFANzmEpmUGHN6Xfo-f4sTIrxFujIy_nu2QQDP1G31TUQ63rTcNT-gELvjFtBlqbZ1oVxoF8vvTe-YM6qwXvNn_Pb_xN2kxNmpDD2MmO-3GmZZYngFANHRyygNkuRAVgN-9M-umt5I6AcVG-vlt_EWFYGpG_oeQkbT42GyliqNU7VXeMrKblstBSGL-mEGtMpB0xy0BnrH6d1ws9C4Pin1kyXFq-c4CQW8A_mjuv-99Emf53xR6nx_-3htsO36pyMlOT3QTbKfs", span: "col-span-1 row-span-1" },
  { id: 3, src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBm5lzeuEAOezvvAE6OhZueJjSh4C9z5Dw-jym6Kscw10G8ryr64DhFszbmwsYrlgGVyWfKaWQXx1BfVE_hbJiB_3STPAIggYEu6qXDcKLBKSKGhSR1NNN2_iIWdbMMedEZk07Ft5puvs0Zjs63Y6o6_GHYyLXYQFl8DMxr6fntrARe_nbxAYYz7wEDFLMD-Ma9bRApw7uqDJiTOOgXFGqwkGwlyagb8mbbH0qwgypcyugcLfEBu_VYOc99OGaEtxIqrFnZRQqoTcI", span: "col-span-1 row-span-1" },
  { id: 4, src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhFGLqShzGfwLjF-aq5hFhkPkGvC4XP_n0vGvvmJMX4S_FXEKKV2XrRtQmbC3af14wzEEVZxpVT4iq_Ud7Axcjj95XlpFy19uu-vznYfyh-EZFmmLSIfy981_ZglpKD566y1Te-b5i0tCh3IogP92ozD0tcauX50rQLMfDB9VY2bKAbt0IVQZvmuPRTJcXb08GR8-oCWr_BCZeS0odiiIqD4DyYJOrzDJu7W1FjcPq5FKPPXZUXCB4UmXukYpygUrHTGbebTf6A_g", span: "col-span-2 row-span-1", label: "Pyrenees, 2024" }
];

export default function Profile() {
  return (
    <div className="bg-background text-foreground font-sans antialiased min-h-screen">
      


      <main className="pt-16 min-h-screen">
        {/* Hero Section: Cover & Profile */}
        <div className="relative w-full h-112.5 overflow-hidden">
          <Image 
            width={500}
            height={500}
            alt="Misty mountain range at dawn" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3wVUWq6TRGw3cY-dQcy5B5e3B322xplqwUX63J5lMwn0VLRz0etbcHKTImRPY_dGIik3wE-uHvC5hnWSQ0RYVNjOG7hUsP5V2uxij3Eb9E02JWwtTy50B6KELGv68Mte-75c_a2TdhklS9AP5UJGXX1RGPYLIjrdkSoDBQ5JZnet1xuUr3IbxNlFXZjl3VUao1Lijs4bt6xKFM_9GpDQ8qBMmp83wdVoxzgkxTwLt8GZt6igxCpfQcs6Lf_AY3YwveR9eYVMuot8"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-6">
              
              <div className="relative">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-xl border-4 border-background overflow-hidden shadow-xl bg-background">
                  <Image 
                    width={500}
                    height={500}
                    alt="Profile of Elena Rodriguez" 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDf7XH1ozfPb_T7EFskMvlb1YbHb6nWxF4fY4g6oNaKScVCbG-EU4OBSp-qM9yqLmAVTdE7gjGGSEGwBNilzi1xBypp5NCZrRyna3RfvqhBt1k8B-OLwMsUfYaBSht5SWYLoATYESFAIPFxN9JBTX3qkLffdrGrlmbsbK71XfzTcyurowlsY57awnsC4Xk-KahHSkst1EUwLPuAjE_MPJHTQMEw3rbsqIsyueMGZO68KlO9W4RHSXDivxojBurNcqxjc0OpLzAksBA"
                  />
                </div>
              </div>
              
              <div className="flex-1 mb-2">
                <h1 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight mb-2">Elena Rodriguez</h1>
                <div className="flex items-center gap-3 text-white/90 font-medium">
                  <MapPin className="h-4 w-4" />
                  <span className="text-lg">Barcelona, Spain</span>
                  <span className="mx-2 opacity-50">•</span>
                  <span className="text-lg">42 Expeditions</span>
                </div>
              </div>
              
              <div className="mb-2">
                <Button size="lg" className="bg-linear-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white rounded-full font-semibold text-lg flex items-center gap-3 shadow-lg h-14 px-8">
                  <Send className="h-5 w-5" />
                  Message to Plan
                </Button>
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
                  <h3 className="text-xl font-bold mb-4">About Elena</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Documentary photographer and alpine enthusiast. My life is a series of waypoint markers across the Pyrenees and beyond. I seek the quiet moments between the peaks—the golden hour light on a granite face and the shared coffee at 5 AM.
                  </p>
                </CardContent>
              </Card>

              <section>
                <h3 className="text-xl font-bold mb-6">Interests</h3>
                <div className="flex flex-wrap gap-3">
                  {interests.map((interest, index) => (
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

              <Card className="bg-muted/50 border-none shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">Stats</h3>
                  <div className="grid grid-cols-2 gap-6">
                    {stats.map((stat, index) => (
                      <div key={index}>
                        <div className="text-orange-600 text-3xl font-bold">{stat.value}</div>
                        <div className="text-muted-foreground text-xs uppercase font-bold tracking-widest mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Trips & Gallery */}
            <div className="lg:col-span-8 space-y-16">
              
              {/* Current & Upcoming Trips */}
              <section>
                <div className="flex justify-between items-end mb-8">
                  <h2 className="text-3xl font-bold">Current & Upcoming Trips</h2>
                  <a className="text-orange-600 font-bold text-sm hover:underline" href="#">View All Itineraries</a>
                </div>
                
                <div className="space-y-6">
                  {trips.map((trip) => (
                    <div key={trip.id} className="group relative flex flex-col md:flex-row bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md border transition-shadow duration-300">
                      <div className={`w-full md:w-64 h-48 overflow-hidden ${trip.status === 'Planned' ? 'opacity-90' : ''}`}>
                        <Image
                          width={500}
                          height={500}
                          alt={trip.title} 
                          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${trip.status === 'Planned' ? 'grayscale group-hover:grayscale-0' : ''}`} 
                          src={trip.image}
                        />
                      </div>
                      <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <Badge className={`${trip.statusColor} px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border-none`}>
                              {trip.status}
                            </Badge>
                            <span className="text-muted-foreground text-sm font-medium">{trip.dates}</span>
                          </div>
                          <h4 className="text-xl font-bold mb-2">{trip.title}</h4>
                          <p className="text-muted-foreground text-sm line-clamp-2">{trip.description}</p>
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between">
                          {trip.participants ? (
                            <div className="flex -space-x-2">
                              {[1, 2].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted"></div>
                              ))}
                              <div className="w-8 h-8 rounded-full border-2 border-background bg-orange-600 text-white text-[10px] flex items-center justify-center font-bold">
                                +{trip.participants}
                              </div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-xs italic">{trip.note}</span>
                          )}
                          
                          <Button variant={trip.showActionIcon ? "ghost" : "outline"} className={`font-bold text-sm ${trip.showActionIcon ? 'text-orange-600 hover:text-orange-700 hover:bg-orange-50 group/btn' : 'rounded-full'}`}>
                            {trip.action}
                            {trip.showActionIcon && <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Travel Gallery: Bento Style */}
              <section>
                <div className="flex justify-between items-end mb-8">
                  <h2 className="text-3xl font-bold">Travel Gallery</h2>
                  <Button variant="secondary" className="rounded-full font-bold">Open Portfolio</Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 h-150">
                  {gallery.map((item) => (
                    <div key={item.id} className={`${item.span} rounded-xl overflow-hidden relative group bg-muted`}>
                      <Image
                        width={500}
                        height={500}
                        alt="Gallery image" 
                        className="object-cover group-hover:scale-105 transition-transform duration-700" 
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