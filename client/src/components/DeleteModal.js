import React from "react";
import Modal from "./Modal";
import PrimaryButton from "../styles/Button";

const DeleteModal = ({ type, id, deleteHandler }) => {
   return (
      <Modal button="Delete">
         <div className="header">Would you like to delete this {type}? </div>
         <PrimaryButton onClick={() => deleteHandler(id)}>Delete</PrimaryButton>
         <PrimaryButton>Cancel</PrimaryButton>
      </Modal>
   );
};

export default DeleteModal;
