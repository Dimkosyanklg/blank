import type { PublicUser } from "./user";

declare global {
  namespace Express {
    interface Request {
      /** Публичный профиль после успешной проверки JWT и загрузки из БД. */
      authUser?: PublicUser;
    }
  }
}

export {};
