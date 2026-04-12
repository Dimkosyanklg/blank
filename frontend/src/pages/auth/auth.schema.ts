import { z } from "zod";

const emailField = z.pipe(
  z.string().min(1, "Введите email"),
  z.email({ error: "Некорректный email" })
);

/** Одна форма для RHF: обе схемы парсят в этот же набор полей. */
export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(8, "Минимум 8 символов"),
  name: z.string(),
  confirmPassword: z.string(),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, "Введите имя"),
    email: emailField,
    password: z.string().min(8, "Минимум 8 символов"),
    confirmPassword: z.string().min(1, "Повторите пароль"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают.",
    path: ["confirmPassword"],
  });

export type AuthFormValues = z.infer<typeof loginSchema>;

export const authDefaultValues: AuthFormValues = {
  email: "",
  password: "",
  name: "",
  confirmPassword: "",
};
