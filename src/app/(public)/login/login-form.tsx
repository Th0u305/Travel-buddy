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
  FieldSeparator,
} from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { useRef, useState } from "react";
import { EyeIcon, EyeOffIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useRegister, useGoogleLogin } from "@/src/tanstack/useMutation";
import { toast } from "sonner";
import { formSchema, loginSchema } from "@/src/zod/zodValidation";
import { useUserStore } from "@/src/store/zustand.store";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { envVars } from "@/src/config/env";
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxTrigger,
  ComboboxValue,
} from "@/src/components/ui/combobox";
import { SelectButton } from "@/src/components/ui/select";
import { useGetCountries } from "@/src/tanstack/useQuery";
import OtpPage from "./otpPage";
import { Spinner } from "@/src/components/ui/spinner";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/src/components/ui/input-group";

export default function LoginForm() {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState<string>("Login");
  const { registerMutate } = useRegister();
  const { googleLoginMutate } = useGoogleLogin();
  const { userData: user } = useUserStore();
  const [token, setToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchCountry, setSearchCountry] = useState<string>("");
  const { countries } = useGetCountries(searchCountry);
  const [isOtp, setIsOtp] = useState<boolean>(false);
  const [loginFormValue, setLoginFormValue] = useState<{
    email: string;
    password: string;
  } | null>(null);

  const loginOrSignUp = () => {
    setIsSignUp(isSignUp === "Sign Up" ? "Login" : "Sign Up");
    form.reset();
    setToken(null);
    captchaRef.current?.resetCaptcha();
  };

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone_number: "",
      country: "",
      confirm_password: "",
    },

    onSubmit: async ({ value }) => {
      const validateLogin = loginSchema.safeParse(value);
      const validateRegister = formSchema.safeParse(value);

      if (user !== null) return toast.error("You are already logged in");

      if (isSignUp === "Sign Up") {
        if (!validateRegister.success) {
          const aaa = validateRegister.error.issues.map((item) => item.message);
          aaa.forEach((msg) => {
            toast.error(msg);
          });
          return;
        }

        if (value.password !== value.confirm_password)
          return toast.error("Passwords do not match");

        if (!token) return toast.error("Please verify you are not a robot");

        setIsLoading(true);
        registerMutate(value);
        setIsLoading(false);
        form.reset();
      }
      if (isSignUp === "Login") {
        if (!validateLogin.success) {
          const bbb = validateLogin.error.issues.map((item) => item.message);
          bbb.forEach((msg) => {
            toast.error(msg);
          });
          return;
        }

        if (!token) return toast.error("Please verify you are not a robot");

        setIsLoading(true);
        setIsOtp(true);
        setLoginFormValue(value);
        setIsLoading(false);
        form.reset();
      }
    },
  });

  const googleLoginFn = () => {
    if (user?.data?.email && user?.data?.full_name)
      return toast.error("You are already logged in");
    googleLoginMutate();
  };

  return (
    <div>
      {!isOtp && (
        <>
          <Card className="mb-6 w-auto">
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
                  {/* Social Login Buttons */}
                  <Field>
                    <Button
                      variant="outline"
                      type="button"
                      className="cursor-pointer"
                      size="lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                          fill="currentColor"
                        />
                      </svg>
                      Login with Apple
                    </Button>
                    <Button
                      variant="outline"
                      type="button"
                      className="cursor-pointer"
                      size="lg"
                      onClick={() => googleLoginFn()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                          fill="currentColor"
                        />
                      </svg>
                      Login with Google
                    </Button>
                  </Field>

                  {/* Separator */}
                  <FieldSeparator
                    className={`*:data-[slot=field-separator-content]:bg-card ${isSignUp === "Sign Up" ? "md:col-span-2" : ""}`}
                  >
                    Or continue with
                  </FieldSeparator>

                  {/* Sign Up Fields & country */}
                  {isSignUp === "Sign Up" && (
                    <>
                      {/* Name Field */}
                      <Field>
                        <FieldLabel htmlFor="name">Name</FieldLabel>
                        <form.Field name="name">
                          {(field) => {
                            return (
                              <>
                                <Input
                                  id={field.name}
                                  name={field.name}
                                  value={field.state.value}
                                  onBlur={field.handleBlur}
                                  type="text"
                                  placeholder="Enter your name"
                                  className="h-10"
                                  onChange={(e) =>
                                    field.handleChange(e.target.value)
                                  }
                                  required
                                />
                              </>
                            );
                          }}
                        </form.Field>
                      </Field>

                      {/* Phone Number Field */}
                      <Field>
                        <FieldLabel htmlFor="phone_number">
                          Phone Number
                        </FieldLabel>
                        <form.Field name="phone_number">
                          {(field) => {
                            return (
                              <>
                                <Input
                                  id={field.name}
                                  name={field.name}
                                  value={field.state.value}
                                  onBlur={field.handleBlur}
                                  type="number"
                                  placeholder="Enter your phone number"
                                  className="h-10"
                                  onChange={(e) =>
                                    field.handleChange(e.target.value)
                                  }
                                  required
                                />
                              </>
                            );
                          }}
                        </form.Field>
                      </Field>

                      {/* Country Field */}
                      <Field>
                        <FieldLabel htmlFor="country">Country</FieldLabel>
                        <form.Field name="country">
                          {(field) => {
                            return (
                              <Combobox
                                items={countries}
                                onValueChange={(e) => {
                                  field.handleChange(e as string);
                                }}
                                value={field.state.value}
                              >
                                <ComboboxTrigger
                                  className="h-10"
                                  render={<SelectButton />}
                                >
                                  <ComboboxValue placeholder="Select a country" />
                                </ComboboxTrigger>
                                <ComboboxPopup
                                  aria-label="Select a country"
                                  className="w-1/2"
                                >
                                  <div className="border-b p-2">
                                    <ComboboxInput
                                      className="rounded-md before:rounded-[calc(var(--radius-md)-1px)] pl-8"
                                      placeholder="Search countries..."
                                      showTrigger={false}
                                      startAddon={<SearchIcon />}
                                      onChange={(e) =>
                                        setSearchCountry(e.target.value)
                                      }
                                    />
                                  </div>
                                  <ComboboxEmpty>
                                    No countries found.
                                  </ComboboxEmpty>
                                  <ComboboxList>
                                    {countries?.length > 0 ? (
                                      (item) => (
                                        <ComboboxItem
                                          key={item.iso2}
                                          value={item.name}
                                        >
                                          {item.name}
                                        </ComboboxItem>
                                      )
                                    ) : (
                                      <Spinner className="w-8 h-8 text-blue-500" />
                                    )}
                                  </ComboboxList>
                                </ComboboxPopup>
                              </Combobox>
                            );
                          }}
                        </form.Field>
                      </Field>
                    </>
                  )}

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
                              className="h-10"
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
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
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                    </div>
                    <form.Field name="password">
                      {(field) => {
                        return (
                          <>
                            <InputGroup className="h-10">
                              <InputGroupInput
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                type={showPass ? "text" : "password"}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                placeholder="Enter password"
                                className="h-10"
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
                                  <EyeIcon
                                    onClick={() => setShowPass(!showPass)}
                                  />
                                )}
                              </InputGroupAddon>
                            </InputGroup>
                          </>
                        );
                      }}
                    </form.Field>
                  </Field>

                  {/* confirm password */}
                  {isSignUp === "Sign Up" && (
                    <Field>
                      <div className="flex items-center">
                        <FieldLabel htmlFor="password">
                          Confirm Password
                        </FieldLabel>
                      </div>
                      <form.Field name="confirm_password">
                        {(field) => {
                          return (
                            <>
                              <InputGroup className="h-10">
                                <InputGroupInput
                                  id={field.name}
                                  name={field.name}
                                  value={field.state.value}
                                  onBlur={field.handleBlur}
                                  type={showConfirmPass ? "text" : "password"}
                                  onChange={(e) =>
                                    field.handleChange(e.target.value)
                                  }
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
                  )}
                  <div className="w-fit mx-auto">
                    <Link
                      href="/reset-password"
                      className="text-sm underline-offset-4 underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>

                  {/* hcaptcha */}
                  <HCaptcha
                    sitekey={envVars.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
                    onVerify={setToken}
                    ref={captchaRef}
                  />

                  <Field
                    className={isSignUp === "Sign Up" ? "md:col-span-2" : ""}
                  >
                    <Button size="lg" type="submit" className="cursor-pointer">
                      {isLoading ? <Spinner /> : isSignUp}
                    </Button>
                    <FieldDescription className="text-center">
                      Already have an account?
                      <Link href="#" onClick={() => loginOrSignUp()}>
                        {isSignUp === "Sign Up" ? "Login" : "Sign Up"}
                      </Link>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
          <FieldDescription className="px-6 text-center">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </FieldDescription>
        </>
      )}

      {isOtp && <OtpPage loginFormValue={loginFormValue} setIsOtp={setIsOtp} />}
    </div>
  );
}
