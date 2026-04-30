"use client";

import { useState, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import {
  Menu as MenuIcon,
  Compass,
  MapPin,
  User,
  LogOut,
  Map,
  BadgeCheck,
  Home,
  Banknote,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLogout } from "@/src/tanstack/useMutation";
import { useUserStore } from "@/src/store/zustand.store";
import {
  Drawer,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Menu,
} from "../ui/menu";

export default function Navbar() {
  const router = useRouter();
  const { logoutMutate } = useLogout();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const location = usePathname();
  const { userData: user, isLoggedIn: isAuthenticated } = useUserStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location === "/home" || location === "/";

  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/trips", label: "Trips", icon: Map },
    { to: "/findBuddies", label: "Find Travel Buddy", icon: MapPin },
    { to: "/price", label: "Price", icon: Banknote },
  ];

  const logOUtFn = async () => {
    logoutMutate();
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? "bg-background/90 backdrop-blur-xl border-b shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div
          className={`text-2xl font-black tracking-tight  ${
            scrolled || !isHome ? "text-[#30332e]" : "text-white"
          }`}
        >
          <Link href="/">TravelBuddy</Link>
        </div>
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                location === link.to
                  ? "text-white bg-primary"
                  : !scrolled && isHome
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user?.email && user?.full_name && (
            <Link
              href="/create-travel-plan"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                location === "/create-travel-plan"
                  ? "text-white bg-primary"
                  : !scrolled && isHome
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              Create Travel Plan
            </Link>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            {isAuthenticated === true ? (
              <Menu>
                <DropdownMenuTrigger>
                  <div className="border hover:border-primary flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-primary transition-colors cursor-pointer">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user?.avatar_url || "#"} />
                      <AvatarFallback className="bg-background text-primary text-xs font-semibold">
                        {user?.full_name?.charAt(0)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <span
                      className={`text-sm font-medium ${!scrolled && isHome ? "text-white" : "text-foreground"}`}
                    >
                      {user?.full_name}
                    </span>

                    {user?.subscription_tier === "Premium" && (
                      <BadgeCheck className="w-5 h-5 text-primary stroke-amber-500" />
                    )}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuItem>
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center gap-2"
                    >
                      <User className="w-4 h-4" /> My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/dashboard/my-trips"
                      className="flex items-center gap-2"
                    >
                      <Map className="w-4 h-4" /> My Plans
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4" /> Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Button
                      onClick={() => {
                        logOUtFn();
                      }}
                      variant="ghost"
                      className="w-full justify-start text-destructive cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Log Out
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </Menu>
            ) : (
              <Button
                size="lg"
                onClick={() => router.push("/login")}
                className="rounded-xl px-6 cursor-pointer hidden md:block active:scale-95 transition-all"
              >
                Sign In
              </Button>
            )}
          </div>

          <Drawer position="right" open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger className="md:hidden">
              <MenuIcon className="w-5 h-5 cursor-pointer" />
            </DrawerTrigger>
            <DrawerPopup
              showCloseButton={true}
              showBar={false}
              variant="straight"
            >
              <DrawerHeader>
                <DrawerTitle>
                  <div className="p-6 border-b">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                        <Compass className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <span className="text-lg font-bold font-display">
                        TravelBuddy
                      </span>
                    </div>
                  </div>
                </DrawerTitle>
              </DrawerHeader>
              <DrawerPanel>
                <div className="flex flex-col h-screen">
                  <div className="flex-1 p-4 space-y-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.to}
                        href={link.to}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          location === link.to
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        <link.icon className="w-4 h-4" />
                        {link.label}
                      </Link>
                    ))}
                    {user?.email && user?.full_name && (
                      <Link
                        href="/create-travel-plan"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          location === "/create-travel-plan"
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        <Map className="w-4 h-4" /> Create Travel Plan
                      </Link>
                    )}
                  </div>
                  <div className="p-4 border-t">
                    {isAuthenticated === true ? (
                      <div className="space-y-3">
                        <Link
                          href="/profile"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted"
                        >
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={user?.avatar_url || "#"} />
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {user?.full_name?.charAt(0)?.toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">
                              {user?.full_name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {user?.email}
                            </p>
                          </div>
                        </Link>
                        <Button
                          onClick={() => {
                            logOUtFn();
                          }}
                          variant="ghost"
                          className="w-full justify-start text-destructive cursor-pointer"
                        >
                          <LogOut className="w-4 h-4 mr-2" /> Log Out
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="lg"
                        className="w-full rounded-xl cursor-pointer active:scale-95 transition-all"
                        onClick={() => router.push("/login")}
                      >
                        Sign In
                      </Button>
                    )}
                  </div>
                </div>
              </DrawerPanel>
            </DrawerPopup>
          </Drawer>
        </div>
      </div>
    </nav>
  );
}
