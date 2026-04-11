import styled from "styled-components";
import { palette } from "../../theme";

export const ElevatedCard = styled.div`
  background: ${palette.bgElevated};
  border: 1px solid ${palette.borderDefault};
  border-radius: 18px;
  padding: 1.5rem 1.5rem 1.75rem;
  box-shadow: 0 24px 48px ${palette.shadowDeep};

  @media (max-width: 400px) {
    padding: 1.25rem 1.15rem 1.5rem;
  }
`;
