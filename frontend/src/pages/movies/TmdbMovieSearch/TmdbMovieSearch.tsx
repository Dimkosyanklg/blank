import { type ChangeEvent, useEffect, useState } from "react";
import {
  tmdbTestRequest,
  type TmdbMovieSearchResultItem,
} from "../../../api/tmdbApi";
import { MovieHitCard } from "./MovieHitCard";
import * as SC from "./TmdbMovieSearch.styles";

type TmdbMovieSearchProps = {
  disabled?: boolean;
  onBusyChange?: (busy: boolean) => void;
};

export const TmdbMovieSearch = ({
  disabled = false,
  onBusyChange,
}: TmdbMovieSearchProps) => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<TmdbMovieSearchResultItem | null | undefined>(
    undefined
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const busy = disabled || loading;

  useEffect(() => {
    onBusyChange?.(busy);
  }, [busy, onBusyChange]);

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const runSearch = async () => {
    setError(null);
    setResult(undefined);
    setLoading(true);
    try {
      const data = await tmdbTestRequest({ searchValue: query });
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SC.Card>
      <SC.Field>
        <SC.Label htmlFor="tmdb-movie-search">Movie title</SC.Label>
        <SC.SearchInput
          id="tmdb-movie-search"
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder='e.g. "Inception"'
          disabled={busy}
          autoComplete="off"
        />
      </SC.Field>
      <SC.Actions>
        <SC.ActionButton
          type="button"
          disabled={busy || !query.trim()}
          onClick={() => runSearch()}
        >
          {loading ? "Request…" : "Search"}
        </SC.ActionButton>
      </SC.Actions>
      {result !== undefined && result === null && (
        <SC.ReplyBox role="status">No matches for this search.</SC.ReplyBox>
      )}
      {result != null && <MovieHitCard movie={result} />}
      {error && <SC.ErrorBox role="alert">{error}</SC.ErrorBox>}
    </SC.Card>
  );
};
