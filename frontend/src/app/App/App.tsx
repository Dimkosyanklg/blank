import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { DispatchedGlobalLoader } from "../../components/DispatchedGlobalLoader";
import { AuthPage } from "../../pages/auth";
import { HomePage } from "../../pages/home";
import { GlobalStyles } from "../../styles/GlobalStyles";
import { paths } from "../paths";
import { RouterNavigationBridge } from "../routerNavigation";
import { UserSessionLayout } from "../UserSessionLayout";

const App = () => (
  <BrowserRouter>
    <RouterNavigationBridge />
    <GlobalStyles />
    <DispatchedGlobalLoader />
    <Routes>
      <Route path={paths.auth} element={<AuthPage />} />
      <Route
        path={paths.home}
        element={
          <UserSessionLayout>
            <HomePage />
          </UserSessionLayout>
        }
      />
      <Route path="*" element={<Navigate to={paths.auth} replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
