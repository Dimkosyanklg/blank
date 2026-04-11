import styled from "styled-components";
import { palette } from "../../theme";

export const ScreenHeading = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.02em;
`;

export const SupportingText = styled.p`
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
  color: ${palette.textMuted};
  line-height: 1.45;
`;
