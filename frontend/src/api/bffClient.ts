import axios, { isAxiosError } from "axios";
import { navigateToAuth } from "../app/routerNavigation";
import { store } from "../store";
import { clearUser } from "../store/userSlice";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const bffClient = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

bffClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const config = isAxiosError(error) ? error.config : undefined;
    if (
      isAxiosError(error) &&
      error.response?.status === 401 &&
      !config?.skipAuthRedirect
    ) {
      store.dispatch(clearUser());
      navigateToAuth();
    }
    return Promise.reject(error);
  }
);
