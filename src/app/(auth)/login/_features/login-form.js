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
import { server } from "@/app/api/api";
import { AuthHeader } from "@/components/auth-header";
import { loginSchema } from "@/lib/validation/login";

export function LoginForm({
  email = "",
  password = "",
  onEmailChange = () => {},
  onPasswordChange = () => {},
}) {
  const router = useRouter();
  const { setUser } = useAuth();
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const clearError = () => {
    if (error) setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      setError(
        result.error.issues[0]?.message ??
          "Check your email and password and try again.",
      );
      return;
    }

    try {
      const response = await server.post("/auth/login", { email, password });

      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUser({ email });
      router.push("/admin/food-menu");
      console.log(response, `response`);
      
    } catch (err) {
      const message =
        `${err.response?.data?.message} `??
        "Something went wrong. Please try again.";
      setError(message);
      console.error(err);      
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
      <AuthHeader
        title="Login"
        description="Log in to enjoy your favorite dishes."
        onBack={router.back}
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
            type={show ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              onPasswordChange(event.target.value);
              clearError();
            }}
          />
          {error && <FieldError>{error}</FieldError>}
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={show}
              onChange={(event) => setShow(event.target.checked)}
              className="size-4 rounded border-input accent-[#f0431c]"
            />
            Show password
          </label>
        </Field>

        <Link
          href="/forgot-password"
          className="text-[14px] underline self-start"
        >
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
