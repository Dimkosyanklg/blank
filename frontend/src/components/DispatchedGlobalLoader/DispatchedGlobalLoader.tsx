import CircularProgress from "@mui/material/CircularProgress";
import { useAppSelector } from "../../store/hooks";
import { palette } from "../../theme";
import { Overlay } from "./DispatchedGlobalLoader.styles";

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
    <Overlay open aria-busy="true" aria-live="polite">
      <CircularProgress
        size={48}
        thickness={4}
        sx={{ color: palette.brand }}
        aria-label="Loading"
      />
    </Overlay>
  );
};
