import styled from "styled-components";
import { palette } from "../../theme";

export const InlineLink = styled.a`
  color: ${palette.brand};
  text-decoration: none;
  font-weight: 500;

  &:hover {
    color: ${palette.brandHover};
    text-decoration: underline;
  }
`;
