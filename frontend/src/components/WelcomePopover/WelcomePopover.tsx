import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeWelcome, EWelcomeKind } from "../../store/welcomeSlice";
import * as SC from "./WelcomePopover.styles";

const AUTO_DISMISS_MS = 3000;

export const WelcomePopover = () => {
  const dispatch = useAppDispatch();
  const { open, displayName, kind } = useAppSelector((s) => s.welcome);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dispatch(closeWelcome());
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, dispatch]);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => {
      dispatch(closeWelcome());
    }, AUTO_DISMISS_MS);
    return () => window.clearTimeout(id);
  }, [open, dispatch]);

  if (!open || !displayName || !kind) {
    return null;
  }

  const title =
    kind === EWelcomeKind.Login ? "С возвращением!" : "Добро пожаловать!";
  const text =
    kind === EWelcomeKind.Login
      ? `${displayName}, рады видеть вас снова.`
      : `Аккаунт создан, ${displayName}. Можно пользоваться подборками активностей.`;

  const dismiss = () => dispatch(closeWelcome());

  return (
    <SC.Anchor aria-label="Приветствие">
      <SC.Toast
        role="status"
        aria-live="polite"
        aria-labelledby="welcome-toast-title"
      >
        <SC.ToastHeader>
          <SC.Title id="welcome-toast-title">{title}</SC.Title>
          <SC.CloseButton
            type="button"
            onClick={dismiss}
            aria-label="Закрыть уведомление"
          >
            ×
          </SC.CloseButton>
        </SC.ToastHeader>
        <SC.Text>{text}</SC.Text>
      </SC.Toast>
    </SC.Anchor>
  );
};
