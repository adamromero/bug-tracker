import React from "react";

const TicketMarker = ({ title, color }) => {
   return (
      <div
         className={`${color} text-center text-white font-bold text-xs	leading-none p-1 whitespace-nowrap	 rounded`}
      >
         {title}
      </div>
   );
};

export default TicketMarker;
