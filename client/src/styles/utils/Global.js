import { createGlobalStyle } from "styled-components";
import { primaryFont } from "./typography";
import { green } from "./colors";
import { normalize } from "polished";

export const GlobalStyle = createGlobalStyle`
${normalize()}
html {
  box-sizing: border-box;
  font-size: 16px;
}
*, *:before, *:after {
  box-sizing: inherit;
}
body {
  margin: 0;
  font-family: ${primaryFont};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h2 {
  margin: 0 0 16px;
}

a {
    text-decoration: none;
    color: ${green[300]};
}

.container {
    display: flex;
}

.popup-content {
  width: 100%;
  max-width: 475px;
  margin: 0 auto;
  padding: 0;
  border: 0;
  background: none;
}

main {
  flex: 1;
}

td {
  padding: 12px 12px 12px 0;
  border-bottom: 1px solid #e0e0e0;
}

`;
