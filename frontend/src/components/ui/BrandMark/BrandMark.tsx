import type { ComponentPropsWithoutRef } from "react";
import { StyledBrandMark } from "./BrandMark.styles";

export type GradientLogoMarkProps = ComponentPropsWithoutRef<
  typeof StyledBrandMark
>;

export const GradientLogoMark = (props: GradientLogoMarkProps) => (
  <StyledBrandMark {...props} />
);
