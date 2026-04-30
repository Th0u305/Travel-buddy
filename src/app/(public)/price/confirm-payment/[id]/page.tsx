"use client";

import { Button } from "@/src/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useConfirmPayment } from "@/src/tanstack/useMutation";
import { useUserStore } from "@/src/store/zustand.store";

const Page = () => {
  const params = useParams();
  const { confirmPaymentMutate, isPending, isSuccess } = useConfirmPayment();
  const { userData } = useUserStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "annual";
  const hasConfirmedRef = useRef(false);
  const isRedirectingRef = useRef(false);

  useEffect(() => {
    // 1. Prevent multiple redirects
    if (isRedirectingRef.current) return;

    // 2. Redirect if no user data
    if (!userData && params.id) {
      isRedirectingRef.current = true;
      router.push("/");
      return;
    }

    // 3. Redirect on success
    if (isSuccess) {
      isRedirectingRef.current = true;
      return;
    }

    // 4. Prevent duplicate confirmation calls
    if (hasConfirmedRef.current) return;

    // 5. Confirm payment if we have session ID
    if (params.id && !isPending && !isSuccess) {
      hasConfirmedRef.current = true;

      confirmPaymentMutate(
        { session_id: params.id as string, plan: plan as string },
        {
          onSuccess: () => {},
        },
      );
    }
    setTimeout(() => {
      router.push("/");
    }, 1000);
  }, [
    params.id,
    isPending,
    isSuccess,
    confirmPaymentMutate,
    userData,
    router,
    plan,
  ]);

  return (
    <main className="w-full max-w-lg mx-auto relative z-10 pt-20 pb-20 mt-20">
      <div className=" rounded-xl p-8 shadow-xl flex flex-col items-center text-center relative overflow-hidden">
        {/* Decorative Background Element */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-secondary/10 rounded-full blur-xl"></div>
        {/* Success Icon */}
        <div className="w-24 h-24 bg-secondary-container rounded-full flex items-center justify-center mb-8 relative z-10 shadow-[0_16px_24px_rgba(48,51,46,0.04)]">
          <CheckCircle className="text-on-secondary-container" size={48} />
        </div>
        {/* Headlines */}
        <h1 className="text-4xl sm:text-3xl font-headline font-extrabold text-on-surface tracking-tight">
          Adventure Confirmed!
        </h1>
        <p className="font-body text-on-surface-variant text-md mb-8 relative z-10">
          You&apos;re officially ready to explore the wild.
        </p>
        {/* Subscription Details Card */}
        <div className="w-full bg-[#f4f5f0] rounded-lg p-6 mb-8 text-left relative z-10 flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-surface-dim/20 pb-4">
            <span className="font-label text-sm text-on-surface-variant uppercase tracking-wider">
              Plan
            </span>
            <span className="font-headline font-semibold text-primary">
              Explorer Pro
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-label text-sm text-on-surface-variant uppercase tracking-wider">
              Order Number
            </span>
            <span className="font-body font-medium text-on-surface">
              #ME-8472-X9
            </span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="font-label text-sm text-on-surface-variant uppercase tracking-wider">
              Total Billed
            </span>
            <span className="font-headline font-bold text-on-surface">
              $120.00
              <span className="text-xs font-normal text-on-surface-variant">
                / yr
              </span>
            </span>
          </div>
        </div>
        {/* Actions */}
        <div className="w-full flex flex-col gap-4 relative z-10">
          <Button
            size="xl"
            variant="default"
            className="rounded-full active:scale-95 transition-all"
          >
            Go to Dashboard
          </Button>
          <Link href="#">View My Trips</Link>
        </div>
      </div>
    </main>
  );
};

export default Page;
