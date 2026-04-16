import type { TypographyProps } from "@mui/material";
import {
  StyledScreenHeading,
  StyledSupportingText,
} from "./Typography.styles";

export const ScreenHeading = (props: TypographyProps<"h1">) => (
  <StyledScreenHeading component="h1" variant="h4" {...props} />
);

export const SupportingText = (props: TypographyProps<"p">) => (
  <StyledSupportingText component="p" variant="body2" {...props} />
);
