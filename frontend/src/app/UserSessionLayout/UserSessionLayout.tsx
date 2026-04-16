import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { fetchCurrentUser } from "../../api/authApi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { hideGlobalLoader, showGlobalLoader } from "../../store/loaderSlice";
import { setUser } from "../../store/userSlice";
import { paths } from "../paths";
import * as SC from "./UserSessionLayout.styles";

type UserSessionLayoutProps = {
  children: ReactNode;
};

export const UserSessionLayout = ({ children }: UserSessionLayoutProps) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const profile = useAppSelector((s) => s.user.profile);
  const [userFetchDone, setUserFetchDone] = useState(false);

  useEffect(() => {
    let aborted = false;
    dispatch(showGlobalLoader());
    fetchCurrentUser()
      .then((user) => {
        if (!aborted) dispatch(setUser(user));
      })
      .catch(() => {})
      .finally(() => {
        if (!aborted) {
          dispatch(hideGlobalLoader());
          setUserFetchDone(true);
        }
      });
    return () => {
      aborted = true;
      dispatch(hideGlobalLoader());
    };
  }, [dispatch]);

  if (userFetchDone && !profile) {
    return (
      <Navigate to={paths.auth} replace state={{ from: location.pathname }} />
    );
  }

  return <SC.SessionRoot>{children}</SC.SessionRoot>;
};
