
import { axiosInstance } from "@/lib/axios/httpUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { envVars } from "../config/env";
import { toast } from "sonner"
import { useUserStore } from "../store/zustand.store";
import { CreateTravelPlanTs } from "../types/types";


export const useRegister = () => {

    const queryClient = useQueryClient();
    const {setUserData} = useUserStore()

    const {mutate : registerMutate } = useMutation({
        mutationFn: async (value: { email: string, password: string, name: string, phone_number: string }) => {
            const data = await  axiosInstance.post(envVars.NEXT_PUBLIC_REGISTER, value)    
            if(data?.data?.data?.code === "phone_number_error"){
                return toast.error("This phone number is associated with another account")
            }
            if(data?.data?.data?.code === "email_error"){
                return toast.error("This email is already registered")
            }
            if(!data?.data?.data?.user || data?.data?.data?.status === 500){
                return toast.error("Something went wrong")
            }
            if(data?.data?.data?.user){
                setUserData(data?.data?.data?.user)
                return toast.success("Successfully registered")
            }
        },
        retry(failureCount) {
            if(failureCount > 3){
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

  return {registerMutate}

}

export const useLogin =() => {

    const queryClient = useQueryClient();
    const {setUserData} = useUserStore()

    const { mutate : loginMutate, isSuccess} = useMutation({
        mutationFn: async (value: { email: string, password: string }) => {
            const data = await axiosInstance.post(envVars.NEXT_PUBLIC_LOGIN, value)
            if(data?.data?.data?.code === "invalid_credentials"){
                return toast.error("Incorrect email or password")
            }
            if (data?.data?.data?.code === 302) {
                return toast.error(data?.data?.data?.message)
            }
            if(!data?.data?.data?.user || data?.data?.data?.status === 500){
                return toast.error("Something went wrong")
            }
            if(data?.data?.data?.user){
                setUserData(data?.data?.data?.user)
                return toast.success("Successfully logged in")
            }
        },
        retry(failureCount) {
            if(failureCount > 3){
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

  return {loginMutate, isSuccess}

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
            if(failureCount > 3){
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

export const useGoogleLogin =() => {

    const queryClient = useQueryClient();

    const { mutate : googleLoginMutate , data : googleLoginData } = useMutation({
        mutationFn: async () => {
            const data = await axiosInstance.get(envVars.NEXT_PUBLIC_GOOGLE_LOGIN) 
            return window.location.href = data?.data?.data
        },

        retry(failureCount) {
            if(failureCount > 2){
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
        },

    });
    
    return {googleLoginMutate ,googleLoginData }
}

export const useForgotPassword = ()=>{
    const {mutate : forgotPasswordMutate} = useMutation({
        mutationFn : async ( value : {email:string, password: string})=>{
            const data = await axiosInstance.post(envVars.NEXT_PUBLIC_FORGOT_PASSWORD, value)
            console.log(data?.data);
            if (data?.data?.status > 400 && data?.data?.status < 500) {
                return toast.error(data?.data?.message)
            }
            if (data?.data?.status === 200) {
                return toast.success(data?.data?.message)
            }
        },
        retry(failureCount) {
            if(failureCount > 3){
                toast.error("Too many attempts. Please try again later")
                return false
            }
            return true
        },
    })

    return { forgotPasswordMutate}
}

export const useCreateTravelPlanMutate = () =>{

    const queryClient = useQueryClient()

    const {mutate : createTravelPlan} = useMutation({
        mutationFn : async(value:CreateTravelPlanTs)=>{

            const data = await axiosInstance.post(envVars.NEXT_PUBLIC_CREATE_TRAVEL_PLAN, value)

            if(data?.data?.status > 400 && data?.data?.status < 500){
                return toast.error(data?.data?.message)
            }
            if(data?.data?.status === 200){
                return toast.success(data?.data?.message)
            }
        },
        retry(failureCount) {
            if(failureCount > 3){
                toast.error("Too many attempts. Please try again later")
                return false
            }
            return true
        },

        // onSuccess: () => {
        //     queryClient.invalidateQueries({ queryKey: ['userProfile'] });
        // },

        onError: (error) => {
            return error
        }
    })
    return { createTravelPlan}
}
