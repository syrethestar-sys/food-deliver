"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/providers/auth-provider";
import { ForgotPasswordForm } from "./_features/forgot-password-form";
import { VerifyEmail } from "./_features/verify-email";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ email: "" });

  const update = (patch) => setForm((current) => ({ ...current, ...patch }));

  const complete = () => {
    setUser({ email: form.email });
    router.push("/");
  };

  return (
    <div className="space-y-6">
      {step === 1 ? (
        <ForgotPasswordForm
          email={form.email}
          onEmailChange={(email) => update({ email })}
          onNext={() => setStep(2)}
        />
      ) : (
        <VerifyEmail
          email={form.email}
          onBack={() => setStep(1)}
          onDone={complete}
        />
      )}
    </div>
  );
}
