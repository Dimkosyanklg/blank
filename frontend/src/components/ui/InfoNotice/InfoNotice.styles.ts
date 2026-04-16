import { Alert } from "@mui/material";
import styled from "styled-components";
import { palette } from "../../../theme";

export const StyledInfoNotice = styled(Alert)`
  && {
    margin: 1rem 0 0;
    padding: 0.75rem 0.85rem;
    border-radius: 10px;
    background: ${palette.brandAlpha18};
    border: 1px solid ${palette.brandAlpha28};
    color: ${palette.textPrimary};
    font-size: 0.8rem;
    line-height: 1.45;
    text-align: center;
  }

  .MuiAlert-icon {
    display: none;
  }

  .MuiAlert-message {
    padding: 0;
    width: 100%;
  }
`;
