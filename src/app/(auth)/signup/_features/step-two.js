"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthHeader } from "@/components/auth-header";
import { FieldError } from "@/components/field-error";

const isStrong = (value) =>
  value.length >= 8 && /\d/.test(value) && /[^0-9]/.test(value) && /[^A-Za-z]/.test(value);

export function StepTwo({ form, onChange, onBack, onDone }) {
  const [data, setData] = useState()
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({ password: "", confirm: "" });

  const handleSubmit = (event) => {
    event.preventDefault();

    const next = { password: "", confirm: "" };

    if (form.password.length < 8) {
      next.password = "Password must be at least 8 characters long";
    } else if (!isStrong(form.password)) {
      next.password = "Weak password. Use numbers, letters and symbols.";
    }

    if (form.password !== form.confirm) {
      next.confirm = "Those passwords didn't match. Try again.";
    }

    setErrors(next);
    if (next.password || next.confirm) return;

    onDone?.();
  };

  const clearError = (field) => {
    setErrors((current) =>
      current[field] ? { ...current, [field]: "" } : current,
    );
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
          aria-invalid={errors.password ? true : undefined}
          onChange={(event) => {
            onChange({ password: event.target.value });
            clearError("password");
          }}
        />
        <FieldError>{errors.password}</FieldError>

        <Input
          type={show ? "text" : "password"}
          autoComplete="new-password"
          placeholder="Confirm"
          value={form.confirm}
          aria-invalid={errors.confirm ? true : undefined}
          onChange={(event) => {
            onChange({ confirm: event.target.value });
            clearError("confirm");
          }}
        />
        <FieldError>{errors.confirm}</FieldError>

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
