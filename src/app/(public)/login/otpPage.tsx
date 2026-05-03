"use client";

import { Button } from "@/src/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/src/components/ui/field";
import { OTPField, OTPFieldInput } from "@/src/components/ui/otp-field";
import { useLogin, useSendOTP, useVerifyOTP } from "@/src/tanstack/useMutation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const OtpPage = ({
  loginFormValue,
  setIsOtp,
}: {
  loginFormValue: { email: string; password: string } | null;
  setIsOtp: (value: boolean) => void;
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const savedTime = sessionStorage.getItem("otpSentTime");
    return savedTime ? Number(savedTime) : 0;
  });
  const [isVerify, setIsVerify] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const { sendOTPMutate } = useSendOTP();
  const { verifyOTPMutate } = useVerifyOTP();
  const { loginMutate } = useLogin();

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    sessionStorage.setItem("otpSentTime", timeLeft.toString());
    return () => clearInterval(timer);
  }, [timeLeft]);

  const OTP_LENGTH = 6;
  const OTP_SLOT_KEYS = Array.from(
    { length: OTP_LENGTH },
    (_, i) => `otp-slot-${i}`,
  );

  const optFunc = () => {
    setTimeLeft(120);
    sendOTPMutate(loginFormValue!);
    toast.success("OTP sent successfully");
    setIsVerify(true);
    toast.dismiss();
  };

  const verifyFunc = () => {
    verifyOTPMutate({ email: loginFormValue?.email || "", otp });
    toast.success("OTP verified successfully");
    toast.dismiss();
    setIsVerify(false);
    setIsOtp(false);
    setTimeLeft(0);
    sessionStorage.setItem("otpSentTime", "0");
    loginMutate({
      email: loginFormValue?.email || "",
      password: loginFormValue?.password || "",

    });
  };

  return (
    <Field className="bg-white p-8 rounded-xl flex justify-center items-center flex-col gap-2">
      <FieldLabel className="justify-center w-full mb-2">
        Verification code
      </FieldLabel>
      <Field className="">
        <OTPField
          length={OTP_LENGTH}
          value={otp}
          onValueChange={(val) => {
            setOtp(val);
          }}
        >
          {OTP_SLOT_KEYS.map((slotKey, index) => (
            <OTPFieldInput
              required
              className="mx-auto"
              key={slotKey}
              aria-label={`Character ${index + 1} of ${OTP_LENGTH}`}
            />
          ))}
        </OTPField>
      </Field>

      <FieldDescription>
        Enter the {OTP_LENGTH}-digit code sent to your email.
      </FieldDescription>
      <FieldDescription>
        {timeLeft > 1 ? `${timeLeft} seconds remaining` : ""}
      </FieldDescription>
      {isVerify ? (
        <Button
          size="lg"
          type="submit"
          className="hover:scale-105 active:scale-[0.98] transition-all disabled:cursor-not-allowed"
          onClick={() => verifyFunc()}
        >
          Verify OTP
        </Button>
      ) : (
        <Button
          size="lg"
          disabled={timeLeft > 1}
          onClick={() => optFunc()}
          className="hover:scale-105 active:scale-[0.98] transition-all disabled:cursor-not-allowed"
        >
          Send OTP
        </Button>
      )}
      <Button
        disabled={timeLeft > 1}
        variant="link"
        onClick={() => optFunc()}
        className="underline cursor-pointer disabled:cursor-not-allowed"
      >
        Resend OTP
      </Button>
    </Field>
  );
};

export default OtpPage;
