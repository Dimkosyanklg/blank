import type { ComponentPropsWithoutRef } from "react";
import { StyledFluidColumn, StyledSpaceBetweenRow } from "./Layout.styles";

type BoxLikeProps = ComponentPropsWithoutRef<typeof StyledFluidColumn>;

export const FluidColumn = (props: BoxLikeProps) => <StyledFluidColumn {...props} />;

export const SpaceBetweenRow = (props: BoxLikeProps) => (
  <StyledSpaceBetweenRow {...props} />
);
