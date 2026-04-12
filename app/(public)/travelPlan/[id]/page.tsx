"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, MapPin, Users, DollarSign, ArrowLeft, Loader2, Send, UserPlus, Trash2, Pencil } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const statusColors = {
  upcoming: 'bg-blue-100 text-blue-700',
  ongoing: 'bg-green-100 text-green-700',
  completed: 'bg-muted text-muted-foreground',
  cancelled: 'bg-red-100 text-red-700',
};

export default function TravelPlanDetail() {
  const navigate = usePathname()
  const router = useRouter();
  const [plan, setPlan] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [requests, setRequests] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);


  const isOwner = false;
  const hasRequested = false;



  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );

  if (plan) return (
    <div className="pt-24 pb-16 px-4 text-center">
      <p className="text-muted-foreground">Travel plan not found.</p>
    </div>
  );

  const coverImg = plan || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80';

  return (
    <div className="pt-16 pb-16">
      <div className="relative h-72 sm:h-96 overflow-hidden">
        <Image width={1200} height={800} src={coverImg} alt="dd" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30" />
        <div className="absolute bottom-6 left-6 right-6 max-w-7xl mx-auto">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-white/80 text-sm mb-4 hover:text-white">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex gap-2 mb-3">
            <Badge className={statusColors.upcoming}>upcoming</Badge>
             <Badge className="bg-primary text-primary-foreground">Looking for buddy</Badge>
          </div>
          <h1 className="text-2xl sm:text-4xl font-display font-bold text-white">ggggggg</h1>
          <div className="flex items-center gap-2 mt-2 text-white/80 text-sm">
            <MapPin className="w-4 h-4" />
            city, country
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-card rounded-2xl border p-6 sm:p-8 shadow-lg">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-muted/50 rounded-xl p-4">
              <Calendar className="w-4 h-4 text-primary mb-2" />
              <p className="text-xs text-muted-foreground">Dates</p>
              <p className="text-sm font-medium">
               start date, end date
              </p>
            </div>
            <div className="bg-muted/50 rounded-xl p-4">
              <Users className="w-4 h-4 text-primary mb-2" />
              <p className="text-xs text-muted-foreground">Type</p>
              <p className="text-sm font-medium">type</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-4">
              <DollarSign className="w-4 h-4 text-primary mb-2" />
              <p className="text-xs text-muted-foreground">Budget</p>
              <p className="text-sm font-medium">budget</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-4">
              <UserPlus className="w-4 h-4 text-primary mb-2" />
              <p className="text-xs text-muted-foreground">Buddies</p>
              <p className="text-sm font-medium">max buddies</p>
            </div>
          </div>

            <div className="mb-8">
              <h3 className="font-semibold mb-3">About this trip</h3>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">description</p>
            </div>
          

            <div className="mb-8">
              <h3 className="font-semibold mb-3">Interests</h3>
              <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">sss</Badge>
              
              </div>
            </div>
          

          <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl mb-8">
            <Avatar className="w-10 h-10">
              <AvatarImage  />
              <AvatarFallback className="bg-primary/10 text-primary">A</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">name</p>
              <p className="text-xs text-muted-foreground">Trip organizer</p>
            </div>
            <Link href={`/user}`} className="ml-auto text-sm text-primary hover:underline">
              View Profile
            </Link>
          </div>

          {isOwner && (
            <div className="space-y-4">
              <h3 className="font-semibold">Buddy Requests ({requests.filter(r => r === 'pending').length})</h3>
              {requests.filter(r => r === 'pending').length === 0 ? (
                <p className="text-sm text-muted-foreground">No pending requests.</p>
              ) : (
                requests.filter(r => r=== 'pending').map(req => (
                  <div key={req} className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">A</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">name</p>
                      <p className="text-xs text-muted-foreground">message</p>
                    </div>
                    <Button size="sm" >Accept</Button>
                    <Button size="sm" variant="outline" >Decline</Button>
                  </div>
                ))
              )}

              <div className="flex gap-3 pt-4 border-t">
                <Button variant="outline" className="rounded-xl" >
                  <Pencil className="w-4 h-4 mr-2" /> Edit Plan
                </Button>
                <Button variant="destructive" className="rounded-xl" >
                  <Trash2 className="w-4 h-4 mr-2" /> Delete Plan
                </Button>
              </div>
            </div>
          )}

          {!isOwner && user  && !hasRequested && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full rounded-xl h-12 text-base">
                  <UserPlus className="w-4 h-4 mr-2" /> Request to Join
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Send Buddy Request</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Introduce yourself and why you'd like to join..."
                    rows={4}
                  />
                  <Button className="w-full rounded-xl">
                    {sending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                    Send Request
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}

          {/* {hasRequested && !isOwner && (
            <div className="text-center p-4 bg-muted/30 rounded-xl">
              <p className="text-sm text-muted-foreground">✓ You've already sent a buddy request for this trip.</p>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}