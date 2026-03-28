"use client"

import Footer from "@/app/layout/Footer";
import Navbar from "@/app/layout/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";

export default function TanProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry(failureCount, error) {
          if (failureCount > 2) {
            error.message = "Server seems down please try again later";
            return false;
          }
          if (axios.isAxiosError(error)) {
            const status = error.response?.status
            if (status && status >= 400 && status < 500) {
              return false
            }
          }
          return true
        },
        retryDelay : (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        refetchOnWindowFocus : false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      {children}
      <Footer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
