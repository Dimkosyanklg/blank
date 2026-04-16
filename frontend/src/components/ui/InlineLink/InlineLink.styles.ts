import { Link } from "@mui/material";
import styled from "styled-components";
import { palette } from "../../../theme";

export const StyledInlineLink = styled(Link)`
  && {
    color: ${palette.brand};
    text-decoration: none;
    font-weight: 500;
    cursor: pointer;
  }

  &&:hover {
    color: ${palette.brandHover};
    text-decoration: underline;
  }
`;
