import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import { UserModel } from "../db/userModel";
import type { PublicUser } from "../types/user";

type UserRecord = PublicUser & {
  passwordHash: string;
  createdAt: string;
};

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const mapDoc = (doc: {
  _id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: Date;
}): UserRecord => ({
  id: doc._id,
  email: doc.email,
  name: doc.name,
  passwordHash: doc.passwordHash,
  createdAt:
    doc.createdAt instanceof Date
      ? doc.createdAt.toISOString()
      : new Date(doc.createdAt as unknown as string).toISOString(),
});

export const createUser = async (
  name: string,
  email: string,
  password: string
): Promise<
  { ok: true; user: UserRecord } | { ok: false; code: "EMAIL_EXISTS" }
> => {
  const key = normalizeEmail(email);
  const passwordHash = await bcrypt.hash(password, 10);
  const id = randomUUID();
  const now = new Date();

  try {
    await UserModel.create({
      _id: id,
      email: key,
      name: name.trim(),
      passwordHash,
      createdAt: now,
    });
    return {
      ok: true,
      user: {
        id,
        email: key,
        name: name.trim(),
        passwordHash,
        createdAt: now.toISOString(),
      },
    };
  } catch (err: unknown) {
    if (
      err &&
      typeof err === "object" &&
      "code" in err &&
      (err as { code: unknown }).code === 11000
    ) {
      return { ok: false, code: "EMAIL_EXISTS" };
    }
    throw err instanceof Error ? err : new Error(String(err));
  }
};

export const findUserByEmail = async (
  email: string
): Promise<UserRecord | undefined> => {
  const doc = await UserModel.findOne({ email: normalizeEmail(email) }).lean();
  return doc ? mapDoc(doc) : undefined;
};

export const verifyUserPassword = async (
  user: UserRecord,
  password: string
): Promise<boolean> => bcrypt.compare(password, user.passwordHash);

export const toPublicUser = (user: UserRecord): PublicUser => ({
  id: user.id,
  email: user.email,
  name: user.name,
});
