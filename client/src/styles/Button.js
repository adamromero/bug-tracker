import styled from "styled-components";
import { green } from "./utils/colors";

const PrimaryButton = styled.button`
   background-color: white;
   border: 1px solid ${green[300]};
   color: ${green[300]};
   padding: 6px 12px;
   font-size: 1rem;
   cursor: pointer;
`;

export default PrimaryButton;
