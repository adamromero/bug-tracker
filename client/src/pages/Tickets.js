import React from "react";
import { useSelector } from "react-redux";

const Tickets = () => {
   const { user } = useSelector((state) => state.auth);

   console.log(user);

   return (
      <div>
         <h2>Tickets</h2>

         <p>{user.name}'s tickets</p>
         <p>{user.isAdmin ? "Administrator" : "Non-Administrator"}</p>
      </div>
   );
};

export default Tickets;
