import styled, { keyframes } from "styled-components";
import { palette } from "../../theme";

const slideIn = keyframes`
  from {
    transform: translateX(calc(100% + 1.5rem));
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const Anchor = styled.aside`
  position: fixed;
  z-index: 1000;
  right: 1.25rem;
  bottom: 1.25rem;
  left: auto;
  top: auto;
  max-width: min(360px, calc(100vw - 2.5rem));
  pointer-events: none;

  @media (max-width: 480px) {
    right: 1rem;
    bottom: 1rem;
    max-width: calc(100vw - 2rem);
  }
`;

export const Toast = styled.div`
  pointer-events: auto;
  padding: 1rem 1rem 0.85rem;
  border-radius: 12px;
  border: 1px solid ${palette.borderDefault};
  background: ${palette.bgElevated};
  color: ${palette.textPrimary};
  box-shadow:
    0 4px 24px ${palette.shadowDeep},
    0 0 0 1px ${palette.brandAlpha18};
  animation: ${slideIn} 0.35s ease-out;
`;

export const ToastHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.4rem;
`;

export const Title = styled.p`
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.3;
`;

export const CloseButton = styled.button`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  margin: -0.2rem -0.25rem 0 0;
  padding: 0;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: ${palette.textMuted};
  font-size: 1.35rem;
  line-height: 1;
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

export const Text = styled.p`
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.45;
  color: ${palette.textMuted};
`;
