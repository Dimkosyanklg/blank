import { z } from "zod";

const emailField = z.pipe(
  z.string().min(1, "Email is required"),
  z.email({ error: "Invalid email" })
);

export const registerBodySchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: emailField,
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) =>
      data.confirmPassword === undefined ||
      data.confirmPassword === "" ||
      data.password === data.confirmPassword,
    { message: "Passwords do not match", path: ["confirmPassword"] }
  );

export const loginBodySchema = z.object({
  email: emailField,
  password: z.string().min(1, "Password is required"),
});

export type RegisterBody = z.infer<typeof registerBodySchema>;
export type LoginBody = z.infer<typeof loginBodySchema>;
