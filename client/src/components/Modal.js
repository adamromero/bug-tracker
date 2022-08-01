import React from "react";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import { CloseButton } from "../styles/Button";

const Modal = ({ button, children }) => {
   return (
      <Popup trigger={button} modal nested>
         {(close) => (
            <>
               <div className="close">
                  <CloseButton onClick={close}>&times;</CloseButton>
               </div>
               {children}
            </>
         )}
      </Popup>
   );
};

export default Modal;
