import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import ModalStyle from "../styles/ModalStyle";

const Modal = ({ button, children }) => {
   return (
      <Popup trigger={button} modal nested>
         {(close) => (
            <ModalStyle className="modal">
               <button className="close" onClick={close}>
                  &times;
               </button>
               {children}
            </ModalStyle>
         )}
      </Popup>
   );
};

export default Modal;
