import styled, { css } from "styled-components";
import { palette } from "../../theme";

export const SegmentedTabList = styled.div`
  display: flex;
  gap: 0.35rem;
  padding: 0.25rem;
  margin-bottom: 1.5rem;
  background: ${palette.bgTabsWell};
  border-radius: 12px;
  border: 1px solid ${palette.borderDefault};
`;

export const SegmentedTab = styled.button<{ $active?: boolean }>`
  flex: 1;
  padding: 0.6rem 0.75rem;
  border: none;
  border-radius: 9px;
  background: transparent;
  color: ${palette.textMuted};
  font-size: 0.875rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition:
    color 0.15s ease,
    background 0.15s ease;

  &:hover {
    color: ${palette.textPrimary};
  }

  ${(p) =>
    p.$active &&
    css`
      background: ${palette.bgTabActive};
      color: ${palette.textPrimary};
      box-shadow: 0 1px 0 ${palette.borderTabInset};
    `}
`;
