import type { RequestHandler } from "express";
import got, { HTTPError } from "got";

/** TMDB GET /search/movie — проксируем тело ответа как есть (см. API reference). */
type TmdbSearchMovieItem = {
  adult?: boolean;
  backdrop_path?: string | null;
  genre_ids?: number[];
  id: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string | null;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
};

type TmdbSearchMoviesResponse = {
  page: number;
  results: TmdbSearchMovieItem[];
  total_pages: number;
  total_results: number;
};

export const testTmdb: RequestHandler = async (req, res) => {
  const token = (process.env.TMDB_API_READ_ACCESS_TOKEN || "").trim();
  if (!token) {
    return res.status(500).json({ message: "TMDB_API_READ_ACCESS_TOKEN is not set" });
  }

  const raw = req.query?.searchValue;
  const query = typeof raw === "string" ? raw.trim() : "";
  if (!query) {
    return res.status(400).json({ message: "searchValue is required" });
  }

  const url = `${process.env.TMDB_BASE_URL}/search/movie?${new URLSearchParams({
    query,
  })}`;

  try {
    const { body: upstreamJson } = await got<TmdbSearchMoviesResponse>(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      responseType: "json",
    });

    const first = upstreamJson.results?.[0];
    return res.status(200).json(first ?? null);
  } catch (err) {
    if (err instanceof HTTPError) {
      const raw =
        typeof err.response.body === "string"
          ? err.response.body
          : JSON.stringify(err.response.body);
      return res.status(502).json({
        message: `tmdb returned non-2xx: ${raw.trim()}`,
      });
    }
    return res.status(502).json({ message: "tmdb request failed" });
  }
};
