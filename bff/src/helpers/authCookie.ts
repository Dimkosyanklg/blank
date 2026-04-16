import type { Response } from "express";

const cookieName = () =>
  (process.env.AUTH_COOKIE_NAME || "bff_auth").trim() || "bff_auth";

const maxAgeSeconds = 7 * 24 * 60 * 60;

const baseCookieAttrs = (): string[] => {
  const sameSite = (process.env.AUTH_COOKIE_SAMESITE || "lax").toLowerCase();
  const allowed = new Set(["lax", "strict", "none"]);
  const samesiteValue = allowed.has(sameSite) ? sameSite : "lax";
  const secure =
    samesiteValue === "none" ||
    process.env.AUTH_COOKIE_SECURE === "1" ||
    process.env.NODE_ENV === "production";
  const parts = [`Path=/`, `HttpOnly`, `SameSite=${samesiteValue}`];
  if (secure) {
    parts.push("Secure");
  }
  return parts;
};

export const getAuthCookieName = (): string => cookieName();

export const setAuthCookie = (res: Response, token: string): void => {
  const name = cookieName();
  const value = encodeURIComponent(token);
  const attrs = [`${name}=${value}`, `Max-Age=${maxAgeSeconds}`, ...baseCookieAttrs()];
  res.append("Set-Cookie", attrs.join("; "));
};

export const clearAuthCookie = (res: Response): void => {
  const name = cookieName();
  const attrs = [`${name}=`, `Max-Age=0`, ...baseCookieAttrs()];
  res.append("Set-Cookie", attrs.join("; "));
};
