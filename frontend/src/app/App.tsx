import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthPage } from "../pages/auth";
import { GlobalStyles } from "../styles/GlobalStyles";
import { paths } from "./paths";

const App = () => (
  <BrowserRouter>
    <GlobalStyles />
    <Routes>
      <Route path={paths.auth} element={<AuthPage />} />
      <Route path={paths.home} element={<Navigate to={paths.auth} replace />} />
      <Route path="*" element={<Navigate to={paths.auth} replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
