"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
import { useUserStore } from "../store/zustand.store";

export default function TanProviders({
  children,
}: {
  children: React.ReactNode;
}) {
const hasHydrated = useUserStore((state) => state.hasHydrated);


if (!hasHydrated) {
    // Return a blank screen, or a nice full-screen loading spinner
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const queryClient = new QueryClient({    
    defaultOptions: {
      queries: {
        retry(failureCount, error) {
          if (failureCount > 2) {
            error.message = "Server seems down please try again later";
            return false;
          }
          if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            if (status && status >= 400 && status < 500) {
              return false;
            }
          }
          return true;
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
