import React from "react";
import "reactjs-popup/dist/index.css";
import ModalStyle from "../styles/ModalStyle";
import { CloseButton } from "../styles/Button";

const Modal = ({ button, children }) => {
   return (
      <ModalStyle trigger={button} modal nested>
         {(close) => (
            <>
               <div
                  style={{ position: "absolute", right: "19px", top: "10px" }}
               >
                  <CloseButton onClick={close}>&times;</CloseButton>
               </div>
               {children}
            </>
         )}
      </ModalStyle>
   );
};

export default Modal;
