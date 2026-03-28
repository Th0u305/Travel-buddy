import { axiosInstance } from "@/lib/axios/httpUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { envVars } from "../config/env";
import { toast } from "sonner"
import { useUserStore } from "../store/zustand.store";


export const useRegister = () => {

    const queryClient = useQueryClient();
    const {setUserData} = useUserStore()

    const {mutate : registerMutate} = useMutation({
        mutationFn: async (value: { email: string, password: string }) => {
            const data = await  axiosInstance.post(envVars.NEXT_PUBLIC_REGISTER, value)
            if(data?.data?.data?.user === null || data?.data?.code === 500){
                return toast.error("Something went wrong")
            }
            if(!data?.data?.success){
                return toast.error(data?.data?.message)
            }
            if(data?.data?.success){
                setUserData(data?.data?.data?.user)
                return toast.success(data?.data?.message)
            }
        },

        onMutate: async (newUserData) => {
            // 1. Cancel any outgoing refetches so they don't overwrite our optimistic update
            await queryClient.cancelQueries({ queryKey: ['userProfile'] });

            // 2. Snapshot the previous value (so we can roll back if things go wrong)
            const previousProfile = queryClient.getQueryData(['userProfile']);

            // 3. Optimistically update the cache with the new value!
            queryClient.setQueryData(['userProfile'], (oldData: { email: string, password: string }) => ({
                ...oldData,
                name: newUserData, // Inject the new name instantly
            }));

            // 4. Return the snapshot so `onError` can use it later
            return { previousProfile };
        },

        onError: (err, newUserData, context) => {
            toast.error("Failed to save on the server. Rolling back UI...");
            // If the mutation fails, use the context returned from onMutate to roll back
            if (context?.previousProfile) {
                queryClient.setQueryData(['userProfile'], context.previousProfile);
            }
            toast.error("Something went wrong. Please try again later");
        },

        retry(failureCount) {
            if(failureCount > 4){
                toast.error("Too many attempts. Please try again later")
                return false
            }
            return true
        },


        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userProfile'] });
        },
    });

  return {registerMutate}

}

export const useLogin =() => {

    const queryClient = useQueryClient();
    const {setUserData} = useUserStore()

    const {data: loginData, mutate : loginMutate} = useMutation({
        mutationFn: async (value: { email: string, password: string }) => {
            const data = await  axiosInstance.post(envVars.NEXT_PUBLIC_LOGIN, value)
            if(data?.data?.data?.user === null || data?.data?.code === 500){
                return toast.error("Something went wrong")
            }
            if(!data?.data?.success){
                return toast.error(data?.data?.message)
            }
            if(data?.data?.success){
                setUserData(data?.data?.data?.user)
                return toast.success(data?.data?.message)
            }
        },
        retry(failureCount) {
            if(failureCount > 4){
                toast.error("Too many attempts. Please try again later")
                return false
            }
            return true
        },


        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userProfile'] });
        },

        onError: (error) => {
            return error
        }
    });

  return {loginData, loginMutate}

}

export const useLogout =() => {

    const queryClient = useQueryClient();
    const {removeUserData} = useUserStore()

    const {mutate : logoutMutate} = useMutation({
        mutationFn: async () => {
            const data = await  axiosInstance.get(envVars.NEXT_PUBLIC_LOGOUT)
            
            if(data?.data?.data?.user === null || data?.data?.code === 500){
                return toast.error("Something went wrong")
            }
            if(!data?.data?.success){
                return toast.error(data?.data?.message)
            }
            if(data?.data?.success){
                removeUserData()
                return toast.success(data?.data?.message)
            }
        },
        retry(failureCount) {
            if(failureCount > 4){
                toast.error("Too many attempts. Please try again later")
                return false
            }
            return true
        },


        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userProfile'] });
        },

        onError: (error) => {
            return error
        }
    });
    
    return {logoutMutate}
}
