import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import * as SC from "./UserCornerMenu.styles";

type UserCornerMenuProps = {
  onLogout: () => void;
  disabled?: boolean;
};

export const UserCornerMenu = ({ onLogout, disabled }: UserCornerMenuProps) => {
  const profile = useAppSelector((s) => s.user.profile);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!profile) {
    return null;
  }

  const initial =
    profile.name.trim().charAt(0).toUpperCase() ||
    profile.email.charAt(0).toUpperCase() ||
    "?";

  const handleLogout = () => {
    setOpen(false);
    onLogout();
  };

  return (
    <SC.Wrap ref={wrapRef}>
      <SC.Trigger
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="user-corner-menu"
        id="user-corner-trigger"
        onClick={() => setOpen((v) => !v)}
        disabled={disabled}
      >
        <SC.Avatar aria-hidden>{initial}</SC.Avatar>
        <SC.TriggerLabel>{profile.name}</SC.TriggerLabel>
        <SC.Chevron $open={open} aria-hidden>
          ▾
        </SC.Chevron>
      </SC.Trigger>
      {open && (
        <SC.Dropdown
          id="user-corner-menu"
          role="menu"
          aria-labelledby="user-corner-trigger"
        >
          <SC.MenuUserBlock>
            <SC.MenuName>{profile.name}</SC.MenuName>
            <SC.MenuEmail>{profile.email}</SC.MenuEmail>
          </SC.MenuUserBlock>
          <SC.MenuDivider role="separator" />
          <SC.MenuButton type="button" role="menuitem" onClick={handleLogout}>
            Sign out
          </SC.MenuButton>
        </SC.Dropdown>
      )}
    </SC.Wrap>
  );
};
