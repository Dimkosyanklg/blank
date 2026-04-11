import styled from "styled-components";
import { palette } from "../../theme";

export const DividerFootnote = styled.footer`
  margin-top: 1.35rem;
  padding-top: 1.25rem;
  border-top: 1px solid ${palette.borderDefault};
  text-align: center;
  font-size: 0.8rem;
  color: ${palette.textMuted};
  line-height: 1.5;
`;
