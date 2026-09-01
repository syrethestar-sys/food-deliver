"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useAuth } from "@/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { FieldError } from "@/components/field-error";
import { ChevronLeft } from "lucide-react";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export function LoginForm({
  email = "",
  password = "",
  onEmailChange = () => {},
  onPasswordChange = () => {},
}) {
  const router = useRouter();
  const { setUser } = useAuth();
  const [error, setError] = useState("");

  const clearError = () => {
    if (error) setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Check your email and password and try again.");
      return;
    }

    setUser({ email });
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className="w-104 flex flex-col gap-6">
      <div>
        <Button
          type="button"
          variant="ghost"
          className="cursor-pointer"
          onClick={() => router.back()}
        >
          <ChevronLeft />
        </Button>
      </div>

      <div>
        <p className="text-[24px] font-semibold">Login</p>
        <p className="text-[16px] text-[#71717A]">
          Log in to enjoy your favorite dishes.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(event) => {
              onEmailChange(event.target.value);
              clearError();
            }}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              onPasswordChange(event.target.value);
              clearError();
            }}
          />
          {error && <FieldError>{error}</FieldError>}
        </Field>

        <Link href="/forgot-password" className="text-[14px] underline self-start">
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        className="w-full h-9 bg-[#18181B] text-white rounded-md cursor-pointer"
      >
        Let&apos;s Go
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