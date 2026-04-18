import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  CenteredScreen,
  FluidColumn,
  ScreenHeading,
  SupportingText,
} from "../../../components/ui";
import { palette } from "../../../theme";

export const Page = styled(CenteredScreen)`
  background: ${palette.bgApp};
  background-image:
    radial-gradient(
      ellipse 120% 80% at 50% -20%,
      ${palette.brandAlpha18},
      transparent 55%
    ),
    radial-gradient(
      ellipse 60% 40% at 100% 100%,
      ${palette.atmosphereCyan},
      transparent 50%
    );
  color: ${palette.textPrimary};
`;

export const Layout = styled(FluidColumn)`
  max-width: 520px;
  width: 100%;
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const Title = styled(ScreenHeading)``;

export const Subtitle = styled(SupportingText)``;

export const BackNav = styled.div`
  text-align: center;
  margin-top: 0.5rem;
`;

export const TextNavLink = styled(Link)`
  color: ${palette.brand};
  font-weight: 500;
  text-decoration: none;

  &:hover {
    color: ${palette.brandHover};
    text-decoration: underline;
  }
`;
