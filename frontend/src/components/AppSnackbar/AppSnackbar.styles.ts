import { Alert, IconButton, Snackbar, Typography } from "@mui/material";
import styled from "styled-components";
import { palette } from "../../theme";

export const SnackbarRoot = styled(Snackbar)`
  .MuiSnackbar-root & {
    z-index: 1400;
  }
`;

export const Toast = styled(Alert)`
  && {
    width: min(360px, calc(100vw - 2rem));
    border-radius: 12px;
    border: 1px solid ${palette.borderDefault};
    background: ${palette.bgElevated};
    color: ${palette.textPrimary};
    box-shadow:
      0 4px 24px ${palette.shadowDeep},
      0 0 0 1px ${palette.brandAlpha18};
    padding: 0.95rem 0.95rem 0.85rem;
    align-items: flex-start;
  }

  && .MuiAlert-message {
    width: 100%;
    padding: 0;
  }
`;

export const ToastHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.4rem;
`;

export const Title = styled(Typography)`
  && {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.3;
  }
`;

export const CloseButton = styled(IconButton)`
  && {
    padding: 0;
  }

  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  margin: -0.2rem -0.25rem 0 0;
  padding: 0;
  border-radius: 8px;
  background: transparent;
  color: ${palette.textMuted};
  font-size: 1.35rem;
  line-height: 1;
  cursor: pointer;
  transition:
    color 0.15s ease,
    background 0.15s ease;

  &:hover {
    color: ${palette.textPrimary};
    background: rgba(255, 255, 255, 0.06);
  }

  &:focus-visible {
    outline: 2px solid ${palette.brandAlpha55};
    outline-offset: 1px;
  }
`;

export const Text = styled(Typography)`
  && {
    margin: 0;
    font-size: 0.85rem;
    line-height: 1.45;
  }

  color: ${palette.textMuted};
`;
