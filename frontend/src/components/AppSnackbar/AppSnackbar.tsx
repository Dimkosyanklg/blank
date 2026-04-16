import type {
  AlertColor,
  SnackbarCloseReason,
  SnackbarOrigin,
} from "@mui/material";
import * as SC from "./AppSnackbar.styles";

const DEFAULT_AUTO_DISMISS_MS = 3000;

export type AppSnackbarProps = {
  open: boolean;
  message: string;
  title?: string;
  severity?: AlertColor;
  autoHideDuration?: number;
  anchorOrigin?: SnackbarOrigin;
  closeOnClickaway?: boolean;
  onClose: () => void;
};

export const AppSnackbar = ({
  open,
  message,
  title,
  severity = "info",
  autoHideDuration = DEFAULT_AUTO_DISMISS_MS,
  anchorOrigin = { vertical: "bottom", horizontal: "right" },
  closeOnClickaway = false,
  onClose,
}: AppSnackbarProps) => {
  const handleClose = (_event?: unknown, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway" && !closeOnClickaway) {
      return;
    }
    onClose();
  };

  return (
    <SC.SnackbarRoot
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
    >
      <SC.Toast
        severity={severity}
        variant="filled"
        icon={false}
        onClose={handleClose}
        role="status"
        aria-live="polite"
      >
        {(title || message) && (
          <>
            <SC.ToastHeader>
              {title && <SC.Title as="p">{title}</SC.Title>}
              <SC.CloseButton
                size="small"
                onClick={onClose}
                aria-label="Dismiss notification"
              >
                ×
              </SC.CloseButton>
            </SC.ToastHeader>
            <SC.Text as="p">{message}</SC.Text>
          </>
        )}
      </SC.Toast>
    </SC.SnackbarRoot>
  );
};

