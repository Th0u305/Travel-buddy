"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
// import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
// import { PersistQueryClientProvider, removeOldestQuery } from '@tanstack/react-query-persist-client';
// import AsyncStorage from '@react-native-async-storage/async-storage'

export default function TanProviders({
  children,
}: {
  children: React.ReactNode;
}) {

  // const localStoragePersister = createAsyncStoragePersister({
  //   storage: AsyncStorage,
  //   retry : removeOldestQuery
  // });


  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime : 1000 * 6,
        gcTime : 1000 * 6,
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
    // <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: localStoragePersister , dehydrateOptions : {
    //   shouldDehydrateQuery(query) {
    //     if (query.queryKey[0] === "travelLists" || query.queryKey[0] === "travelBuddies") {
    //       return false;
    //     }
    //     return true;
    //   },
    // }}}>
    //   {children}
    //   <ReactQueryDevtools initialIsOpen={false} />
    // </PersistQueryClientProvider>
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
