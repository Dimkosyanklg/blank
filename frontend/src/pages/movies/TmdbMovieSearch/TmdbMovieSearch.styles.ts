import styled from "styled-components";
import {
  ElevatedCard,
  FormField,
  FormLabel,
  InfoNotice,
  PrimaryButton,
  TextInput,
} from "../../../components/ui";
import { palette } from "../../../theme";

export const Card = styled(ElevatedCard)``;

export const Field = styled(FormField)``;

export const Label = styled(FormLabel)``;

export const SearchInput = styled(TextInput)`
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
