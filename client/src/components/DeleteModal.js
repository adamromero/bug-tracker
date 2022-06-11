import React from "react";
import Modal from "./Modal";
import PrimaryButton from "../styles/Button";

const DeleteModal = () => {
   return (
      <Modal button="Delete">
         <div className="header">Would you like to delete this project? </div>
         <PrimaryButton>Delete</PrimaryButton>
         <PrimaryButton>Cancel</PrimaryButton>
      </Modal>
   );
};

export default DeleteModal;
