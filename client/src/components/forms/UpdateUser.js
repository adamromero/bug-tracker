import React, { useState, useEffect } from "react";

const UpdateUser = ({ selectedUser }) => {
   const [userDetails, setUserDetails] = useState({});

   const handleEditUser = (e) => {
      e.preventDefault();
      console.log(userDetails);
   };

   const handleOnChange = (e) => {
      setUserDetails((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
   };

   useEffect(() => {
      setUserDetails(selectedUser);
   }, [selectedUser]);

   return (
      <div>
         <h3>Update user information</h3>
         {selectedUser.name}

         <form onSubmit={handleEditUser}>
            <label>
               Name:
               <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={handleOnChange}
                  value={userDetails.name || ""}
               />
            </label>
            <br />
            <label>
               Email:
               <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={handleOnChange}
                  value={userDetails.email || ""}
               />
            </label>
            <br />
            <label>
               Administrator:
               <input
                  type="checkbox"
                  name="isAdmin"
                  onChange={handleOnChange}
                  value={userDetails.isAdmin}
               />
            </label>
            <br />
            <button type="submit">Submit</button>
            <button type="submit">Remove User</button>
         </form>
      </div>
   );
};

export default UpdateUser;
