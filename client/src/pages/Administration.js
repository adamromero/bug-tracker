import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UpdateUser from "../components/forms/UpdateUser";
import DeleteUser from "../components/forms/DeleteUser";
import { useUserValidation } from "../utils/userValidation";
import { getUsers } from "../features/users/allUsersSlice";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Spinner from "../styles/Spinner";
import Modal from "../components/Modal";

const Administration = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { user } = useSelector((state) => state.auth);
   const { allUsers, isLoading } = useSelector((state) => state.users);
   const isUserAuthorized = useUserValidation();

   useEffect(() => {
      if (!user) {
         navigate("/login");
      }

      dispatch(getUsers());
   }, [dispatch]);

   if (isLoading) {
      return <Spinner />;
   }

   if (user) {
      return (
         <div className="m-5">
            <h2 className="text-2xl	font-bold pb-5 mb-5 border-b-[1px] border-slate-200">
               Administration
            </h2>
            <p className="mb-5">
               {user.isAdmin && isUserAuthorized
                  ? "You are an administrator"
                  : ""}
            </p>
            <div className="flex gap-11">
               <div className="flex-1">
                  <h3 className="text-lg font-bold">Team</h3>
                  <table className="text-left w-full">
                     <thead>
                        <tr>
                           <th className="font-normal">Name</th>
                           <th className="font-normal">Email</th>
                           <th className="font-normal">Is Admin</th>
                           <th className="font-normal">Is Verified</th>
                        </tr>
                     </thead>
                     <tbody>
                        {allUsers.map((currentUser, index) => (
                           <tr
                              key={currentUser._id}
                              className={`${
                                 index % 2 === 0
                                    ? "bg-gray-100 dark:bg-[#3e3e3e]"
                                    : "bg-gray-200 dark:bg-black"
                              }`}
                           >
                              <td className="p-3">{currentUser.name}</td>
                              <td className="p-3">{currentUser.email}</td>
                              <td className="p-3">
                                 {currentUser.isAdmin ? "Yes" : "No"}
                              </td>
                              <td className="p-3">
                                 {currentUser.isVerified ? "Yes" : "No"}
                              </td>
                              <td className="p-3">
                                 <Modal
                                    button={
                                       <button className="transition-colors	cursor-pointer	text-[#087E8B] p-2">
                                          <MdModeEditOutline>
                                             Edit
                                          </MdModeEditOutline>
                                       </button>
                                    }
                                 >
                                    <UpdateUser currentUser={currentUser} />
                                 </Modal>
                              </td>
                              <td>
                                 <Modal
                                    button={
                                       <button className="transition-colors	cursor-pointer	text-[#087E8B] p-2">
                                          <MdDelete className="transition-colors	cursor-pointer	text-[#087E8B] ">
                                             Delete
                                          </MdDelete>
                                       </button>
                                    }
                                 >
                                    <DeleteUser userId={currentUser._id} />
                                 </Modal>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      );
   } else {
      return null;
   }
};

export default Administration;
