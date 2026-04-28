"use client";
import { ArrowLeft, Info, Shield, X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useUserStore } from "@/src/store/zustand.store";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const CancelPayment = () => {
  const { userData } = useUserStore();
  const router = useRouter();
  const params = useParams();
  useEffect(() => {
    if (!userData && params.id) {
      router.push("/");
    }
  }, [userData, params.id, router]);
  return (
    <main className="grow flex items-center justify-center p-6 relative overflow-hidden pt-20 pb-20 mt-20">
      <div className=" w-full max-w-lg rounded-xl shadow-2xl relative z-10 overflow-hidden border border-outline-variant/15 backdrop-blur-xl">
        <div className="p-10 flex flex-col items-center text-center">
          <div className="w-24 h-24 mb-8 rounded-full bg-red-300 flex items-center justify-center shadow-inner relative">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-tertiary opacity-30 animate-[spin_20s_linear_infinite]"></div>
            <X className="w-10 h-10 stroke-green-500" />
          </div>
          <h1 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight">
            Payment Canceled
          </h1>
          <p className="font-body text-base text-on-surface-variant mb-8 max-w-sm leading-relaxed">
            Your exploration is momentarily on hold. Don&apost worry,
            <strong className="text-on-surface font-semibold">
              no charges were made
            </strong>
            to your account. You can safely resume whenever you&aposre ready.
          </p>
          <div className=" bg-[#f4f5f0] w-full rounded-lg p-5 mb-8 flex flex-col gap-3 items-start text-left border border-outline-variant/10">
            <div className="flex items-center gap-3 w-full ">
              <Info className="stroke-amber-700" />
              <p className="font-label text-sm font-medium text-on-surface">
                Status: Incomplete
              </p>
            </div>
            <div className="flex items-center gap-3 w-full">
              <Shield className="stroke-green-500" />
              <span className="font-label text-sm text-on-surface-variant">
                Your payment details remain secure.
              </span>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <Link
              className="w-full py-4 px-6 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-body text-sm font-medium transition-colors duration-300 text-center flex items-center justify-center gap-2"
              href="/price"
            >
              <ArrowLeft />
              Back to Plans
            </Link>
          </div>
        </div>
        <div className="bg-surface-container-low p-4 text-center border-t border-outline-variant/10">
          <p className="font-label text-xs text-on-surface-variant flex items-center justify-center gap-1">
            Need help?{" "}
            <a className="text-primary hover:underline font-medium" href="#">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default CancelPayment;
