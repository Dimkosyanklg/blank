import type { RequestHandler, Response } from "express";
import { clearAuthCookie, getAuthCookieName } from "../helpers/authCookie";
import { verifyAuthToken } from "../helpers/jwt";
import * as userRepository from "../repositories/user";
import "../types/express-augment";

const sendUnauthorized = (res: Response, message: string) => {
  res.status(401).json({ message });
};

export const requireAuth: RequestHandler = async (req, res, next) => {
  const raw = req.cookies?.[getAuthCookieName()] as string | undefined;
  const token = typeof raw === "string" ? raw.trim() : "";
  if (!token) {
    sendUnauthorized(res, "Не авторизован");
    return;
  }

  const payload = await verifyAuthToken(token);
  if (!payload) {
    clearAuthCookie(res);
    sendUnauthorized(res, "Сессия недействительна");
    return;
  }

  const userRecord = await userRepository.findUserById(payload.userId);
  if (!userRecord) {
    clearAuthCookie(res);
    sendUnauthorized(res, "Пользователь не найден");
    return;
  }

  req.authUser = userRepository.toPublicUser(userRecord);
  next();
};
