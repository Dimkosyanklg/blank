import type { Request, RequestHandler, Response } from "express";
import { clearAuthCookie, setAuthCookie } from "../helpers/authCookie";
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
      message: "An account with this email already exists",
    });
    return;
  }

  setAuthCookie(res, result.token);
  res.status(201).json({ user: result.user });
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
  const authFailedMessage = "Invalid email or password";

  if (!result.ok) {
    res.status(401).json({ message: authFailedMessage });
    return;
  }

  setAuthCookie(res, result.token);
  res.status(200).json({ user: result.user });
};

export const logout: RequestHandler = (_req: Request, res: Response) => {
  clearAuthCookie(res);
  res.status(204).end();
};
