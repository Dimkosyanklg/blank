import { Backdrop } from "@mui/material";
import styled from "styled-components";
import { palette } from "../../theme";

export const Overlay = styled(Backdrop)`
  && {
    z-index: 2000;
    background: ${palette.bgApp};
    background-image:
      radial-gradient(
        ellipse 120% 80% at 50% -20%,
        ${palette.brandAlpha18},
        transparent 55%
      ),
      radial-gradient(
        ellipse 60% 40% at 100% 100%,
        ${palette.atmosphereCyan},
        transparent 50%
      );
  }
`;
