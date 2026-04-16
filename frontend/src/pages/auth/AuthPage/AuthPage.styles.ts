import styled from "styled-components";
import {
  CenteredScreen,
  DividerFootnote,
  ElevatedCard,
  FluidColumn,
  FormErrorText,
  FormField,
  FormLabel,
  GradientLogoMark,
  InfoNotice,
  InlineLink,
  PasswordControl,
  PasswordFieldInput,
  PasswordToggleButton,
  PrimaryButton,
  ScreenHeading,
  SegmentedTab,
  SegmentedTabList,
  SpaceBetweenRow,
  SupportingText,
  TextInput,
} from "../../../components/ui";
import { palette } from "../../../theme";

/** Фон экрана входа (градиенты и цвет текста — только для этой страницы). */
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
  max-width: 420px;
`;

export const Brand = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;

export const Logo = styled(GradientLogoMark)``;

export const Title = styled(ScreenHeading)``;

export const Subtitle = styled(SupportingText)``;

export const Card = styled(ElevatedCard)``;

export const Tabs = styled(SegmentedTabList)``;

export const Tab = styled(SegmentedTab)``;

export const Field = styled(FormField)``;

export const Label = styled(FormLabel)``;

export const Input = styled(TextInput)``;

export const PasswordWrap = styled(PasswordControl)``;

export const PasswordInput = styled(PasswordFieldInput)``;

export const PasswordToggle = styled(PasswordToggleButton)``;

export const ErrorText = styled(FormErrorText)``;

export const Row = styled(SpaceBetweenRow)`
  margin: -0.25rem 0 1.15rem;
  font-size: 0.8rem;
`;

export const ForgotPasswordRow = styled(Row)`
  justify-content: flex-end;
`;

export const Link = styled(InlineLink)``;

export const Submit = styled(PrimaryButton)`
  width: 100%;
  margin-top: 0.25rem;
`;

export const Message = styled(InfoNotice)``;

export const Footer = styled(DividerFootnote)``;
