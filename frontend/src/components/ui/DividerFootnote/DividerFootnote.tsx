import type { ComponentPropsWithoutRef } from "react";
import { StyledDividerFootnote } from "./DividerFootnote.styles";

type DividerFootnoteProps = ComponentPropsWithoutRef<typeof StyledDividerFootnote>;

export const DividerFootnote = (props: DividerFootnoteProps) => (
  <StyledDividerFootnote as="footer" {...props} />
);
