import { Metadata } from "next";
import ResetPage from "./resetPage";

export const metadata: Metadata = {
  title: "Travel Buddey | Reset Password",
  description: "Travel Buddey | Reset Password",
};

export default function LoginPage() {
  return (
    <ResetPage />
  );
}
