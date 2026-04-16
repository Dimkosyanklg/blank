import { z } from "zod";

const emailField = z.pipe(
  z.string().min(1, "Email is required"),
  z.email({ error: "Invalid email" })
);

/** Одна форма для RHF: обе схемы парсят в этот же набор полей. */
export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(8, "Minimum 8 characters"),
  name: z.string(),
  confirmPassword: z.string(),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: emailField,
    password: z.string().min(8, "Minimum 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type AuthFormValues = z.infer<typeof loginSchema>;

export const authDefaultValues: AuthFormValues = {
  email: "",
  password: "",
  name: "",
  confirmPassword: "",
};
