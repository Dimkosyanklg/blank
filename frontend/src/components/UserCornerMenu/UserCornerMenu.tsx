import type { MouseEvent } from "react";
import { useId, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import * as SC from "./UserCornerMenu.styles";

type UserCornerMenuProps = {
  onLogout: () => void;
  disabled?: boolean;
};

export const UserCornerMenu = ({ onLogout, disabled }: UserCornerMenuProps) => {
  const profile = useAppSelector((s) => s.user.profile);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const menuId = useId();
  const open = Boolean(anchorEl);

  if (!profile) {
    return null;
  }

  const initial =
    profile.name.trim().charAt(0).toUpperCase() ||
    profile.email.charAt(0).toUpperCase() ||
    "?";

  const handleLogout = () => {
    setAnchorEl(null);
    onLogout();
  };

  const openMenu = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = () => setAnchorEl(null);

  return (
    <SC.Wrap>
      <SC.Trigger
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={open ? menuId : undefined}
        onClick={open ? closeMenu : openMenu}
        disabled={disabled}
      >
        <SC.UserAvatar aria-hidden>{initial}</SC.UserAvatar>
        <SC.TriggerLabel as="span">{profile.name}</SC.TriggerLabel>
        <SC.Chevron $open={open} aria-hidden>
          ▾
        </SC.Chevron>
      </SC.Trigger>
      <SC.DropdownMenu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        disableScrollLock
      >
        <SC.MenuHeaderItem disabled>
          <SC.MenuUserBlock>
            <SC.MenuName as="p">{profile.name}</SC.MenuName>
            <SC.MenuEmail as="p">{profile.email}</SC.MenuEmail>
          </SC.MenuUserBlock>
        </SC.MenuHeaderItem>
        <SC.MenuDivider />
        <SC.MenuActionItem onClick={handleLogout}>Sign out</SC.MenuActionItem>
      </SC.DropdownMenu>
    </SC.Wrap>
  );
};
