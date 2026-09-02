"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { FieldError } from "@/components/field-error";
import { ChevronLeft } from "lucide-react";
import { AuthHeader } from "@/components/auth-header";
import { useRouter } from "next/navigation";

const CODE_PATTERN = /^\d{6}$/;

export function VerifyEmail({
  email = "",
  onBack = () => {},
  onDone = () => {},
}) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!CODE_PATTERN.test(code)) {
      setError("Enter the 6-digit code we sent to your email.");
      return;
    }

    setError("");
    onDone();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-6"
      noValidate
    >
      <AuthHeader
        title="Please verify your email"
        description={
          <>
            We just sent an email to{" "}
            <span className="font-medium text-foreground">
              {email || "your email address"}
            </span>
            . Click the link in the email to verify your account.
          </>
        }
        onBack={router.back}
      />

      <Button
        type="submit"
        className="w-full h-9 bg-[#18181B] text-white rounded-md cursor-pointer"
      >
        Resend email
      </Button>
    </form>
  );
}
