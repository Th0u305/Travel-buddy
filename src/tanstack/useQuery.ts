
import { axiosInstance } from '@/lib/axios/httpUtils';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { envVars } from '../config/env';
import { useUserStore } from '../store/zustand.store';

export function useGetUserProfile() {

    const {setUserData} = useUserStore()
  
    const { data: user , refetch : userProfileRefetch, isLoading} = useQuery({
        queryKey: ["userProfile"],
        queryFn : async ()=>{
            const res = await axiosInstance.get(envVars.NEXT_PUBLIC_GET_USER)
            setUserData(res?.data?.data)
            return res?.data?.data
        },
        retry : 1,
        enabled : true
        })    
    return { userProfileRefetch, isLoading, user}
} 