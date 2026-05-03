"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { Settings, User, Map, Home } from "lucide-react";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "@/src/components/ui/dashboardSidebar";
import { useUserStore } from "@/src/store/zustand.store";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout() {
  const { userData } = useUserStore();
  const links = [
    {
      label: "Home",
      href: "/",
      icon: <Home className="h-5 w-5 shrink-0 stroke-green-600" />,
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: <User className="h-5 w-5 shrink-0 stroke-blue-600" />,
    },
    {
      label: "My Trips",
      href: "/dashboard/my-trips",
      icon: <Map className="h-5 w-5 shrink-0 stroke-purple-600" />,
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5 shrink-0 stroke-yellow-600" />,
    }
  ];

  const [open, setOpen] = useState(false);

  return (
    <div className="absolute sm:relative">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col pt-10 overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: userData?.full_name || "",
                href: "/home",
                icon: (
                  <Image
                    src={
                      userData?.avatar_url ||
                      "https://res.cloudinary.com/jingalahuhu69/image/upload/v1776234313/wzzrakohxs76t6qygogb.png"
                    }
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="/home"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <Image
        src="/travel-bag.png"
        className="h-7 w-7 shrink-0 rounded-full"
        width={50}
        height={50}
        alt="Avatar"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        Travel Buddey
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <a
      href="/home"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <Image
        src="/travel-bag.png"
        className="h-7 w-7 shrink-0 rounded-full"
        width={50}
        height={50}
        alt="Avatar"
      />
    </a>
  );
};
