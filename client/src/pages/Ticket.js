import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import Comments from "../components/Comments";

const Ticket = () => {
   const { id } = useParams();

   const location = useLocation();
   const data = location.state;

   return (
      <div>
         <h2>Ticket</h2>
         {data ? (
            <div>
               <h3>{data.title}</h3>
               <h4>Description</h4>
               <p>{data.description}</p>
               <div
                  style={{
                     display: "flex",
                     justifyContent: "space-between",
                     maxWidth: "450px",
                  }}
               >
                  <div>
                     <h4>Priority</h4>
                     <p>{data.priority}</p>
                  </div>
                  <div>
                     <h4>Status</h4>
                     <p>{data.status}</p>
                  </div>
                  <div>
                     <h4>Estimate</h4>
                     <p>{data.estimate}</p>
                  </div>
               </div>
               <h4>Assigned to</h4>
               {data.teamMembers.map((member) => (
                  <p key={member._id}>{member.name}</p>
               ))}
            </div>
         ) : (
            <div>No data</div>
         )}

         <Comments id={id} />
      </div>
   );
};

export default Ticket;
