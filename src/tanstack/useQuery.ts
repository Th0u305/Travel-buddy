"use client"

import { axiosInstance } from '@/lib/axios/httpUtils';
import { useQuery } from '@tanstack/react-query';
import { envVars } from '../config/env';
import { useUserStore } from '../store/zustand.store';
import { toast } from 'sonner';

export function useGetUserProfile() {

    // const queryClient = useQueryClient()
    // const userData = queryClient.getQueryData(["userProfile"])

    const {setUserData} = useUserStore()
  
    const { data: user , refetch : userProfileRefetch, isLoading} = useQuery({
        queryKey: ["userProfile"],
        queryFn : async ()=>{
            const res = await axiosInstance.get(envVars.NEXT_PUBLIC_GET_USER)
            setUserData(res?.data?.data)
            return res?.data?.data
        },
        // placeholderData : userData,
        // initialData : keepPreviousData,
        // refetchOnMount : true,
        // staleTime : 1000 * 60 * 5,
        enabled : true,
        retry : 1,
    })

    // useEffect(()=>{
    //     if (userData) {
    //         setUserData(userData as UserTs)
    //     }
    //     setUserData(user as UserTs)
    // },[userData, setUserData, user])
    return { userProfileRefetch, isLoading, user}
}

export function useGetTravelListsByPagination(page : number, searchQuery : string, travelType : string) {
    const { setTravelLists } = useUserStore()
    const { refetch : travelListsRefetch, isLoading} = useQuery({
        queryKey: ["travelLists", page, searchQuery, travelType],
        queryFn : async ()=>{
            const res = await axiosInstance.get(envVars.NEXT_PUBLIC_GET_TRAVEL_LISTS + `?page=${page}&search=${searchQuery}&travelType=${travelType}`)
            if(!res?.data?.success){
                return toast.error("Something went wrong")
            }
            setTravelLists(res?.data?.data)
            return res?.data?.data
        },
        retry : 1,
        enabled : true
        })    
    return { travelListsRefetch, isLoading}
} 

export function useGetTravelListById(id : string) {

    const { setSingleTravelList } = useUserStore()

    const { data: travelList , refetch : travelListRefetch, isLoading} = useQuery({
        queryKey: ["singleTravelList", id],
        queryFn : async ()=>{
            const res = await axiosInstance.get(envVars.NEXT_PUBLIC_GET_TRAVEL_LISTS_BY_ID + `/${id}`)
            if(!res?.data?.success){
                return toast.error("Something went wrong")
            }
            setSingleTravelList(res?.data?.data)
            return res?.data?.data
        },
            retry : 1,
            enabled : id?.length > 0 ? true : false,
            staleTime : 1000 * 6 * 5,
            gcTime : 1000 * 6 * 5,
        })  

    return { travelListRefetch, isLoading, travelList}
} 

export function useFindBuddies(searchQuery: string, searchCountryOrCity: string, page: number) {
    const { setTravelBuddies } = useUserStore()
    const { refetch : travelBuddiesRefetch, isLoading} = useQuery({
        queryKey: ["travelBuddies", searchQuery, searchCountryOrCity, page],
        queryFn : async ()=>{
            const res = await axiosInstance.get(envVars.NEXT_PUBLIC_GET_TRAVEL_FIND_BUDDIES + `?page=${page}&search=${searchQuery}&searchByCountryOrCity=${searchCountryOrCity}`)
            if(!res?.data?.success){
                return toast.error("Something went wrong")
            }
            setTravelBuddies(res?.data?.data)
            return res?.data?.data
        },
        retry : 1,
        enabled : true
    })    
    return { travelBuddiesRefetch, isLoading}
} 

export function useGetCountries(searchQuery : string) {
    const { data: countries , refetch : countriesRefetch, isLoading} = useQuery({
        queryKey: ["countries", searchQuery],
        queryFn : async ()=>{
            const res = await axiosInstance.get(envVars.NEXT_PUBLIC_GET_COUNTRY_LISTS + `?search=${searchQuery}`)
            if(!res?.data?.success){
                return toast.error("Something went wrong")
            }
            return res?.data?.data
        },
        retry : 1,
        enabled : true
    })    
    return { countriesRefetch, isLoading, countries}
}

export function useGetFullProfile(id : string) {
    const { data: profile , refetch : profileRefetch, isLoading} = useQuery({
        queryKey: ["profile", id],
        queryFn : async ()=>{
            const res = await axiosInstance.get(envVars.NEXT_PUBLIC_GET_USER_FULL_PROFILE + `/${id}`)
            if(!res?.data?.success){
                return toast.error("Something went wrong")
            }
            return res?.data?.data
        },
        retry : 1,
        enabled : id?.length > 0 ? true : false,
        staleTime : 1000 * 6 * 5,
        gcTime : 1000 * 6 * 5,
    })    
    return { profileRefetch, isLoading, profile}
}


