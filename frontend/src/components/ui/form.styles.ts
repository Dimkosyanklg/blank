import styled from "styled-components";
import { palette } from "../../theme";

export const FormField = styled.div`
  margin-bottom: 1rem;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.4rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: ${palette.textMuted};
`;

export const PasswordControl = styled.div`
  position: relative;
  width: 100%;
`;

export const TextInput = styled.input`
  width: 100%;
  padding: 0.7rem 0.85rem;
  border: 1px solid ${palette.borderDefault};
  border-radius: 10px;
  background: ${palette.bgInput};
  color: ${palette.textPrimary};
  font-size: 0.95rem;
  font-family: inherit;
  outline: none;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &::placeholder {
    color: ${palette.textPlaceholder};
  }

  &:focus {
    border-color: ${palette.brandAlpha55};
    box-shadow: 0 0 0 3px ${palette.brandAlpha18};
  }

  &[aria-invalid="true"] {
    border-color: ${palette.dangerAlpha45};
  }

  &[aria-invalid="true"]:focus {
    border-color: ${palette.dangerAlpha65};
    box-shadow: 0 0 0 3px ${palette.dangerAlpha15};
  }
`;

export const PasswordFieldInput = styled(TextInput)`
  padding-right: 2.75rem;
`;

export const PasswordToggleButton = styled.button`
  position: absolute;
  right: 0.2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.35rem;
  height: 2.35rem;
  padding: 0;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: ${palette.textMuted};
  cursor: pointer;
  transition:
    color 0.15s ease,
    background 0.15s ease;

  &:hover {
    color: ${palette.textPrimary};
    background: rgba(255, 255, 255, 0.06);
  }

  &:focus-visible {
    outline: 2px solid ${palette.brandAlpha55};
    outline-offset: 1px;
  }
`;

export const FormErrorText = styled.span`
  display: block;
  margin-top: 0.35rem;
  font-size: 0.75rem;
  color: ${palette.danger};
  line-height: 1.35;
`;

export const CheckboxFieldLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  color: ${palette.textMuted};
  cursor: pointer;
  user-select: none;

  input {
    width: 1rem;
    height: 1rem;
    accent-color: ${palette.brand};
    cursor: pointer;
  }
`;
