"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Menu, Compass, MapPin, User, LogOut, LayoutDashboard, Map, BadgeCheck, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useGetUserProfile from '@/src/tanstack/useQuery';
import { useLogout } from '@/src/tanstack/useMutation';
import { useUserStore } from '@/src/store/zustand.store';

export default function Navbar() {

  const router = useRouter();
  const { userProfileRefetch } = useGetUserProfile(); 
  const {logoutMutate} = useLogout();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const location = usePathname();
  const {userData: user, isAuthenticated, removeUserData} = useUserStore()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location === '/';
  const isAdmin = true;

  const navLinks =  [
    { to: '/', label: 'Home', icon: Home },
    { to: '/trips', label: 'Trips', icon: Map },
    { to: '/findBuddies', label: 'Find Travel Buddy', icon: MapPin },
  ]

  const logOUtFn = async()=>{
    logoutMutate()
    await userProfileRefetch()
    // removeUserData()
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled || !isHome
        ? 'bg-background/90 backdrop-blur-xl border-b shadow-sm'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className={`text-lg font-bold font-display tracking-tight ${
              !scrolled && isHome ? 'text-white' : 'text-foreground'
            }`}>
              TravelBuddy
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link,i) => (
              <Link
                key={i}
                href={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  location === link.to
                    ? 'text-primary bg-background'
                    : !scrolled && isHome
                      ? 'text-white/80 hover:text-white hover:bg-white/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            { isAuthenticated === true ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-muted/50 transition-colors">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user?.data?.avatar_url || user?.data?.profile_picture || "#"}/>
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                        {user?.data?.full_name?.charAt(0)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>


                    <span className={`text-sm font-medium ${!scrolled && isHome ? 'text-white' : 'text-foreground'}`}>
                      {user?.data?.full_name}
                    </span>


                     <BadgeCheck className="w-4 h-4 text-primary" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-2">
                      <User className="w-4 h-4" /> My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/my-plans" className="flex items-center gap-2">
                      <Map className="w-4 h-4" /> My Plans
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="flex items-center gap-2">
                        <LayoutDashboard className="w-4 h-4" /> Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Button onClick={()=> {logOUtFn()}} variant="ghost" className="w-full justify-start text-destructive cursor-pointer" >
                      <LogOut className="w-4 h-4 mr-2" /> Log Out
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => router.push('/login')} className="rounded-xl px-6">
                Sign In
              </Button>
            )}
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <button className={`p-2 rounded-lg cursor-pointer ${!scrolled && isHome ? 'text-white' : 'text-foreground'}`}>
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                      <Compass className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="text-lg font-bold font-display">TravelBuddy</span>
                  </div>
                </div>
                <div className="flex-1 p-4 space-y-1">
                  {navLinks.map(link => (
                    <Link
                      key={link.to}
                      href={link.to}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        location === link.to
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <link.icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="p-4 border-t">
                  { isAuthenticated === true ? (
                    <div className="space-y-3">
                      <Link href="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={user?.data?.avatar_url || user?.data?.profile_picture || "#"}/>
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">{'U'}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{'U'}</p>
                          <p className="text-xs text-muted-foreground">{'U'}</p>
                        </div>
                      </Link>
                      <Button onClick={()=> {logOUtFn()}} variant="ghost" className="w-full justify-start text-destructive cursor-pointer" >
                        <LogOut className="w-4 h-4 mr-2" /> Log Out
                      </Button>
                    </div>
                  ) : (
                    <Button className="w-full rounded-xl cursor-pointer" onClick={()=> router.push('/login')}>
                      Sign In
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}