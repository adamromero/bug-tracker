import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTicketsByUser } from "../features/tickets/ticketSlice";

import { PieChart } from "react-minimal-pie-chart";

const Chart = () => {
   const [priorityCount, setPriorityCount] = useState([]);
   const [statusCount, setStatusCount] = useState([]);
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

   const getStatusCount = (status) => {
      return tickets.filter((ticket) => ticket.status.toLowerCase() === status)
         .length;
   };

   const getChartData = () => {
      setPriorityCount([
         { title: "Low", value: getPriorityCount("low"), color: "#d10f2a" },
         {
            title: "Medium",
            value: getPriorityCount("medium"),
            color: "#cddc39",
         },
         { title: "High", value: getPriorityCount("high"), color: "#4c86af" },
      ]);

      setStatusCount([
         {
            title: "On Hold",
            value: getStatusCount("on hold"),
            color: "#d10f2a",
         },
         {
            title: "In Progress",
            value: getStatusCount("in progress"),
            color: "#cddc39",
         },
         {
            title: "Completed",
            value: getStatusCount("completed"),
            color: "#4c86af",
         },
      ]);
   };

   return (
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
         <div>
            <PieChart
               data={priorityCount}
               label={({ x, y, dx, dy, dataEntry }) =>
                  dataEntry.value > 0 && (
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
                  )
               }
               style={{ height: "150px", width: "150px" }}
            ></PieChart>
            <h4 style={{ textAlign: "center" }}>Ticket Priority</h4>
         </div>
         <div>
            <PieChart
               data={statusCount}
               label={({ x, y, dx, dy, dataEntry }) =>
                  dataEntry.value > 0 && (
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
                  )
               }
               style={{ height: "150px", width: "150px" }}
            ></PieChart>
            <h4 style={{ textAlign: "center" }}>Ticket Status</h4>
         </div>
      </div>
   );
};

export default Chart;
