import Link from "next/link";
import "@/src/css/locationLoader.css";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  CircleQuestionMark,
  Home,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { envVars } from "@/src/config/env";

export default function NotFound() {
  return (
    <main className="relative grow flex items-center justify-center h-screen overflow-hidden" style={{background: `url(https://res.cloudinary.com/${envVars.NEXT_PUBLIC_IMAGE_CLOUD_NAME}/image/upload/q_auto/f_auto/v1775199305/ktkmcvfosbwsgf9tfagc.jpg)` , backgroundSize: "cover"}}>
      {/* 404 Content Card */}
      <div className="relative z-10 w-full max-w-2xl px-6 bg-muted/80 backdrop-blur-sm rounded-4xl">
        <div className="glass-panel p-10 md:p-16 rounded-2xl shadow-sm text-center flex flex-col items-center gap-6">
          {/* Icon/Graphic */}
          <div className="mb-6 flex justify-center items-center w-20 h-20 rounded-full bg-secondary-container/50 text-secondary">
            <div className="loader"></div>
          </div>

          <div className="mb-4 text-on-surface-variant font-label font-semibold tracking-widest text-sm uppercase">
            Error 404
          </div>

          <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-on-surface mb-6 tracking-tight">
            Off the Map.
          </h1>

          <p className="font-body text-lg md:text-xl text-on-surface-variant mb-10 max-w-md mx-auto leading-relaxed">
            You&apos;ve found a scenic detour, but this path doesn&apos;t exist
            yet. Let&apos;s get you back to familiar terrain.
          </p>

          {/* Search Input Integration */}

          <Input
            className="h-15 rounded-full border-2 border-foreground"
            placeholder="Search Destinations"
            type="text"
          />

          {/* Navigation Actions */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-evenly">
            <Button className="w-50 h-20 rounded-full cursor-pointer">
              <Home className="mr-2" /> Back to Home
            </Button>
            <Button className="w-50 h-20 rounded-full cursor-pointer">
              <BookOpen className="mr-2" /> View Journeys
            </Button>
          </div>

          {/* Subtle Navigation Links (Secondary) */}
          <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4">
            <Link
              className="text-on-surface-variant hover:text-primary transition-colors font-label font-medium text-sm flex items-center"
              href="#"
            >
              <BookOpen className="mr-2" />
              Journal
            </Link>
            <Link
              className="text-on-surface-variant hover:text-primary transition-colors font-label font-medium text-sm flex items-center"
              href="#"
            >
              <Users className="mr-2" />
              Community
            </Link>
            <Link
              className="text-on-surface-variant hover:text-primary transition-colors font-label font-medium text-sm flex items-center"
              href="#"
            >
              <CircleQuestionMark className="mr-2" />
              Support
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-12 left-12 hidden lg:block">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-px bg-outline-variant/30"></div>
          <span className="text-on-primary font-label text-xs tracking-widest uppercase opacity-70">
            Lat: 46.8523° N | Long: 121.7603° W
          </span>
        </div>
      </div>
    </main>
  );
}
