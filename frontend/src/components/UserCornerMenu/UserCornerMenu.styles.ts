import {
  Avatar,
  Box,
  ButtonBase,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import { palette } from "../../theme";

export const Wrap = styled(Box)`
  position: fixed;
  top: 1rem;
  right: 1.25rem;
  z-index: 900;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media (max-width: 480px) {
    top: 0.75rem;
    right: 0.75rem;
  }
`;

export const Trigger = styled(ButtonBase)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.5rem 0.35rem 0.35rem;
  border: 1px solid ${palette.borderDefault};
  border-radius: 999px;
  background: ${palette.bgElevated};
  color: ${palette.textPrimary};
  font-size: 0.85rem;
  font-family: inherit;
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    background 0.15s ease;

  &:hover:not(:disabled) {
    border-color: ${palette.brandAlpha35};
    background: ${palette.bgInput};
  }

  &:focus-visible {
    outline: 2px solid ${palette.brandAlpha55};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

export const UserAvatar = styled(Avatar)`
  && {
    width: 2rem;
    height: 2rem;
    font-size: 0.9rem;
    font-weight: 600;
  }

  background: ${palette.brandAlpha28};
  color: ${palette.brandHover};
`;

export const TriggerLabel = styled(Typography)`
  && {
    font-size: 0.85rem;
    line-height: 1.2;
  }

  max-width: 9rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 480px) {
    max-width: 5rem;
  }
`;

export const Chevron = styled(Typography)<{ $open: boolean }>`
  display: inline-block;
  font-size: 0.65rem;
  color: ${palette.textMuted};
  transform: rotate(${({ $open }) => ($open ? "180deg" : "0")});
  transition: transform 0.2s ease;
`;

export const DropdownMenu = styled(Menu)`
  .MuiPaper-root {
    min-width: 220px;
    max-width: min(280px, calc(100vw - 2rem));
    margin-top: 0.45rem;
    border-radius: 12px;
    border: 1px solid ${palette.borderDefault};
    background: ${palette.bgElevated};
    box-shadow: 0 12px 40px ${palette.shadowDeep};
  }

  .MuiList-root {
    padding: 0.65rem 0;
  }
`;

export const MenuUserBlock = styled(Box)`
  padding: 0.35rem 0.85rem 0.5rem;
`;

export const MenuName = styled(Typography)`
  && {
    font-size: 0.9rem;
    font-weight: 600;
    line-height: 1.3;
  }

  color: ${palette.textPrimary};
  word-break: break-word;
`;

export const MenuEmail = styled(Typography)`
  && {
    font-size: 0.75rem;
    line-height: 1.3;
  }

  margin-top: 0.2rem;
  color: ${palette.textMuted};
  word-break: break-all;
`;

export const MenuDivider = styled(Divider)`
  && {
    height: 1px;
  }

  margin: 0.35rem 0;
  border-color: ${palette.borderDefault};
`;

export const MenuActionItem = styled(MenuItem)`
  && {
    width: 100%;
    padding: 0.55rem 0.85rem;
    background: transparent;
    color: ${palette.textMuted};
    font-size: 0.85rem;
    font-family: inherit;
    text-align: left;
    transition:
      color 0.15s ease,
      background 0.15s ease;
  }

  &&:hover {
    color: ${palette.danger};
    background: ${palette.dangerAlpha15};
  }

  &&.Mui-focusVisible {
    background: rgba(255, 255, 255, 0.06);
  }
`;

export const MenuHeaderItem = styled(MenuItem)`
  && {
    padding: 0.35rem 0.85rem 0.5rem;
    opacity: 1;
    cursor: default;
  }
`;
