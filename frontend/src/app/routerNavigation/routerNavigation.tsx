import { useEffect } from "react";
import type { NavigateFunction } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { paths } from "../paths";

let navigateRef: NavigateFunction | null = null;

export function setRouterNavigate(fn: NavigateFunction | null): void {
  navigateRef = fn;
}

export function navigateToAuth(): void {
  if (navigateRef) {
    navigateRef(paths.auth, { replace: true });
  } else {
    window.location.assign(paths.auth);
  }
}

/** Вешает navigate из react-router для использования вне React (axios). */
export const RouterNavigationBridge = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setRouterNavigate(navigate);
    return () => setRouterNavigate(null);
  }, [navigate]);
  return null;
};
