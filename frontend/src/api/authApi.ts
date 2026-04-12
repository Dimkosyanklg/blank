import { bffClient } from "./bffClient";
import { rejectAxios } from "./axiosErrors";

export const AUTH_TOKEN_KEY = "bff_auth_token";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
};

type AuthSuccess = { user: AuthUser; token: string };

export async function loginRequest(params: {
  email: string;
  password: string;
}): Promise<AuthSuccess> {
  try {
    const { data } = await bffClient.post<AuthSuccess>("/auth/login", {
      email: params.email.trim(),
      password: params.password,
    });
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
}): Promise<AuthSuccess> {
  try {
    const { data } = await bffClient.post<AuthSuccess>("/auth/register", {
      name: params.name.trim(),
      email: params.email.trim(),
      password: params.password,
      confirmPassword: params.confirmPassword,
    });
    return data;
  } catch (e) {
    return rejectAxios(e);
  }
}

export function persistAuthToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}
