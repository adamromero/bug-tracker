import styled from "styled-components";
import { gray } from "./utils/colors";

const NavigationStyle = styled.nav`
   background: ${gray[100]};
   height: 100vh;
   padding: 20px;
   max-width: 275px;
   width: 100%;

   ul {
      list-style: none;
      padding: 0;
   }

   li {
      padding: 0 0 10px;
   }

   h1 {
      margin-top: 0;
   }
`;

export default NavigationStyle;
