"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/providers/auth-provider";
import { StepOne } from "./_features/step-one";
import { StepTwo } from "./_features/step-two";
import { StepDots } from "./_components/step-dots";

const TOTAL_STEPS = 2;

export default function SignUpPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });

  const update = (patch) => setForm((current) => ({ ...current, ...patch }));

  const complete = () => {
    setUser({ email: form.email });
    router.push("/");
  };

  return (
    <div className="space-y-6">
      <StepDots total={TOTAL_STEPS} current={step} />
      {step === 1 ? (
        <StepOne form={form} onChange={update} onNext={() => setStep(2)} />
      ) : (
        <StepTwo
          form={form}
          onChange={update}
          onBack={() => setStep(1)}
          onDone={complete}
        />
      )}
    </div>
  );
}
