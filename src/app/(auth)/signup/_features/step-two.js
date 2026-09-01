"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthHeader } from "@/components/auth-header";
import { FieldError } from "@/components/field-error";

// Step 2 — Create new password. Design states: Default / Destructive
// (passwords don't match, weak password) / Filled. Includes show-password toggle.
const isStrong = (value) =>
  value.length >= 8 && /\d/.test(value) && /[^A-Za-z0-9]/.test(value);

export function StepTwo({ form, onChange, onBack, onDone }) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.password !== form.confirm) {
      setError("Those password didn't match, Try again");
      return;
    }
    if (!isStrong(form.password)) {
      setError("Weak password. Use numbers and symbols.");
      return;
    }
    setError("");
    onDone?.();
  };

  const clearError = () => {
    if (error) setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <AuthHeader
        title="Create a strong password"
        description="Create a strong password with letters, numbers."
        onBack={onBack}
      />

      <div className="space-y-3">
        <Input
          type={show ? "text" : "password"}
          autoComplete="new-password"
          placeholder="Password"
          value={form.password}
          aria-invalid={error ? true : undefined}
          onChange={(event) => {
            onChange({ password: event.target.value });
            clearError();
          }}
        />
        <Input
          type={show ? "text" : "password"}
          autoComplete="new-password"
          placeholder="Confirm"
          value={form.confirm}
          aria-invalid={error ? true : undefined}
          onChange={(event) => {
            onChange({ confirm: event.target.value });
            clearError();
          }}
        />
        <FieldError>{error}</FieldError>

        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={show}
            onChange={(event) => setShow(event.target.checked)}
            className="size-4 rounded border-input accent-[#f0431c]"
          />
          Show password
        </label>
      </div>

      <Button
        type="submit"
        className="h-9 w-full"
        disabled={!form.password || !form.confirm}
      >
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
