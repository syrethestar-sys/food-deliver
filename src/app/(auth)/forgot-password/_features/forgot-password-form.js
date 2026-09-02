"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { FieldError } from "@/components/field-error";
import { ChevronLeft } from "lucide-react";
import { AuthHeader } from "@/components/auth-header";

const emailSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email. Use a format like example@email.com"),
});

export function ForgotPasswordForm({
  email = "",
  onEmailChange = () => {},
  onNext = () => {},
}) {
  const router = useRouter();
  const [error, setError] = useState("");

  const clearError = () => {
    if (error) setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const result = emailSchema.safeParse({ email });
    if (!result.success) {
      setError(
        result.error.issues[0]?.message ?? "Enter a valid email address.",
      );
      return;
    }

    setError("");
    onNext();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-6"
      noValidate
    >
      <AuthHeader
        title="Reset your password"
        description="Enter your email to receive a password reset link."
        onBack={() => router.back()}
      />

      <div className="flex flex-col gap-4">
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email address"
            value={email}
            aria-invalid={error ? true : undefined}
            onChange={(event) => {
              onEmailChange(event.target.value);
              clearError();
            }}
          />
          {error && <FieldError>{error}</FieldError>}
        </Field>
      </div>

      <Button
        type="submit"
        className="w-full h-9 bg-[#18181B] text-white rounded-md cursor-pointer"
      >
        Send link
      </Button>

      <div className="text-[16px] flex gap-3 justify-center">
        <p>Don&apos;t have an account?</p>
        <Link href="/signup" className="text-[#2563EB]">
          Sign up
        </Link>
      </div>
    </form>
  );
}
