import styled from "styled-components";
import {
  CenteredScreen,
  ElevatedCard,
  FluidColumn,
  FormField,
  FormLabel,
  InfoNotice,
  PrimaryButton,
  ScreenHeading,
  SupportingText,
  TextInput,
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

export const Card = styled(ElevatedCard)``;

export const Field = styled(FormField)``;

export const Label = styled(FormLabel)``;

export const PromptInput = styled(TextInput)`
  min-height: 5.5rem;
  resize: vertical;
  line-height: 1.45;
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.25rem;
`;

export const ActionButton = styled(PrimaryButton)`
  flex: 1;
  min-width: 140px;
`;

export const ModelTag = styled.span`
  display: inline-block;
  margin-top: 0.75rem;
  font-size: 0.75rem;
  color: ${palette.textMuted};
`;

export const ReplyBox = styled(InfoNotice)`
  margin-top: 1rem;
  white-space: pre-wrap;
  word-break: break-word;
`;

export const ErrorBox = styled(InfoNotice)`
  margin-top: 1rem;
  border-color: ${palette.dangerAlpha45};
  color: ${palette.danger};
`;
