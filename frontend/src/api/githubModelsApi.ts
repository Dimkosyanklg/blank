import { bffClient } from "./bffClient";
import { rejectAxios } from "./axiosErrors";

export type GithubModelsTestResponse = {
  model: string;
  reply?: string;
};

export async function githubModelsTestRequest(params?: {
  prompt?: string;
}): Promise<GithubModelsTestResponse> {
  try {
    const { data } = await bffClient.post<GithubModelsTestResponse>(
      "/github-models/test",
      { prompt: params?.prompt }
    );
    return data;
  } catch (e) {
    return rejectAxios(e);
  }
}
