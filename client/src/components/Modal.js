import React from "react";
import "reactjs-popup/dist/index.css";
import ModalStyle from "../styles/ModalStyle";
import Popup from "reactjs-popup";
import { CloseButton } from "../styles/Button";

const Modal = ({ button, children }) => {
   return (
      <Popup trigger={button} modal nested>
         {(close) => (
            <>
               <div
                  style={{
                     position: "absolute",
                     right: "19px",
                     top: "10px",
                  }}
               >
                  <CloseButton onClick={close}>&times;</CloseButton>
               </div>
               {children}
            </>
         )}
      </Popup>
   );
};

export default Modal;
