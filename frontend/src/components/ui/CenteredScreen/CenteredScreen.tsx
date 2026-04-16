import type { ComponentPropsWithoutRef } from "react";
import { StyledCenteredScreen } from "./CenteredScreen.styles";

type CenteredScreenProps = ComponentPropsWithoutRef<typeof StyledCenteredScreen>;

export const CenteredScreen = (props: CenteredScreenProps) => (
  <StyledCenteredScreen {...props} />
);
