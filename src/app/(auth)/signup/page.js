"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { StepOne } from "./_features/step-one";
import { StepTwo } from "./_features/step-two";
import { StepDots } from "./_components/step-dots";
import { signUpSchema, stepOneSchema } from "@/lib/validation/signup";
import { server } from "@/app/api/api.js";

const TOTAL_STEPS = 2;

export default function SignUpPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});

  const goNext = () => {
    const parsed = stepOneSchema.safeParse(form);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      return;
    }
    setErrors({});
    setStep(2);
  };

  const complete = async () => {
    const parsed = signUpSchema.safeParse(form);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      return;
    }
    setErrors({});

    try {
      const response = await server.post("/auth/sign-up", {
        email: form.email,
        password: form.password,
      });
      setUser({ email: form.email });
      router.push("/admin/food-menu");
      localStorage.setItem('user', JSON.stringify(response.data.user))
      console.log(response,`response`);
    } catch (err) {
      setErrors({ confirm: ["Something went wrong. Please try again."] });
      console.error(err);
    }
  };

  const update = (patch) => setForm((current) => ({ ...current, ...patch }));

  return (
    <div className="space-y-6">
      <StepDots total={TOTAL_STEPS} current={step} />
      {step === 1 ? (
        <StepOne
          form={form}
          errors={errors}
          onChange={update}
          onNext={goNext}
        />
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
