import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UpdateUser from "../components/forms/UpdateUser";
import { getUsers } from "../features/users/allUsersSlice";
import Spinner from "../styles/Spinner";
import Modal from "../components/Modal";

const Administration = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { user } = useSelector((state) => state.auth);
   const { allUsers, isLoading } = useSelector((state) => state.users);
   const [selectedUser, setSelectedUser] = useState(user);
   const [isUserUpdated, setIsUserUpdated] = useState(false);

   useEffect(() => {
      if (!user) {
         navigate("/login");
      }

      dispatch(getUsers());
      //console.log("administration render");
      //setSelectedUser(allUsers[0]);
   }, [dispatch, isUserUpdated]);

   if (isLoading) {
      return <Spinner />;
   }

   console.log("seleced user admin: ", selectedUser);
   //console.log(allUsers);

   if (user) {
      return (
         <div className="m-5">
            <h2 className="text-2xl	font-bold">Administration</h2>
            <p>{user.isAdmin ? "You have administrator privileges" : ""}</p>
            <div className="flex gap-11">
               <div>
                  <h3>Team</h3>
                  <table className="text-left w-full">
                     <thead>
                        <tr>
                           <th>Name</th>
                           <th>Email</th>
                           <th>Is Admin</th>
                           <th>Is Verified</th>
                        </tr>
                     </thead>
                     <tbody>
                        {allUsers.map((currentUser) => (
                           <tr
                              key={currentUser._id}
                              style={{ cursor: "pointer" }}
                              onClick={() => setSelectedUser(currentUser)}
                           >
                              <td>{currentUser.name}</td>
                              <td>{currentUser.email}</td>
                              <td>{currentUser.isAdmin ? "Yes" : "No"}</td>
                              <td>{currentUser.isVerified ? "Yes" : "No"}</td>
                              {/* <td>
                              <Modal button={<button>Edit</button>}>
                                 <UpdateUser
                                    selectedUser={currentUser}
                                    isUserUpdated={isUserUpdated}
                                    setIsUserUpdated={setIsUserUpdated}
                                 />
                              </Modal>
                           </td> */}
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>

               <UpdateUser
                  selectedUser={selectedUser}
                  isUserUpdated={isUserUpdated}
                  setIsUserUpdated={setIsUserUpdated}
               />
            </div>
         </div>
      );
   } else {
      return null;
   }
};

export default Administration;
