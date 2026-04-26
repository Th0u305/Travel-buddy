import { axiosInstance } from "@/src/lib/axios/httpUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { envVars } from "../config/env";
import { toast } from "sonner";
import { useUserStore } from "../store/zustand.store";
import { CreateTravelPlanTs } from "../types/types";
import { useGetUserProfile } from "./useQuery";
import { useRouter } from "next/navigation";

export const useRegister = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: registerMutate } = useMutation({
    mutationFn: async (value: {
      email: string;
      password: string;
      name: string;
      phone_number: string;
      country: string;
    }) => {
      toast.loading("Registering...");
      const data = await axiosInstance.post(
        envVars.NEXT_PUBLIC_REGISTER,
        value,
      );
      if (data?.data?.data?.code === "phone_number_error") {
        toast.error("This phone number is associated with another account");
        toast.dismiss();
        return;
      }
      if (data?.data?.data?.code === "email_error") {
        toast.error("This email is already registered");
        toast.dismiss();
        return;
      }
      if (!data?.data?.data?.user || data?.data?.data?.status >= 400) {
        toast.error("Something went wrong");
        toast.dismiss();
        return;
      }
      toast.success("Successfully registered");
      toast.info("Please login to continue");
      toast.dismiss();
      return router.push("/login");
    },
    retry(failureCount) {
      if (failureCount > 3) {
        toast.error("Too many attempts. Please try again later");
        toast.dismiss();
        return false;
      }
      return true;
    },

    onSuccess: () => {
      toast.dismiss();
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },

    onError: (error) => {
      toast.dismiss();
      return error;
    },
  });

  return { registerMutate };
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { userProfileRefetch } = useGetUserProfile();
  const router = useRouter();

  const { mutate: loginMutate, isSuccess } = useMutation({
    mutationFn: async (value: { email: string; password: string }) => {
      toast.loading("Logging in...");
      const data = await axiosInstance.post(envVars.NEXT_PUBLIC_LOGIN, value);
      console.log(data?.data?.data);
      if (data?.data?.data?.code === "invalid_credentials") {
        toast.error("Incorrect email or password");
        toast.dismiss();
        return;
      }
      if (data?.data?.data?.code === 302) {
        toast.error(data?.data?.data?.message);
        toast.dismiss();
        return;
      }
      if (data?.data?.data?.status >= 400) {
        toast.error("Something went wrong");
        toast.dismiss();
        return;
      }
      if (data?.data?.data?.user) {
        userProfileRefetch();
        toast.success("Successfully logged in");
        toast.dismiss();
        return router.push("/");
      }
    },

    retry(failureCount) {
      if (failureCount > 3) {
        toast.error("Too many attempts. Please try again later");
        toast.dismiss();
        return false;
      }
      return true;
    },

    onSuccess: () => {
      toast.dismiss();
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },

    onError: (error) => {
      toast.dismiss();
      return error;
    },
  });

  return { loginMutate, isSuccess };
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { removeUserData } = useUserStore();
  const router = useRouter();

  const { mutate: logoutMutate } = useMutation({
    mutationFn: async () => {
      const data = await axiosInstance.get(envVars.NEXT_PUBLIC_LOGOUT);

      if (data?.data?.data?.user === null || data?.data?.code >= 400) {
        return toast.error("Something went wrong");
      }
      if (!data?.data?.success) {
        return toast.error(data?.data?.message);
      }
      if (data?.data?.success) {
        removeUserData();
        router.push("/");
        return toast.success(data?.data?.message);
      }
    },
    retry(failureCount) {
      if (failureCount > 3) {
        toast.error("Too many attempts. Please try again later");
        return false;
      }
      return true;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },

    onError: (error) => {
      return error;
    },
  });

  return { logoutMutate };
};

export const useGoogleLogin = () => {
  const queryClient = useQueryClient();

  const { mutate: googleLoginMutate, data: googleLoginData } = useMutation({
    mutationFn: async () => {
      const data = await axiosInstance.get(envVars.NEXT_PUBLIC_GOOGLE_LOGIN);
      return (window.location.href = data?.data?.data);
    },

    retry(failureCount) {
      if (failureCount > 2) {
        toast.error("Too many attempts. Please try again later");
        return false;
      }
      return true;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },

    onError: (error) => {
      return error;
    },
  });

  return { googleLoginMutate, googleLoginData };
};

export const useForgotPassword = () => {
  const { mutate: forgotPasswordMutate } = useMutation({
    mutationFn: async (value: { email: string}) => {
      const data = await axiosInstance.post(
        envVars.NEXT_PUBLIC_FORGOT_PASSWORD,
        value,
      );
      if (!data?.data?.success) {
        return toast.error("Something went wrong")
      }
      if (data?.data?.status === 200) {
        return toast.success(data?.data?.message);
      }
    },
    retry(failureCount) {
      if (failureCount > 3) {
        toast.error("Too many attempts. Please try again later");
        return false;
      }
      return true;
    },
  });

  return { forgotPasswordMutate };
};

export const useExchangeSessionForgetPassword = () => {
  const { mutate: exchangeSessionForgetPasswordMutate } = useMutation({
    mutationFn: async (value: { access_token: string, refresh_token: string }) => {
      const data = await axiosInstance.post(
        envVars.NEXT_PUBLIC_FORGOT_PASSWORD_SESSION_EXCHANGE,
        value,
      )
      return data
    },
    retry(failureCount) {
      if (failureCount > 2) {
        toast.error("Too many attempts. Please try again later");
        return false;
      }
      return true;
    },
  });

  return { exchangeSessionForgetPasswordMutate };
};

export const useUpdatePassword = () => {
  const { mutate: updatePasswordMutate } = useMutation({
    mutationFn: async (value: { password: string}) => {
      const data = await axiosInstance.put(
        envVars.NEXT_PUBLIC_UPDATE_PASSWORD,
        value,
      );
      if (data?.data?.status === 422 && data?.data?.message === "same_password") {
        return toast.error("Your old password and new password are the same");
      }
      if (!data?.data?.success) {
        return toast.error("Something went wrong")
      }
      if (data?.data?.status === 200) {
        return toast.success(data?.data?.message);
      }
    },
    retry(failureCount) {
      if (failureCount > 2) {
        toast.error("Too many attempts. Please try again later");
        return false;
      }
      return true;
    },
  });

  return { updatePasswordMutate };
};

export const useCreateTravelPlanMutate = () => {
  const queryClient = useQueryClient();

  const { mutate: createTravelPlan } = useMutation({
    mutationFn: async (value: CreateTravelPlanTs) => {
      const data = await axiosInstance.post(
        envVars.NEXT_PUBLIC_CREATE_TRAVEL_PLAN,
        value,
      );

      if (data?.data?.status >= 400) {
        return toast.error("Something went wrong");
      }
      if (data?.data?.status === 200) {
        return toast.success("Travel plan created successfully");
      }
    },
    retry(failureCount) {
      if (failureCount > 3) {
        toast.error("Too many attempts. Please try again later");
        return false;
      }
      return true;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["travelLists"] });
    },

    onError: (error) => {
      return error;
    },
  });
  return { createTravelPlan };
};

export const useSendOTP = () => {
  const { mutate: sendOTPMutate } = useMutation({
    mutationFn: async (value: { email: string }) => {
      const data = await axiosInstance.post(
        envVars.NEXT_PUBLIC_SEND_OTP,
        value,
      );
      if (data?.data?.status >= 400) {
        return toast.error("Something went wrong");
      }
    },
    retry: 1,
  });
  return { sendOTPMutate };
};

export const useUpdateProfile = () => {
  const { mutate: updateProfileMutate } = useMutation({
    mutationFn: async (value: { user_id: string, image: string, bio: string , travel_interests: string, country: string}) => {
      const data = await axiosInstance.post(
        envVars.NEXT_PUBLIC_UPDATE_PROFILE,
        value,
      );
      if (data?.data?.status >= 400) {
        return toast.error("Something went wrong");
      }
      if (data?.data?.status === 200) {
        return toast.success("Profile updated successfully");
      }
      toast.dismiss();
    },
    retry: 1,
  });
  return { updateProfileMutate };
};
export const useVerifyOTP = () => {
  const { mutate: verifyOTPMutate } = useMutation({
    mutationFn: async (value: { email: string; otp: string }) => {
      const data = await axiosInstance.post(
        envVars.NEXT_PUBLIC_VERIFY_OTP,
        value,
      );
      if (data?.data?.status >= 400) {
        return toast.error("Something went wrong");
      }
    },
    retry: 1,
  });
  return { verifyOTPMutate };
};

