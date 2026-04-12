import { z } from "zod";

const emailField = z.pipe(
  z.string().min(1, "Введите email"),
  z.email({ error: "Некорректный email" })
);

export const registerBodySchema = z
  .object({
    name: z.string().min(1, "Имя обязательно"),
    email: emailField,
    password: z.string().min(8, "Пароль минимум 8 символов"),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) =>
      data.confirmPassword === undefined ||
      data.confirmPassword === "" ||
      data.password === data.confirmPassword,
    { message: "Пароли не совпадают", path: ["confirmPassword"] }
  );

export const loginBodySchema = z.object({
  email: emailField,
  password: z.string().min(1, "Введите пароль"),
});

export type RegisterBody = z.infer<typeof registerBodySchema>;
export type LoginBody = z.infer<typeof loginBodySchema>;
