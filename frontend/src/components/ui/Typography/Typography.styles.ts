import { Typography } from "@mui/material";
import styled from "styled-components";
import { palette } from "../../../theme";

export const StyledScreenHeading = styled(Typography)`
  && {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: -0.02em;
  }
`;

export const StyledSupportingText = styled(Typography)`
  && {
    margin: 0.5rem 0 0;
    font-size: 0.9rem;
    color: ${palette.textMuted};
    line-height: 1.45;
  }
`;
