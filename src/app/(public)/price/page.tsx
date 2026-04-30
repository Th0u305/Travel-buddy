"use client";

import {
  BoltIcon,
  BookOpen,
  CheckCircle,
  MountainIcon,
  User2,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Switch } from "@/src/components/ui/switch";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/src/store/zustand.store";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog";

export default function PricingAndCheckout() {
  const [isAnnual, setIsAnnual] = useState(true);
  const router = useRouter();
  const { userData } = useUserStore();
  const [open, setOpen] = useState(false);

  const handlePrice = () => {
    if (!userData) {
      return toast.error("Please login to continue");
    }

    if (!userData?.is_profile_completed) {
      return setOpen(true);
    }

    if (userData.subscription_tier && userData.subscription_expires_at) {
      const expiryDate = new Date(userData.subscription_expires_at);
      const today = new Date();
      if (expiryDate.getTime() > today.getTime()) {
        toast.dismiss();
        return toast.error("You already have an active subscription.");
      }
    }

    return router.push(
      `/price/checkout?plan=${isAnnual ? "annual" : "monthly"}`,
    );
  };

  return (
    <main className="grow w-full max-w-7xl mx-auto px-6 py-12 md:py-20">
      <header className="text-center mb-16 md:mb-24 mt-26">
        <h1 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight mb-2">
          Chart Your Next Journey
        </h1>

        <p className="font-body text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto">
          Join our community of explorers. Choose a plan that fits your
          adventure style, from weekend wandering to professional expeditions.
        </p>
      </header>
      {/* Toggle Switch */}
      <div className="flex justify-center items-center gap-4 mb-16">
        <span className="font-label text-sm font-semibold text-on-surface">
          Monthly
        </span>
        <Switch
          className="data-unchecked:bg-secondary"
          checked={isAnnual}
          onCheckedChange={setIsAnnual}
        />
        <span className="font-label text-sm font-semibold text-primary">
          {isAnnual ? "Annual" : "Monthly"}
          <span className="text-xs text-on-surface-variant ml-1">
            (Save 20%)
          </span>
        </span>
      </div>

      {/* Pricing Grid (Asymmetric Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-24">
        {/* Plan 1: Wanderer */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-8 md:p-10 relative mt-4 bg-accent">
          <div className="mb-8">
            <h2 className="font-headline text-2xl font-bold text-on-background mb-2">
              Wanderer
            </h2>
            <p className="font-body text-on-surface-variant">
              For the casual weekend explorer.
            </p>
          </div>
          <div className="mb-8">
            <span className="text-4xl font-headline font-extrabold text-on-surface tracking-tight mb-2">
              $0
            </span>
            <span className="font-label text-on-surface-variant">
              / forever
            </span>
          </div>
          <ul className="space-y-6 mb-10">
            <li className="flex items-start gap-4">
              <CheckCircle />
              <span className="font-body text-on-surface">
                Basic trip creation (up to 5 Trips)
              </span>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle />
              <span className="font-body text-on-surface">
                Access to public community forums
              </span>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle />
              <span className="font-body text-on-surface">
                Standard mapping tools
              </span>
            </li>
          </ul>
          <Button
            size="xl"
            className="bg-white text-black hover:text-white w-full rounded-full hover:shadow-lg hover:opacity-95 transition-all"
          >
            Start Wandering
          </Button>
        </div>

        {/* Plan 2: Explorer Pro (Featured) */}
        <div className="bg-gray-200 lg:col-span-7 bg-surface-container-low rounded-xl p-1 shadow-[0_32px_32px_rgba(48,51,46,0.06)] relative z-10 lg:-mt-4">
          <div className="bg-surface-container-lowest rounded-[1.375rem] p-8 md:p-12 h-full">
            <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
              <div>
                <h2 className="font-headline text-3xl font-bold text-primary mb-2">
                  Explorer Pro
                </h2>
                <p className="font-body text-on-surface-variant">
                  For those who live to chart new territory.
                </p>
              </div>
              <div className="text-right">
                <span className="text-4xl font-headline font-extrabold text-on-surface tracking-tight mb-2">
                  ${isAnnual ? "12" : "15"}
                </span>
                <span className="font-label text-on-surface-variant block mt-1">
                  / month{isAnnual ? ", billed annually" : ""}
                </span>
              </div>
            </div>
            <div className="h-px w-full bg-surface-container-high my-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-12">
              <div className="flex items-start gap-4">
                <MountainIcon />
                <span className="font-body text-on-surface font-medium">
                  Unlimited trip creation &amp; archives
                </span>
              </div>
              <div className="flex items-start gap-4">
                <User2 />
                <span className="font-body text-on-surface font-medium">
                  Priority buddy matching algorithm
                </span>
              </div>
              <div className="flex items-start gap-4">
                <BookOpen />
                <span className="font-body text-on-surface font-medium">
                  Exclusive expert travel guides
                </span>
              </div>
              <div className="flex items-start gap-4">
                <BoltIcon />
                <span className="font-body text-on-surface font-medium">
                  Offline maps &amp; trail access
                </span>
              </div>
            </div>
            <Button
              size="xl"
              variant="default"
              className=" w-full rounded-full hover:shadow-lg hover:opacity-95 transition-all"
              onClick={() => handlePrice()}
            >
              Upgrade to Pro
            </Button>
          </div>
        </div>
      </div>

      {open && (
        <AlertDialog open={open}>
          <AlertDialogPopup>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-red-500">
                Profile Incomplete
              </AlertDialogTitle>
              <AlertDialogDescription className="text-md">
                Please complete your profile before purchasing a plan
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogClose
                render={
                  <Button
                    size="lg"
                    onClick={() => {
                      setOpen(false);
                      router.push("/dashboard/profile");
                    }}
                    variant="ghost"
                  />
                }
              >
                Close
              </AlertDialogClose>
            </AlertDialogFooter>
          </AlertDialogPopup>
        </AlertDialog>
      )}
    </main>
  );
}
