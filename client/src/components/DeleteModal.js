import React from "react";
import Modal from "./Modal";
import PrimaryButton from "../styles/Button";

const DeleteModal = () => {
   const handleDeleteProject = (e) => {
      console.log("delete project");
   };

   return (
      <Modal button="Delete">
         <div className="header">Would you like to delete this project? </div>
         <PrimaryButton onClick={handleDeleteProject}>Delete</PrimaryButton>
         <PrimaryButton>Cancel</PrimaryButton>
      </Modal>
   );
};

export default DeleteModal;
