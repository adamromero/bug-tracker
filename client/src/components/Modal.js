import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import PrimaryButton from "../styles/Button";
import ModalStyle from "../styles/ModalStyle";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Modal = ({ type, children }) => {
   const buttonIcon = (type) => {
      switch (type) {
         case "Edit":
            return <MdModeEditOutline />;
         case "Delete":
            return <MdDelete />;
         default:
            return <MdModeEditOutline />;
      }
   };

   return (
      <Popup
         trigger={
            <PrimaryButton>
               {type === "New" ? "New" : buttonIcon(type)}
            </PrimaryButton>
         }
         modal
         nested
      >
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
