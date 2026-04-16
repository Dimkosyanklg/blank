import { Box } from "@mui/material";
import styled from "styled-components";
import { palette } from "../../../theme";

export const StyledDividerFootnote = styled(Box)`
  margin-top: 1.35rem;
  padding-top: 1.25rem;
  border-top: 1px solid ${palette.borderDefault};
  text-align: center;
  font-size: 0.8rem;
  color: ${palette.textMuted};
  line-height: 1.5;
`;
