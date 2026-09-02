"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthHeader } from "@/components/auth-header";
import { FieldError } from "@/components/field-error";
import { Field, FieldLabel } from "@/components/ui/field";
import { useRouter } from "next/navigation";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function StepOne({ form, onChange, onNext }) {
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(form.email)) {
      setError("Invalid email. Use a format like example@email.com");
      return;
    }
    setError("");
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <AuthHeader
        title="Create your account"
        description="Sign up to explore your favorite dishes."
      />

      <div className="space-y-1.5">
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input
            type="email"
            autoComplete="email"
            placeholder="Enter your email address"
            value={form.email}
            aria-invalid={error ? true : undefined}
            onChange={(event) => {
              onChange({ email: event.target.value });
              if (error) setError("");
            }}
          />
          <FieldError>{error}</FieldError>
        </Field>
      </div>

      <Button type="submit" className="h-9 w-full" disabled={!form.email}>
        Let&apos;s Go
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-foreground hover:underline"
        >
          Log in
        </Link>
      </p>
    </form>
  );
}
