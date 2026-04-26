"use client"
import { CircleAlertIcon } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/src/components/ui/alert";

export default function  UpdateUserError() {

  return (
    <Alert variant="error" className="bg-white border-3 border-red-500">
      <CircleAlertIcon/>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        Please update your profile to continue.
      </AlertDescription>
    </Alert>
  );
}
