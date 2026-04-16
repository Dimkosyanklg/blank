import type {
  FormControlLabelProps,
  FormControlProps,
  FormHelperTextProps,
  IconButtonProps,
  InputLabelProps,
  OutlinedInputProps,
} from "@mui/material";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import {
  StyledCheckboxFieldLabel,
  StyledFormErrorText,
  StyledFormField,
  StyledFormLabel,
  StyledPasswordControl,
  StyledPasswordFieldInput,
  StyledPasswordToggleButton,
  StyledTextInput,
} from "./FormControls.styles";

type CompatibleInputProps = Omit<OutlinedInputProps, "multiline"> & {
  as?: "input" | "textarea";
  rows?: number;
};

const mapInputProps = (props: CompatibleInputProps) => {
  const { as, rows, error, ...rest } = props;
  const isMultiline = as === "textarea";
  const isAriaInvalid =
    rest["aria-invalid"] === true || rest["aria-invalid"] === "true";

  return {
    ...rest,
    error: error ?? isAriaInvalid,
    multiline: isMultiline,
    minRows: isMultiline ? rows : undefined,
  };
};

export const FormField = (props: FormControlProps) => (
  <StyledFormField variant="outlined" fullWidth {...props} />
);

export const FormLabel = (props: InputLabelProps) => (
  <StyledFormLabel shrink={false} {...props} />
);

export const PasswordControl = (
  props: ComponentPropsWithoutRef<typeof StyledPasswordControl>
) => <StyledPasswordControl {...props} />;

export const TextInput = forwardRef<HTMLInputElement, CompatibleInputProps>(
  (props, ref) => <StyledTextInput inputRef={ref} {...mapInputProps(props)} />
);

TextInput.displayName = "TextInput";

export const PasswordFieldInput = forwardRef<
  HTMLInputElement,
  CompatibleInputProps
>((props, ref) => (
  <StyledPasswordFieldInput inputRef={ref} {...mapInputProps(props)} />
));

PasswordFieldInput.displayName = "PasswordFieldInput";

export const PasswordToggleButton = (props: IconButtonProps) => (
  <StyledPasswordToggleButton size="small" {...props} />
);

export const FormErrorText = (props: FormHelperTextProps) => (
  <StyledFormErrorText error {...props} />
);

export const CheckboxFieldLabel = (props: FormControlLabelProps) => (
  <StyledCheckboxFieldLabel {...props} />
);
