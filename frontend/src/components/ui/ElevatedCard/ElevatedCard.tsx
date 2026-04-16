import type { CardProps } from "@mui/material";
import { StyledElevatedCard } from "./ElevatedCard.styles";

export const ElevatedCard = (props: CardProps) => (
  <StyledElevatedCard variant="outlined" {...props} />
);
