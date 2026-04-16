import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  authDefaultValues,
  loginSchema,
  registerSchema,
  type AuthFormValues,
} from "./auth.schema";
import * as SC from "./AuthPage.styles";
import { loginRequest, registerRequest } from "../../../api/authApi";
import { paths } from "../../../app/paths";
import { useAppDispatch } from "../../../store/hooks";
import { EWelcomeKind, openWelcome } from "../../../store/welcomeSlice";
import {
  PasswordHiddenIcon,
  PasswordVisibleIcon,
} from "./PasswordRevealIcons";

enum EAuthMode {
  Login = "login",
  Register = "register",
}

export const AuthPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<EAuthMode>(EAuthMode.Login);
  const [message, setMessage] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    clearErrors,
    formState: { errors, isSubmitting, isValid },
  } = useForm<AuthFormValues>({
    defaultValues: authDefaultValues,
    mode: "onChange",
    resolver: (values, context, options) =>
      zodResolver(mode === EAuthMode.Login ? loginSchema : registerSchema)(
        values,
        context,
        options
      ),
  });

  const switchMode = (next: EAuthMode) => {
    const current = getValues();
    reset({
      email: current.email,
      name: next === EAuthMode.Register ? current.name : "",
      password: "",
      confirmPassword: "",
    });
    setMode(next);
    setMessage(null);
    setPasswordVisible(false);
    setConfirmVisible(false);
    clearErrors();
  };

  const onSubmit = async (data: AuthFormValues) => {
    setMessage(null);
    try {
      if (mode === EAuthMode.Login) {
        const { user } = await loginRequest({
          email: data.email,
          password: data.password,
        });
        dispatch(openWelcome({ name: user.name, kind: EWelcomeKind.Login }));
        navigate(paths.home, { replace: true });
      } else {
        const { user } = await registerRequest({
          name: data.name,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        });
        dispatch(openWelcome({ name: user.name, kind: EWelcomeKind.Register }));
        navigate(paths.home, { replace: true });
      }
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Something went wrong");
    }
  };

  return (
    <SC.Page>
      <SC.Layout>
        <SC.Brand>
          <SC.Logo aria-hidden>✦</SC.Logo>
          <SC.Title>Find something to do</SC.Title>
          <SC.Subtitle>
            Movies, games, sports, and more — sign in to get personalized activity
            picks.
          </SC.Subtitle>
        </SC.Brand>

        <SC.Card>
          <SC.Tabs role="tablist" aria-label="Mode">
            <SC.Tab
              type="button"
              role="tab"
              aria-selected={mode === EAuthMode.Login}
              $active={mode === EAuthMode.Login}
              onClick={() => switchMode(EAuthMode.Login)}
            >
              Sign in
            </SC.Tab>
            <SC.Tab
              type="button"
              role="tab"
              aria-selected={mode === EAuthMode.Register}
              $active={mode === EAuthMode.Register}
              onClick={() => switchMode(EAuthMode.Register)}
            >
              Sign up
            </SC.Tab>
          </SC.Tabs>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {mode === EAuthMode.Register && (
              <SC.Field>
                <SC.Label htmlFor="auth-name">Name</SC.Label>
                <SC.Input
                  id="auth-name"
                  type="text"
                  autoComplete="name"
                  placeholder="How should we address you?"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "auth-name-error" : undefined}
                  {...register("name")}
                />
                {errors.name && (
                  <SC.ErrorText id="auth-name-error" role="alert">
                    {errors.name.message}
                  </SC.ErrorText>
                )}
              </SC.Field>
            )}

            <SC.Field>
              <SC.Label htmlFor="auth-email">Email</SC.Label>
              <SC.Input
                id="auth-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "auth-email-error" : undefined}
                {...register("email")}
              />
              {errors.email && (
                <SC.ErrorText id="auth-email-error" role="alert">
                  {errors.email.message}
                </SC.ErrorText>
              )}
            </SC.Field>

            <SC.Field>
              <SC.Label htmlFor="auth-password">Password</SC.Label>
              <SC.PasswordWrap>
                <SC.PasswordInput
                  id="auth-password"
                  type={passwordVisible ? "text" : "password"}
                  autoComplete={
                    mode === EAuthMode.Login
                      ? "current-password"
                      : "new-password"
                  }
                  placeholder="••••••••"
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password ? "auth-password-error" : undefined
                  }
                  {...register("password")}
                />
                <SC.PasswordToggle
                  type="button"
                  aria-label={
                    passwordVisible ? "Hide password" : "Show password"
                  }
                  aria-pressed={passwordVisible}
                  aria-controls="auth-password"
                  onClick={() => setPasswordVisible((v) => !v)}
                >
                  {passwordVisible ? (
                    <PasswordVisibleIcon />
                  ) : (
                    <PasswordHiddenIcon />
                  )}
                </SC.PasswordToggle>
              </SC.PasswordWrap>
              {errors.password && (
                <SC.ErrorText id="auth-password-error" role="alert">
                  {errors.password.message}
                </SC.ErrorText>
              )}
            </SC.Field>

            {mode === EAuthMode.Register && (
              <SC.Field>
                <SC.Label htmlFor="auth-confirm">Confirm password</SC.Label>
                <SC.PasswordWrap>
                  <SC.PasswordInput
                    id="auth-confirm"
                    type={confirmVisible ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    aria-invalid={!!errors.confirmPassword}
                    aria-describedby={
                      errors.confirmPassword
                        ? "auth-confirm-error"
                        : undefined
                    }
                    {...register("confirmPassword")}
                  />
                  <SC.PasswordToggle
                    type="button"
                    aria-label={
                      confirmVisible
                        ? "Hide password confirmation"
                        : "Show password confirmation"
                    }
                    aria-pressed={confirmVisible}
                    aria-controls="auth-confirm"
                    onClick={() => setConfirmVisible((v) => !v)}
                  >
                    {confirmVisible ? (
                      <PasswordVisibleIcon />
                    ) : (
                      <PasswordHiddenIcon />
                    )}
                  </SC.PasswordToggle>
                </SC.PasswordWrap>
                {errors.confirmPassword && (
                  <SC.ErrorText id="auth-confirm-error" role="alert">
                    {errors.confirmPassword.message}
                  </SC.ErrorText>
                )}
              </SC.Field>
            )}

            {mode === EAuthMode.Login && (
              <SC.ForgotPasswordRow>
                <SC.Link href="#recover">Forgot password?</SC.Link>
              </SC.ForgotPasswordRow>
            )}

            <SC.Submit type="submit" disabled={isSubmitting || !isValid}>
              {isSubmitting
                ? "Please wait…"
                : mode === EAuthMode.Login
                  ? "Sign in"
                  : "Create account"}
            </SC.Submit>
          </form>

          {message && <SC.Message>{message}</SC.Message>}

          <SC.Footer>
            By signing up, you agree to the terms of service for activity
            recommendations.
          </SC.Footer>
        </SC.Card>
      </SC.Layout>
    </SC.Page>
  );
};
