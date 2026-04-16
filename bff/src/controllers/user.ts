import type { Request, RequestHandler, Response } from "express";
import "../types/express-augment";

export const getCurrentUser: RequestHandler = (req: Request, res: Response) => {
  const user = req.authUser;
  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  res.status(200).json({ user });
};
