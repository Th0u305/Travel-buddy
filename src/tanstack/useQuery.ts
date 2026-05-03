"use client";

import { axiosInstance } from "@/src/lib/axios/httpUtils";
import { useQuery } from "@tanstack/react-query";
import { envVars } from "../config/env";
import { useUserStore } from "../store/zustand.store";
import { toast } from "sonner";
import { useUserMessageStore } from "../store/userMesage.store";

export function useGetUserProfile() {

  const { setUserData } = useUserStore();

  const { data: user,refetch: userProfileRefetch,isLoading } = useQuery({
  queryKey: ["userProfile"],
    queryFn: async () => {
      const res = await axiosInstance.get(envVars.NEXT_PUBLIC_GET_USER);
      setUserData(res?.data?.data?.data);
      return res?.data?.data;
    },
    enabled: true,
    retry: 1,
  });

  return { userProfileRefetch, isLoading, user };
}

export function useGetTravelListsByPagination(page: number,searchQuery: string,travelType: string, limit: number = 12) {

  const { setTravelLists } = useUserStore();
  const { refetch: travelListsRefetch, isLoading } = useQuery({
  queryKey: ["travelLists", page, searchQuery, travelType, limit],
    queryFn: async () => {
      const res = await axiosInstance.get(
        envVars.NEXT_PUBLIC_GET_TRAVEL_LISTS +
          `?page=${page}&search=${searchQuery}&travelType=${travelType}&limit=${limit}`,
      );
      if (!res?.data?.success) {
        return toast.error("Something went wrong");
      }
      setTravelLists(res?.data?.data);
      return res?.data?.data;
    },
    retry: 1,
    enabled: true,
  });
  return { travelListsRefetch, isLoading };
}

export function useGetTravelListById(id: string) {
  
  const { setSingleTravelList } = useUserStore();

  const { data: travelList,refetch: travelListRefetch,isLoading } = useQuery({
  queryKey: ["singleTravelList", id],
  queryFn: async () => {
      const res = await axiosInstance.get(
        envVars.NEXT_PUBLIC_GET_TRAVEL_LISTS_BY_ID + `/${id}`,
      );
      if (!res?.data?.success) {
        return toast.error("Something went wrong");
      }
      setSingleTravelList(res?.data?.data);
      return res?.data?.data;
  },
    retry: 1
  });

  return { travelListRefetch, isLoading, travelList };
}

export function useFindBuddies(
  searchQuery: string,
  searchCountryOrCity: string,
  page: number,
) {
  const { setTravelBuddies } = useUserStore();
  const { refetch: travelBuddiesRefetch, isLoading } = useQuery({
    queryKey: ["travelBuddies", searchQuery, searchCountryOrCity, page],
    queryFn: async () => {
      const res = await axiosInstance.get(
        envVars.NEXT_PUBLIC_GET_TRAVEL_FIND_BUDDIES +
          `?page=${page}&search=${searchQuery}&searchByCountryOrCity=${searchCountryOrCity}`,
      );
      if (!res?.data?.success) {
        return toast.error("Something went wrong");
      }
      setTravelBuddies(res?.data?.data);
      return res?.data?.data;
    },
    retry: 1,
    enabled: true,
  });
  return { travelBuddiesRefetch, isLoading };
}

export function useGetCountries(searchQuery: string) {
  const {data: countries,refetch: countriesRefetch,isLoading} = useQuery({
    queryKey: ["countries", searchQuery],
    queryFn: async () => {
      const res = await axiosInstance.get(
        envVars.NEXT_PUBLIC_GET_COUNTRY_LISTS + `?search=${searchQuery}`,
      );
      if (!res?.data?.success) {
        return toast.error("Something went wrong");
      }
      return res?.data?.data;
    },
    retry: 1,
    enabled: true,
  });
  return { countriesRefetch, isLoading, countries };
}

export function useGetUserViewProfile(id: string) {
  const {
    data: profile,
    refetch: profileRefetch,
    isLoading,
  } = useQuery({
    queryKey: ["profile", id],
    queryFn: async () => {
      const res = await axiosInstance.get(
        envVars.NEXT_PUBLIC_GET_VIEW_USER_PROFILE + `/${id}`,
      );
      if (!res?.data?.success) {
        return toast.error("Something went wrong");
      }
      return res?.data?.data;
    },
    retry: 1,
    enabled: id?.length > 0 ? true : false,
    staleTime: 1000 * 6 * 5,
    gcTime: 1000 * 6 * 5,
  });
  return { profileRefetch, isLoading, profile };
}

export function useCanUserCreateTrip(id: string) {
  const {
    data: canCreateTrip,
    refetch: canCreateTripRefetch,
    isLoading,
  } = useQuery({
    queryKey: ["canCreateTrip", id],
    queryFn: async () => {
      const res = await axiosInstance.get(
        envVars.NEXT_PUBLIC_CAN_USER_CREATE_TRIP + `/${id}`,
      );
      if (!res?.data?.success) {
        return toast.error("Something went wrong");
      }
      return res?.data?.data;
    },
    retry: 1,
    enabled: id?.length > 0 ? true : false,
    staleTime: 1000 * 6 * 5,
    gcTime: 1000 * 6 * 5,
  });
  return { canCreateTripRefetch, isLoading, canCreateTrip };
}

export function useUpdateTripStatus() {
  const { data, refetch: updateTripStatusRefetch } = useQuery({
    queryKey: ["updateTripStatus"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        envVars.NEXT_PUBLIC_UPDATE_TRIP_STATUS,
      );
      if (!res?.data?.success) {
        return toast.error("Something went wrong");
      }
      return res?.data?.data;
    },
    retry: 1,
  });
  return { data, updateTripStatusRefetch };
}

export function useGetUserFullProfile() {
  const { setUserFullProfile } = useUserStore();
  const { data: userFullProfile, refetch: getUserFullProfileRefetch , isLoading} = useQuery({
    queryKey: ["getUserFullProfile"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        envVars.NEXT_PUBLIC_GET_USER_FULL_PROFILE,
      );
      if (!res?.data?.success) {
        return toast.error("Something went wrong");
      }
      setUserFullProfile(res?.data?.data)
      return res?.data?.data;
    },
    retry: 1,
  });
  return { userFullProfile, getUserFullProfileRefetch, isLoading };
}

export function useGetChatUsers() {
  const setChatUsers = useUserMessageStore((state)=> state.setChatUsers);
  const {
    data: chatUsers,
    refetch: chatUsersRefetch,
    isLoading,
  } = useQuery({
    queryKey: ["chatUsers"],
    queryFn: async () => {
      const res = await axiosInstance.get(envVars.NEXT_PUBLIC_MESSAGE_USERS);
      if (!res?.data?.success) {
        return toast.error("Something went wrong");
      }
      setChatUsers(res?.data?.data);
      return res?.data?.data;
    },
    retry: 1,
    enabled: true,
  });
  return { chatUsersRefetch, isLoading, chatUsers };
}

export function useGetMessageHistory(receiverId: string, userName_slug: string) {
  return useQuery({
    queryKey: ["messageHistory", receiverId],
    queryFn: async () => {
      const res = await axiosInstance.get(envVars.NEXT_PUBLIC_MESSAGE_HISTORY + `/${receiverId}/${userName_slug}`);
      if (!res?.data?.success) throw new Error("Failed");
      return res.data.data; // { messages: [...], room_id: '...' }
    },
    enabled: !!receiverId,
    // Prevent React Query from silently refetching and overwriting
    // optimistic updates / realtime-appended messages.
    staleTime: Infinity,
  });
}