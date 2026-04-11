import { z } from "zod";

/** Одна форма для RHF: обе схемы парсят в этот же набор полей. */
export const loginSchema = z.object({
  email: z.string().min(1, "Введите email").email("Некорректный email"),
  password: z.string().min(8, "Минимум 8 символов"),
  name: z.string(),
  confirmPassword: z.string(),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, "Введите имя"),
    email: z.string().min(1, "Введите email").email("Некорректный email"),
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
