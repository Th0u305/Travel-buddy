
import { GalleryVerticalEndIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import RegisterForm from "./register-form";
export const metadata: Metadata = {
  title: "Travel Buddey | Register",
  description: "Travel Buddey | Register",
};


export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted pt-30 p-5">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEndIcon className="size-4" />
          </div>
          Travel Buddy Meetup
        </Link>
        <RegisterForm />
      </div>
    </div>
  );
}
