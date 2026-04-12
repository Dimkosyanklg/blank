import { SignJWT } from "jose";

const encoder = new TextEncoder();

const getSecret = (): Uint8Array => {
  const raw = (process.env.JWT_SECRET || "").trim();
  if (raw.length >= 16) {
    return encoder.encode(raw);
  }
  throw new Error("JWT_SECRET must be set (at least 16 characters)");
};

export const createAuthToken = async (
  userId: string,
  email: string
): Promise<string> => {
  const secret = getSecret();
  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
};
