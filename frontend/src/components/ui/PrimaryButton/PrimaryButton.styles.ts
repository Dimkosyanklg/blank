import { Button } from "@mui/material";
import styled from "styled-components";
import { palette } from "../../../theme";

export const StyledPrimaryButton = styled(Button)`
  && {
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 10px;
    background: linear-gradient(
      180deg,
      ${palette.brandHover},
      ${palette.brand}
    );
    color: ${palette.white};
    font-size: 0.95rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    text-transform: none;
    transition:
      transform 0.12s ease,
      box-shadow 0.12s ease,
      opacity 0.12s ease;
    box-shadow: 0 4px 20px ${palette.brandAlpha35};
  }

  &&:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 28px ${palette.brandAlpha35};
  }

  &&:active:not(:disabled) {
    transform: translateY(0);
  }

  &&:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;
