import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../features/users/allUsersSlice";

const Administration = () => {
   const dispatch = useDispatch();
   const { allUsers } = useSelector((state) => state.users);

   useEffect(() => {
      dispatch(getUsers());
   }, [dispatch]);

   return (
      <div>
         <h2>Administration</h2>
         <ul>
            {allUsers.map((user) => (
               <li key={user._id}>
                  {user.name} - {user.email}
               </li>
            ))}
         </ul>
      </div>
   );
};

export default Administration;
