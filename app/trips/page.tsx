"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Plus, Loader2, Map } from 'lucide-react';
import Link from 'next/link';

export default function Trips() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);



  const upcoming = plans.filter(p => p === 'upcoming');
  const ongoing = plans.filter(p => p === 'ongoing');
  const completed = plans.filter(p => p === 'completed');



  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold">
              My Travel <span className="text-primary">Plans</span>
            </h1>
            <p className="mt-2 text-muted-foreground">Manage your upcoming and past trips.</p>
          </div>
          <Button asChild className="rounded-xl">
            <Link href="/create-plan">
              <Plus className="w-4 h-4 mr-2" /> Create New Plan
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <Tabs defaultValue="upcoming">
            <TabsList className="rounded-xl mb-6">
              <TabsTrigger value="upcoming" className="rounded-lg">Upcoming ({upcoming.length})</TabsTrigger>
              <TabsTrigger value="ongoing" className="rounded-lg">Ongoing ({ongoing.length})</TabsTrigger>
              <TabsTrigger value="completed" className="rounded-lg">Completed ({completed.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming"></TabsContent>
            <TabsContent value="ongoing"></TabsContent>
            <TabsContent value="completed"></TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}