
import { axiosInstance } from '@/lib/axios/httpUtils';
import { useQuery } from '@tanstack/react-query';
import { envVars } from '../config/env';
import { useUserStore } from '../store/zustand.store';

export default function useGetUserProfile() {

    const {setUserData} = useUserStore()
  
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data: user , refetch : userProfileRefetch, isLoading} = useQuery({
        queryKey: ["userProfile"],
        queryFn : async ()=>{
            const res = await axiosInstance.get(envVars.NEXT_PUBLIC_GET_USER)
            setUserData(res?.data?.data)
            return res?.data?.data
        },
        retry : 1,
    })
    
    return { userProfileRefetch, isLoading}
} 
