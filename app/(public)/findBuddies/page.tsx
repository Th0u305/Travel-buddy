import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Calendar, 
  CalendarDays, 
  MapPin, 
  MessageCircle, 
  LayoutGrid, 
  List, 
  ChevronDown, 
  ShieldCheck 
} from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';

// Extracted data for clean mapping
const travelers = [
  {
    id: 1,
    name: "Marco Rossi",
    location: "Rome, Italy",
    level: "Expert",
    destination: "Patagonia Expedition",
    dates: "Oct 12 - 28",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuACqLdQUqbGv1QxF14NpRgXzI4zOTG0gPRS6rgYlepL8CTk7v80qc7Cfl8aiQP1nKjOO89N43yWZrPk9EpRP7pHz4x93gRK5ArkHqSqgne3xA9IZpR7xKrk1ZjxAG2puHGISUxj69ImKrOQFhNhjcjwss_gcHAIosOvFjTTvf4ZQCLpOPTQ4Cvqxf6fqf_NjRQx2-6IzPeu6hi3JTAtb_nvUvffdAgRGxJFaoYwQhiQobSU3sT7xmxggpKXJ8hH9iDDbNHTqdIGydY",
    tags: ["Hiking", "Nature", "Photography"]
  },
  {
    id: 2,
    name: "Elena Vance",
    location: "London, UK",
    level: "Local",
    destination: "Kyoto Temple Run",
    dates: "Nov 05 - 15",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKgFa-tc1R1N9aHh5tNvfO-VKh04nzreROx_5Fnu8f4cqEG8e5fJNqkgu42bN9r9Ug2ZT1ShCPLZVUYqqELODNo_bolYS8RZxYJzXailOMk3V4AzcIxirWH74skoH4r0E2pBLeEt_m2RQ-WTeMa7QeR6mb7YQSOeZBBy7a4Kru1b2CFh0IIVGJ_G9026zmDMgs64lG7XqxrAl-dwzzQx6B-tpQJBKqC9x7A6-qZl7BOeLyEZ1jtQT8lDdnVgZssoNAmfe0cjMQjEY",
    tags: ["Culture", "Foodie", "Art"]
  },
  {
    id: 3,
    name: "Sasha K.",
    location: "Vancouver, CA",
    level: "Explorer",
    destination: "Swiss Alps Loop",
    dates: "Sep 20 - 30",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmPdDFpJU-SZOf7-qDGlCxs4sj7askietiecRmhOjEgwU_bOVI2pFezV0BD-qv2yiZS8rvZ-9RVvNBneQxeCLq6Zha1Coaamq_PNJZawjg1-wDY8Uxb_KGv4AOE6xBesb5JKCZyE5NXdLWSg24DXi4ED_QuhyqOy6WnBcfUjNHOett4sf9N9OB9mOzV8OfRHVHz98e8WpYf74PY-9sJRPS6kW-kh-Lea9KaTTZVwCycZnsnGloS-jsdatwvs3HPj94KoZfvS5TpIA",
    tags: ["Hiking", "Luxury", "Spa"]
  },
  {
    id: 4,
    name: "David Chen",
    location: "San Francisco, US",
    level: "Newbie",
    destination: "Iceland Ring Road",
    dates: "Dec 01 - 12",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCepXoFL2-MjGyySpDoi4q6MG56MqVoDdOYamaopW6BnrYAwFUNHW2MGjmuzKlfsCqkYf3CjYMew7jlQO0DzQor5a7aAnAB3c1-I_kmw-htWpYLyfXGxcIG8cKHLidu3elzKpFrFoOY-BZ2S5wPoEn2Bm0gVmjcfvfPOi0jfQilyXHrGctnkXGqG0NjWdU34EY1Wnbe_V7cjPGNKEBvOucpyducNC6YTVm2ynSiStpyVRpSpjqbc3uo70KVH0r8tzlw3XAW57uSkRs",
    tags: ["VanLife", "Aurora", "Drives"]
  }
];

const interests = ["Hiking", "Photography", "Culture", "Foodie", "Solo Travel"];

export default function FindBuddies() {
  return (
   <>
      {/* Main Content */}
      <main className="pt-24 pb-12 px-8 max-w-[1440px] mx-auto min-h-screen">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar / Filters */}
          <aside className="w-full md:w-72 shrink-0 space-y-8">
            <Card className="border-none shadow-sm bg-muted/30">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">Filters</h2>
                <div className="space-y-6">
                  
                  {/* Destination */}
                  <div>
                    <label className="block text-sm font-bold text-muted-foreground mb-3">Destination</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-9 bg-background border-none rounded-xl" placeholder="Where to next?" />
                    </div>
                  </div>

                  {/* Dates */}
                  <div>
                    <label className="block text-sm font-bold text-muted-foreground mb-3">Date Range</label>
                    <div className="space-y-2">
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-9 bg-background border-none rounded-xl" placeholder="Start date" />
                      </div>
                      <div className="relative">
                        <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-9 bg-background border-none rounded-xl" placeholder="End date" />
                      </div>
                    </div>
                  </div>

                  {/* Interests */}
                  <div>
                    <label className="block text-sm font-bold text-muted-foreground mb-3">Interests</label>
                    <div className="flex flex-wrap gap-2">
                      {interests.map((interest, i) => (
                        <Badge 
                          key={interest} 
                          variant={i === 0 ? "default" : "secondary"} 
                          className="rounded-full px-3 py-1 cursor-pointer hover:opacity-80 transition-opacity"
                        >
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full rounded-full font-bold shadow-md">
                      Update Search
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Promo Card */}
            <div className="relative overflow-hidden rounded-xl bg-orange-100 p-6 text-orange-900 border border-orange-200">
              <div className="relative z-10">
                <h3 className="font-bold text-lg mb-2">Safety First</h3>
                <p className="text-xs leading-relaxed opacity-90">Always verify your travel buddies through our secure community protocol before meeting.</p>
                <button className="mt-4 text-xs font-bold underline decoration-2 underline-offset-4">Read Guide</button>
              </div>
              <ShieldCheck className="absolute -right-4 -bottom-4 h-32 w-32 opacity-10 rotate-12" />
            </div>
          </aside>

          {/* Feed */}
          <section className="">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight">Buddy Discovery</h1>
                <p className="text-muted-foreground mt-2 font-medium">124 travelers looking for partners in your region</p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="icon" className="rounded-full">
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground">
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Traveler Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {travelers.map((traveler) => (
                <Card key={traveler.id} className="overflow-hidden group hover:-translate-y-1 transition-all duration-300 border-none shadow-md hover:shadow-lg">
                  <div className="relative h-64 m-4 overflow-hidden rounded-lg">

                    <Image
                      width={500}
                      height={500}
                      className="object-cover" 
                      alt={`Portrait of ${traveler.name}`} 
                      src={traveler.image} 
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <div>
                        <h3 className="text-white font-bold text-xl">{traveler.name}</h3>
                        <div className="flex items-center text-white/90 text-xs font-medium mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {traveler.location}
                        </div>
                      </div>
                      <div className="bg-white/20 backdrop-blur-md rounded-full px-3 py-1 border border-white/30">
                        <span className="text-white text-[10px] font-bold uppercase tracking-wider">{traveler.level}</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="px-6 pb-6 pt-2">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Destination</span>
                        <span className="text-sm font-bold text-orange-600">{traveler.destination}</span>
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Dates</span>
                        <span className="text-sm font-bold">{traveler.dates}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {traveler.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-[11px] font-bold rounded-lg bg-muted">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-3">
                      <Button className="flex-1 rounded-full font-bold text-xs"><Link href="/findBuddies/profile/1">View Trip</Link></Button>
                      <Button variant="outline" size="icon" className="rounded-full aspect-square w-10 h-10 border-muted-foreground/30 text-orange-600 hover:bg-orange-50">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Button variant="secondary" className="rounded-full font-bold px-8 py-6 flex items-center gap-2 hover:bg-muted">
                Load More Travelers
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </section>
        </div>
      </main>
   </>
  );
}