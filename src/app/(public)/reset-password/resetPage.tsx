"use client";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { useForgotPassword } from "@/src/tanstack/useMutation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUserStore } from "@/src/store/zustand.store";

const ResetPage = () => {
  const { forgotPasswordMutate } = useForgotPassword();
  const { userData } = useUserStore();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
    },

    onSubmit: async ({ value }) => {
      forgotPasswordMutate({
        email: value.email,
      });
    },
  });

  if(!userData?.provider?.includes("google")){
    router.push("/home")
    return toast.error("You created account the with google login, you can't reset password")
  }

  return (
    <div className="flex flex-col gap-6 justify-center h-screen w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your email address to reset your password
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
    </div>
  );
};

export default ResetPage;
