import { Box, ButtonBase } from "@mui/material";
import styled from "styled-components";
import { palette } from "../../../theme";

export const StyledSegmentedTabList = styled(Box)`
  display: flex;
  gap: 0.35rem;
  padding: 0.25rem;
  margin-bottom: 1.5rem;
  background: ${palette.bgTabsWell};
  border-radius: 12px;
  border: 1px solid ${palette.borderDefault};
`;

export const StyledSegmentedTab = styled(ButtonBase)<{ $active?: boolean }>`
  && {
    flex: 1;
    padding: 0.6rem 0.75rem;
    border: 1px solid transparent;
    border-radius: 9px;
    background: transparent;
    color: ${palette.textMuted};
    font-size: 0.875rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition:
      color 0.15s ease,
      background 0.15s ease,
      border-color 0.15s ease,
      box-shadow 0.15s ease;
  }

  &&:hover {
    color: ${palette.textPrimary};
    background: rgba(255, 255, 255, 0.04);
  }

  &&[aria-selected="true"] {
    background: ${palette.brandAlpha18};
    color: ${palette.textPrimary};
    border-color: ${palette.brandAlpha35};
    box-shadow:
      inset 0 0 0 1px ${palette.borderTabInset},
      0 0 0 2px ${palette.brandAlpha18};
    font-weight: 700;
  }
`;
