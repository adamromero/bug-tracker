import styled from "styled-components";
import { green } from "../utils/colors";

export const SecondaryButton = styled.button`
   background-color: transparent;
   border: 0;
   color: ${green[300]};
   padding: 6px 12px;
   font-size: 1rem;
   cursor: pointer;
   transition: 0.2s ease-in-out all;

   &:hover {
      color: ${green[200]};
   }
`;
