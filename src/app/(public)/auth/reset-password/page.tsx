"use client";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/src/components/ui/input-group";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from "sonner";
import { forgotPassword } from "@/src/zod/zodValidation";
import { useExchangeSessionForgetPassword, useLogout, useResetPassword } from "@/src/tanstack/useMutation";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [showOldPass, setShowOldPass] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
  const { exchangeSessionForgetPasswordMutate } = useExchangeSessionForgetPassword()
  const {resetPasswordMutate} = useResetPassword()
  const {logoutMutate} = useLogout()
  const router = useRouter()

  const exchangeTokenForSession = async (accessToken: string, refreshToken: string | "") => {
    try {
      exchangeSessionForgetPasswordMutate({access_token: accessToken,refresh_token: refreshToken});
      window.history.replaceState({}, "", window.location.pathname);
    } catch (err) {
      console.error(err)
    }
  };
  
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const parsedHash = hash.startsWith("#") ? hash.substring(1) : hash;
      const params = new URLSearchParams(parsedHash);
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token") || "";
      const type = params.get("type");

      if (type === "recovery" && accessToken) {
        exchangeTokenForSession(accessToken, refreshToken);
      } else {
        toast.error("Invalid or expired reset link");
      }
    } else {
      router.push("/reset-password")
      // toast.error("Please use the link from your email")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const form = useForm({
    defaultValues: {
      email: "",
      new_password: "",
      confirm_password: "",
      old_password: "",
    },

    onSubmit: async ({ value }) => {
      const validate = forgotPassword.safeParse(value);
      if (!validate.success) {
        const aaa = validate.error.issues.map((item) => item.message);
        aaa.forEach((msg) => {
          toast.error(msg);
        });
        return;
      }
      if (value.old_password === value.new_password || value.old_password === value.confirm_password) return toast.error("Old password and new password are the same");
      if (value.new_password !== value.confirm_password) return toast.error("Passwords do not match");

      try {
        resetPasswordMutate({password: value.new_password})
        logoutMutate();
        toast.info("Please login with your new password");
        router.push("/login");
      } catch (err) {
        return err
      }
    },
  });

  return (
    <div className="flex flex-col gap-6 justify-center h-screen w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              {/* Email Field */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <form.Field name="email">
                  {(field) => {
                    return (
                      <>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          type="email"
                          placeholder="Enter your email"
                          onChange={(e) => field.handleChange(e.target.value)}
                          required
                        />
                      </>
                    );
                  }}
                </form.Field>
              </Field>

              {/* Password Field */}
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Old Password</FieldLabel>
                </div>
                <form.Field name="old_password">
                  {(field) => {
                    return (
                      <>
                        <InputGroup>
                          <InputGroupInput
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            type={showOldPass ? "text" : "password"}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Enter password"
                            required
                          />
                          <InputGroupAddon
                            align="inline-end"
                            className="cursor-pointer"
                          >
                            {!showOldPass && (
                              <EyeOffIcon
                                onClick={() => setShowOldPass(!showOldPass)}
                              />
                            )}
                            {showOldPass && (
                              <EyeIcon
                                onClick={() => setShowOldPass(!showOldPass)}
                              />
                            )}
                          </InputGroupAddon>
                        </InputGroup>
                      </>
                    );
                  }}
                </form.Field>
              </Field>

              {/* Password Field */}
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">New Password</FieldLabel>
                </div>
                <form.Field name="new_password">
                  {(field) => {
                    return (
                      <>
                        <InputGroup>
                          <InputGroupInput
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            type={showPass ? "text" : "password"}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Enter password"
                            required
                          />
                          <InputGroupAddon
                            align="inline-end"
                            className="cursor-pointer"
                          >
                            {!showPass && (
                              <EyeOffIcon
                                onClick={() => setShowPass(!showPass)}
                              />
                            )}
                            {showPass && (
                              <EyeIcon onClick={() => setShowPass(!showPass)} />
                            )}
                          </InputGroupAddon>
                        </InputGroup>
                      </>
                    );
                  }}
                </form.Field>
              </Field>

              {/* confirm password */}

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Confirm Password</FieldLabel>
                </div>
                <form.Field name="confirm_password">
                  {(field) => {
                    return (
                      <>
                        <InputGroup>
                          <InputGroupInput
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            type={showConfirmPass ? "text" : "password"}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Confirm password"
                            required
                          />
                          <InputGroupAddon
                            align="inline-end"
                            className="cursor-pointer"
                          >
                            {!showConfirmPass && (
                              <EyeOffIcon
                                onClick={() =>
                                  setShowConfirmPass(!showConfirmPass)
                                }
                              />
                            )}
                            {showConfirmPass && (
                              <EyeIcon
                                onClick={() =>
                                  setShowConfirmPass(!showConfirmPass)
                                }
                              />
                            )}
                          </InputGroupAddon>
                        </InputGroup>
                      </>
                    );
                  }}
                </form.Field>
              </Field>

              <Field>
                <Button
                  size="lg"
                  type="submit"
                  className="cursor-pointer active:scale-95 transition-all"
                >
                  Reset Password
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
