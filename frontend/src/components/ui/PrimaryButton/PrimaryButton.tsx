import type { ButtonProps } from "@mui/material";
import { StyledPrimaryButton } from "./PrimaryButton.styles";

type PrimaryButtonProps = ButtonProps & {
  loading?: boolean;
  loadingText?: string;
};

export const PrimaryButton = ({
  loading = false,
  loadingText = "Please wait...",
  children,
  disabled,
  ...props
}: PrimaryButtonProps) => (
  <StyledPrimaryButton
    variant="contained"
    disableElevation
    disabled={disabled || loading}
    {...props}
  >
    {loading ? loadingText : children}
  </StyledPrimaryButton>
);
