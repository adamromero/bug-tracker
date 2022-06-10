import styled from "styled-components";
import { blue } from "./utils/colors";

const PrimaryButton = styled.button`
   background-color: ${blue[500]};
   border: none;
   color: white;
   padding: 12px 24px;
   font-size: 1rem;
   cursor: pointer;
`;

export default PrimaryButton;
