import styled from "styled-components";
import { green } from "../utils/colors";

export const PrimaryButton = styled.button`
   background-color: ${green[300]};
   border: 0;
   color: white;
   padding: 6px 12px;
   font-size: 1rem;
   cursor: pointer;
   transition: 0.2s ease-in-out all;

   &:hover {
      background-color: ${green[200]};
      color: white;
   }

   &:disabled {
      background-color: ${green[100]};
      cursor: not-allowed;
   }
`;
