import { Box } from "@mui/material";
import styled from "styled-components";
import { palette } from "../../../theme";

export const StyledBrandMark = styled(Box)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: linear-gradient(
    145deg,
    ${palette.brand},
    ${palette.brandSecondary}
  );
  color: ${palette.white};
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 1rem;
  box-shadow: 0 12px 40px ${palette.brandAlpha35};
`;
