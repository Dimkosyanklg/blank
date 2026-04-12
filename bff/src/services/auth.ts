import { createAuthToken } from "../helpers/jwt";
import * as userRepository from "../repositories/user";
import type { LoginBody, RegisterBody } from "../schemas/auth";

export const registerUser = async (data: RegisterBody) => {
  const { name, email, password } = data;
  const result = await userRepository.createUser(name, email, password);

  if (!result.ok) {
    return { ok: false as const, code: "EMAIL_EXISTS" as const };
  }

  const user = userRepository.toPublicUser(result.user);
  const token = await createAuthToken(user.id, user.email);
  return { ok: true as const, user, token };
};

export const loginUser = async (data: LoginBody) => {
  const user = await userRepository.findUserByEmail(data.email);
  if (!user) {
    return { ok: false as const, code: "INVALID_CREDENTIALS" as const };
  }

  const passwordOk = await userRepository.verifyUserPassword(user, data.password);
  if (!passwordOk) {
    return { ok: false as const, code: "INVALID_CREDENTIALS" as const };
  }

  const publicUser = userRepository.toPublicUser(user);
  const token = await createAuthToken(publicUser.id, publicUser.email);
  return { ok: true as const, user: publicUser, token };
};
