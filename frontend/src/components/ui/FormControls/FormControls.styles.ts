import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import styled from "styled-components";
import { palette } from "../../../theme";

export const StyledFormField = styled(FormControl)`
  && {
    margin-bottom: 1rem;
    width: 100%;
  }
`;

export const StyledFormLabel = styled(InputLabel)`
  && {
    position: static;
    transform: none;
    display: block;
    margin-bottom: 0.4rem;
    font-size: 0.8rem;
    font-weight: 500;
    color: ${palette.textMuted};
    line-height: 1.2;
    pointer-events: auto;
  }
`;

export const StyledPasswordControl = styled(Box)`
  position: relative;
  width: 100%;
`;

export const StyledTextInput = styled(OutlinedInput)`
  && {
    width: 100%;
    border-radius: 10px;
    background: ${palette.bgInput};
    color: ${palette.textPrimary};
    font-size: 0.95rem;
    font-family: inherit;
  }

  && .MuiOutlinedInput-notchedOutline {
    border-color: ${palette.borderDefault};
    transition:
      border-color 0.15s ease,
      box-shadow 0.15s ease;
  }

  && .MuiOutlinedInput-input {
    padding: 0.7rem 0.85rem;
  }

  && .MuiOutlinedInput-input::placeholder {
    color: ${palette.textPlaceholder};
    opacity: 1;
  }

  &&.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${palette.brandAlpha55};
    box-shadow: 0 0 0 3px ${palette.brandAlpha18};
  }

  &&.Mui-error .MuiOutlinedInput-notchedOutline {
    border-color: ${palette.dangerAlpha45};
  }

  &&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${palette.dangerAlpha65};
    box-shadow: 0 0 0 3px ${palette.dangerAlpha15};
  }
`;

export const StyledPasswordFieldInput = styled(StyledTextInput)`
  && .MuiOutlinedInput-input {
    padding-right: 2.75rem;
  }
`;

export const StyledPasswordToggleButton = styled(IconButton)`
  && {
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
    border-radius: 8px;
    background: transparent;
    color: ${palette.textMuted};
    transition:
      color 0.15s ease,
      background 0.15s ease;
  }

  &&:hover {
    color: ${palette.textPrimary};
    background: rgba(255, 255, 255, 0.06);
  }

  &&:focus-visible {
    outline: 2px solid ${palette.brandAlpha55};
    outline-offset: 1px;
  }
`;

export const StyledFormErrorText = styled(FormHelperText)`
  && {
    margin: 0.35rem 0 0;
    font-size: 0.75rem;
    color: ${palette.danger};
    line-height: 1.35;
  }
`;

export const StyledCheckboxFieldLabel = styled(FormControlLabel)`
  && {
    margin: 0;
    gap: 0.45rem;
    color: ${palette.textMuted};
    user-select: none;
  }

  && .MuiCheckbox-root {
    padding: 0;
    width: 1rem;
    height: 1rem;
    color: ${palette.brand};
  }

  && .MuiTypography-root {
    font-size: 0.9rem;
  }
`;
