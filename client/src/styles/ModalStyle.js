import styled from "styled-components";
import Popup from "reactjs-popup";

const ModalStyle = styled(Popup)`
   &-content {
      background: white !important;
      padding: 18px !important;

      form {
         display: flex;
         flex-direction: column;
      }

      input,
      select,
      textarea {
         margin-bottom: 1rem;
      }
   }
`;

export default ModalStyle;
