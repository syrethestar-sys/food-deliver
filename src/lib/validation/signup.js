import { z } from "zod";

const baseSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/\d/, "Password must include a number")
    .regex(/[^A-Za-z0-9]/, "Password must include a symbol"),
  confirm: z.string().min(1, "Please confirm your password"),
});

export const stepOneSchema = baseSchema.pick({ email: true });

export const signUpSchema = baseSchema.refine(
  (data) => data.password === data.confirm,
  { message: "Passwords do not match", path: ["confirm"] },
);
