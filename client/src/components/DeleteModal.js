import React from "react";
import { useDispatch } from "react-redux";
import { deleteProject } from "../features/projects/projectSlice";
import Modal from "./Modal";
import PrimaryButton from "../styles/Button";

const DeleteModal = ({ id }) => {
   const dispatch = useDispatch();

   const handleDeleteProject = (e) => {
      console.log("delete project");
      dispatch(deleteProject(id));
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
