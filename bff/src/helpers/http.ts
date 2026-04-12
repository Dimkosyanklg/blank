import type { Response } from "express";
import type { ZodError } from "zod";

const validationMessage = (err: ZodError): string =>
  err.issues[0]?.message ?? "Некорректные данные";

export const sendValidationError = (res: Response, err: ZodError): void => {
  res.status(400).json({ message: validationMessage(err) });
};
