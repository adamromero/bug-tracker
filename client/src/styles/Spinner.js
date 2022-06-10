import styled from "styled-components";

const Spinner = styled.div`
   display: block;
   position: relative;
   top: 50px;
   width: 8rem;
   height: 8rem;
   vertical-align: text-bottom;
   border: 0.25em solid currentColor;
   border-right-color: transparent;
   border-radius: 50%;
   -webkit-animation: spinner-border 0.75s linear infinite;
   animation: spinner-border 0.75s linear infinite;

   @keyframes spinner-border {
      to {
         -webkit-transform: rotate(360deg);
      }
   }
   @-webkit-keyframes spinner-border {
      to {
         -webkit-transform: rotate(360deg);
      }
   }
`;

export default Spinner;
