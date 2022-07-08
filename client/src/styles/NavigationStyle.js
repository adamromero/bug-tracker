import styled from "styled-components";
import { gray } from "./utils/colors";

const NavigationStyle = styled.nav`
   background: ${gray[100]};
   min-height: 100vh;
   padding: 20px;
   max-width: 275px;
   width: 100%;

   ul {
      list-style: none;
      padding: 15px 0;
      border-top: 1px solid #e0e0e0;
      border-bottom: 1px solid #e0e0e0;
   }

   li {
      font-size: 18px;
      padding: 0 0 10px;

      &:last-child {
         padding: 0;
      }
   }

   h1 {
      margin-top: 0;
   }
`;

export default NavigationStyle;
