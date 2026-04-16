import type { LinkProps } from "@mui/material";
import { StyledInlineLink } from "./InlineLink.styles";

export const InlineLink = (props: LinkProps<"a">) => (
  <StyledInlineLink underline="none" {...props} />
);
