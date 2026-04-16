import "axios";

declare module "axios" {
  interface AxiosRequestConfig {
    /** Не редиректить на /auth при 401 (логин, регистрация). */
    skipAuthRedirect?: boolean;
  }
}
