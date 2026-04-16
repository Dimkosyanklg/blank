import { isAxiosError } from "axios";

export const API_ERROR_FALLBACK = "Something went wrong";

export const API_ERROR_NETWORK =
  "Couldn't reach the server. Check your network and that the BFF is running.";

export const messageFromResponseData = (data: unknown): string => {
  if (
    data &&
    typeof data === "object" &&
    "message" in data &&
    typeof (data as { message: unknown }).message === "string"
  ) {
    const m = (data as { message: string }).message.trim();
    if (m.length > 0) return m;
  }
  return API_ERROR_FALLBACK;
};

export const rejectAxios = (err: unknown): never => {
  if (isAxiosError(err)) {
    if (err.response) {
      throw new Error(messageFromResponseData(err.response.data));
    }
    throw new Error(API_ERROR_NETWORK);
  }
  throw err;
};
