import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTicketsByUser } from "../features/tickets/ticketSlice";

import { PieChart } from "react-minimal-pie-chart";

const Chart = () => {
   const [data, setData] = useState([]);
   const { user } = useSelector((state) => state.auth);
   const { tickets } = useSelector((state) => state.tickets);

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getTicketsByUser(user._id));
      getChartData();
   }, []);

   const getPriorityCount = (priority) => {
      return tickets.filter(
         (ticket) => ticket.priority.toLowerCase() === priority
      ).length;
   };

   const getChartData = () => {
      setData([
         { title: "Low", value: getPriorityCount("low"), color: "#d10f2a" },
         {
            title: "Medium",
            value: getPriorityCount("medium"),
            color: "#cddc39",
         },
         { title: "High", value: getPriorityCount("high"), color: "#4c86af" },
      ]);
   };

   return (
      <div>
         <PieChart
            data={data}
            label={({ x, y, dx, dy, dataEntry }) => (
               <text
                  key={dataEntry.title}
                  x={x}
                  y={y}
                  dx={dx}
                  dy={dy}
                  dominantBaseline="central"
                  textAnchor="middle"
                  style={{
                     fontSize: "8px",
                     fontFamily: "sans-serif",
                  }}
               >
                  {dataEntry.title}
               </text>
            )}
            style={{ height: "200px", width: "200px" }}
         ></PieChart>
         <h4>Ticket Priority</h4>
      </div>
   );
};

export default Chart;
