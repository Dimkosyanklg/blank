import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";
import { useAppSelector } from "../../store/hooks";
import { palette } from "../../theme";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: grid;
  place-items: center;
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
`;

/**
 * Полноэкранный лоадер: показывается только при isVisible = true в Redux
 * (dispatch(showGlobalLoader) / hideGlobalLoader).
 */
export const DispatchedGlobalLoader = () => {
  const isVisible = useAppSelector((s) => s.loader.isVisible);
  if (!isVisible) {
    return null;
  }
  return (
    <Overlay aria-busy="true" aria-live="polite">
      <CircularProgress
        size={48}
        thickness={4}
        sx={{ color: palette.brand }}
        aria-label="Loading"
      />
    </Overlay>
  );
};
