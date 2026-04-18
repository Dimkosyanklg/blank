import styled from "styled-components";
import { palette } from "../../../theme";

export const MovieResultCard = styled.article`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.25rem;
  padding: 1rem;
  border-radius: 12px;
  background: ${palette.bgElevated};
  border: 1px solid ${palette.borderDefault};
  text-align: left;
`;

export const PosterWrap = styled.div`
  flex-shrink: 0;
  width: 7.5rem;
  border-radius: 8px;
  overflow: hidden;
  background: ${palette.bgInput};
  align-self: flex-start;
`;

export const Poster = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
`;

export const PosterPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7.5rem;
  aspect-ratio: 2 / 3;
  padding: 0.5rem;
  font-size: 0.6875rem;
  line-height: 1.3;
  text-align: center;
  color: ${palette.textMuted};
`;

export const MovieBody = styled.div`
  flex: 1;
  min-width: 0;
`;

export const MovieTitle = styled.h2`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.3;
  color: ${palette.textPrimary};
`;

export const MovieOriginal = styled.p`
  margin: 0.25rem 0 0;
  font-size: 0.8125rem;
  line-height: 1.35;
  color: ${palette.textMuted};
`;

export const MovieMeta = styled.p`
  margin: 0.5rem 0 0;
  font-size: 0.8125rem;
  line-height: 1.4;
  color: ${palette.textMuted};
`;

export const MovieOverview = styled.p`
  margin: 0.75rem 0 0;
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${palette.textPrimary};
`;
