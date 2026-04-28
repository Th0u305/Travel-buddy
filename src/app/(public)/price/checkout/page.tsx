"use client";

import { Button } from "@/src/components/ui/button";
import { CompassIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useCreateCheckoutSession } from "@/src/tanstack/useMutation";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function CheckoutContent() {
  const { createCheckoutSession, isPending } = useCreateCheckoutSession();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "annual";
  const isAnnual = plan === "annual";
  const router = useRouter();
  useEffect(() => {
    if (!plan) {
      return router.push("/price");
    }
  }, [plan, router]);
  
  return (
    <section className="mt-50 mb-20 max-w-3xl mx-auto bg-accent rounded-xl shadow-[0_16px_32px_rgba(48,51,46,0.04)] p-8 md:p-12 relative overflow-hidden">
        {/* Decorative backdrop */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-container rounded-full opacity-20 blur-3xl"></div>
        <h3 className="font-headline text-2xl font-bold text-on-background mb-8 relative z-10">
          Checkout Summary
        </h3>
        <div className="space-y-6 relative z-10">
          <div className="flex justify-between items-center bg-white p-4 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-on-primary">
                <CompassIcon />
              </div>
              <div>
                <p className="font-body font-bold text-on-background">
                  Explorer Pro
                  <span className="text-sm font-normal text-on-surface-variant">
                    ({isAnnual ? "Annual" : "Monthly"})
                  </span>
                </p>
                <p className="text-on-surface-variant max-w-xl">
                  Billed as ${isAnnual ? "144 yearly" : "15 monthly"}
                </p>
              </div>
            </div>
            <span className="font-body font-bold text-lg text-on-background">
              ${isAnnual ? "144.00" : "15.00"}
            </span>
          </div>

          <div className="pt-6 border-t border-outline-variant/15 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="font-body text-sm text-on-surface-variant">
                Total due today
              </p>
              <p className="text-2xl font-headline font-extrabold text-on-surface tracking-tight mb-2">
                ${isAnnual ? "144.00" : "15.00"}
              </p>
            </div>
            <Button
              size="lg"
              variant="secondary"
              className="rounded-full text-black active:scale-[0.97] transition-all"
              onClick={() => createCheckoutSession({ plan })}
              disabled={isPending}
            >
              {isPending ? "Connecting..." : "Complete Purchase"}
            </Button>
          </div>
        </div>
    </section>
  );
}

export default function Checkout() {
  return (
    <Suspense fallback={<div>Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
