import type { Request, RequestHandler, Response } from "express";
import { sendValidationError } from "../helpers/http";
import { loginBodySchema, registerBodySchema } from "../schemas/auth";
import * as authService from "../services/auth";

export const register: RequestHandler = async (
  req: Request<unknown, unknown, unknown>,
  res: Response
) => {
  const parsed = registerBodySchema.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, parsed.error);
    return;
  }

  const result = await authService.registerUser(parsed.data);

  if (!result.ok) {
    res.status(409).json({
      message: "Пользователь с таким email уже зарегистрирован",
    });
    return;
  }

  res.status(201).json({ user: result.user, token: result.token });
};

export const login: RequestHandler = async (
  req: Request<unknown, unknown, unknown>,
  res: Response
) => {
  const parsed = loginBodySchema.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, parsed.error);
    return;
  }

  const result = await authService.loginUser(parsed.data);
  const authFailedMessage = "Неверный email или пароль";

  if (!result.ok) {
    res.status(401).json({ message: authFailedMessage });
    return;
  }

  res.status(200).json({ user: result.user, token: result.token });
};
