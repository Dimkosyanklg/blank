import { bffClient } from "./bffClient";
import { rejectAxios } from "./axiosErrors";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
};

type AuthSuccessBody = { user: AuthUser };

export async function loginRequest(params: {
  email: string;
  password: string;
}): Promise<AuthSuccessBody> {
  try {
    const { data } = await bffClient.post<AuthSuccessBody>(
      "/auth/login",
      {
        email: params.email.trim(),
        password: params.password,
      },
      { skipAuthRedirect: true }
    );
    return data;
  } catch (e) {
    return rejectAxios(e);
  }
}

export async function registerRequest(params: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}): Promise<AuthSuccessBody> {
  try {
    const { data } = await bffClient.post<AuthSuccessBody>(
      "/auth/register",
      {
        name: params.name.trim(),
        email: params.email.trim(),
        password: params.password,
        confirmPassword: params.confirmPassword,
      },
      { skipAuthRedirect: true }
    );
    return data;
  } catch (e) {
    return rejectAxios(e);
  }
}

/** Текущий пользователь по HttpOnly-куке (без глобального лоадера — свой на обёртке). */
export async function fetchCurrentUser(): Promise<AuthUser> {
  try {
    const { data } = await bffClient.get<{ user: AuthUser }>("/user");
    return data.user;
  } catch (e) {
    return rejectAxios(e);
  }
}

export async function logoutRequest(): Promise<void> {
  try {
    await bffClient.post("/auth/logout");
  } catch (e) {
    return rejectAxios(e);
  }
}
