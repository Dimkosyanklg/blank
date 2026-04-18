import { useNavigate } from "react-router-dom";
import { UserCornerMenu } from "../../../components/UserCornerMenu";
import { TmdbMovieSearch } from "../TmdbMovieSearch";
import { logoutRequest } from "../../../api/authApi";
import { paths } from "../../../app/paths";
import { useAppDispatch } from "../../../store/hooks";
import { clearUser } from "../../../store/userSlice";
import { useState } from "react";
import * as SC from "./MoviesPage.styles";

export const MoviesPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchBusy, setSearchBusy] = useState(false);

  const logout = async () => {
    try {
      await logoutRequest();
    } catch {
      /* кука могла уже истечь — всё равно уходим на вход */
    }
    dispatch(clearUser());
    navigate(paths.auth, { replace: true });
  };

  return (
    <SC.Page>
      <UserCornerMenu onLogout={logout} disabled={searchBusy} />
      <SC.Layout>
        <SC.Header>
          <SC.Title>Movies</SC.Title>
          <SC.Subtitle>
            Search via the BFF; the TMDB token never reaches the browser.
          </SC.Subtitle>
          <SC.BackNav>
            <SC.TextNavLink to={paths.home}>Back to home</SC.TextNavLink>
          </SC.BackNav>
        </SC.Header>
        <TmdbMovieSearch onBusyChange={setSearchBusy} />
      </SC.Layout>
    </SC.Page>
  );
};
