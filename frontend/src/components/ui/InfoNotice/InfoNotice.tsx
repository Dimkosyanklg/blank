import type { AlertProps } from "@mui/material";
import { StyledInfoNotice } from "./InfoNotice.styles";

export const InfoNotice = (props: AlertProps) => (
  <StyledInfoNotice severity="info" {...props} />
);
