import type { TmdbMovieSearchResultItem } from "../../../api/tmdbApi";
import * as SC from "./MovieHitCard.styles";

const TMDB_POSTER_BASE = "https://image.tmdb.org/t/p/w342";

const posterSrc = (path: string | null | undefined): string | null =>
  path ? `${TMDB_POSTER_BASE}${path}` : null;

const formatMeta = (m: TmdbMovieSearchResultItem): string => {
  const parts: string[] = [];
  if (m.release_date) parts.push(m.release_date);
  if (typeof m.vote_average === "number") {
    const avg = m.vote_average.toFixed(1);
    if (typeof m.vote_count === "number" && m.vote_count > 0) {
      parts.push(`${avg} ★ (${m.vote_count})`);
    } else {
      parts.push(`${avg} ★`);
    }
  }
  if (m.original_language) parts.push(m.original_language.toUpperCase());
  return parts.join(" · ");
};

type MovieHitCardProps = {
  movie: TmdbMovieSearchResultItem;
};

export const MovieHitCard = ({ movie }: MovieHitCardProps) => {
  const src = posterSrc(movie.poster_path);
  const meta = formatMeta(movie);
  const displayTitle = movie.title || movie.original_title || "Untitled";

  return (
    <SC.MovieResultCard aria-label="Search result">
      <SC.PosterWrap>
        {src ? (
          <SC.Poster src={src} alt={displayTitle} loading="lazy" />
        ) : (
          <SC.PosterPlaceholder>No poster</SC.PosterPlaceholder>
        )}
      </SC.PosterWrap>
      <SC.MovieBody>
        <SC.MovieTitle>{displayTitle}</SC.MovieTitle>
        {movie.original_title &&
          movie.title &&
          movie.original_title !== movie.title && (
            <SC.MovieOriginal>{movie.original_title}</SC.MovieOriginal>
          )}
        {meta ? <SC.MovieMeta>{meta}</SC.MovieMeta> : null}
        {movie.overview?.trim() ? (
          <SC.MovieOverview>{movie.overview.trim()}</SC.MovieOverview>
        ) : (
          <SC.MovieOverview>No overview.</SC.MovieOverview>
        )}
      </SC.MovieBody>
    </SC.MovieResultCard>
  );
};
