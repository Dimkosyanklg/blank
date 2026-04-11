import { createGlobalStyle } from "styled-components";
import { fontStack } from "../theme";

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
    min-height: 100vh;
    font-family: ${fontStack};
  }

  #root {
    min-height: 100vh;
  }
`;
