import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  authDefaultValues,
  loginSchema,
  registerSchema,
  type AuthFormValues,
} from "./auth.schema";
import * as SC from "./AuthPage.styles";
import {
  loginRequest,
  persistAuthToken,
  registerRequest,
} from "../../api/authApi";
import {
  PasswordHiddenIcon,
  PasswordVisibleIcon,
} from "./PasswordRevealIcons";

enum AuthMode {
  Login = "login",
  Register = "register",
}

export const AuthPage = () => {
  const [mode, setMode] = useState<AuthMode>(AuthMode.Login);
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
      zodResolver(mode === AuthMode.Login ? loginSchema : registerSchema)(
        values,
        context,
        options
      ),
  });

  const switchMode = (next: AuthMode) => {
    const current = getValues();
    reset({
      email: current.email,
      name: next === AuthMode.Register ? current.name : "",
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
      if (mode === AuthMode.Login) {
        const { user, token } = await loginRequest({
          email: data.email,
          password: data.password,
        });
        persistAuthToken(token);
        setMessage(`С возвращением, ${user.name}!`);
      } else {
        const { user, token } = await registerRequest({
          name: data.name,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        });
        persistAuthToken(token);
        setMessage(`Аккаунт создан. Добро пожаловать, ${user.name}!`);
      }
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Произошла ошибка");
    }
  };

  return (
    <SC.Page>
      <SC.Layout>
        <SC.Brand>
          <SC.Logo aria-hidden>✦</SC.Logo>
          <SC.Title>Найди, чем заняться</SC.Title>
          <SC.Subtitle>
            Фильмы, игры, спорт и другое — входите, чтобы получать персональные
            подборки активностей.
          </SC.Subtitle>
        </SC.Brand>

        <SC.Card>
          <SC.Tabs role="tablist" aria-label="Режим">
            <SC.Tab
              type="button"
              role="tab"
              aria-selected={mode === AuthMode.Login}
              $active={mode === AuthMode.Login}
              onClick={() => switchMode(AuthMode.Login)}
            >
              Вход
            </SC.Tab>
            <SC.Tab
              type="button"
              role="tab"
              aria-selected={mode === AuthMode.Register}
              $active={mode === AuthMode.Register}
              onClick={() => switchMode(AuthMode.Register)}
            >
              Регистрация
            </SC.Tab>
          </SC.Tabs>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {mode === AuthMode.Register && (
              <SC.Field>
                <SC.Label htmlFor="auth-name">Имя</SC.Label>
                <SC.Input
                  id="auth-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Как к вам обращаться"
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
              <SC.Label htmlFor="auth-password">Пароль</SC.Label>
              <SC.PasswordWrap>
                <SC.PasswordInput
                  id="auth-password"
                  type={passwordVisible ? "text" : "password"}
                  autoComplete={
                    mode === AuthMode.Login
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
                    passwordVisible ? "Скрыть пароль" : "Показать пароль"
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

            {mode === AuthMode.Register && (
              <SC.Field>
                <SC.Label htmlFor="auth-confirm">Повторите пароль</SC.Label>
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
                        ? "Скрыть подтверждение пароля"
                        : "Показать подтверждение пароля"
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

            {mode === AuthMode.Login && (
              <SC.ForgotPasswordRow>
                <SC.Link href="#recover">Забыли пароль?</SC.Link>
              </SC.ForgotPasswordRow>
            )}

            <SC.Submit type="submit" disabled={isSubmitting || !isValid}>
              {isSubmitting
                ? "Подождите…"
                : mode === AuthMode.Login
                  ? "Войти"
                  : "Создать аккаунт"}
            </SC.Submit>
          </form>

          {message && <SC.Message>{message}</SC.Message>}

          <SC.Footer>
            Регистрируясь, вы соглашаетесь с условиями использования сервиса
            подбора активностей.
          </SC.Footer>
        </SC.Card>
      </SC.Layout>
    </SC.Page>
  );
};
