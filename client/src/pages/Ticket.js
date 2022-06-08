import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProjectTickets } from "../features/tickets/ticketSlice";

const Ticket = () => {
   const [comments, setComments] = useState([]);
   const [input, setInput] = useState("");
   const { id } = useParams();
   const dispatch = useDispatch();
   const location = useLocation();
   const data = location.state;

   // const { tickets, isLoading, isError, message } = useSelector(
   //    (state) => state.tickets
   // );

   //const ticket = tickets.filter((ticket) => ticket.project._id === id);
   //console.log(data);
   useEffect(() => {
      //dispatch(getProjectTickets(id));
   }, [dispatch]);

   const handleOnChange = (e) => {
      setInput(e.target.value);
   };

   const handleOnSubmit = (e) => {
      e.preventDefault();
      setComments((prevState) => [...prevState, input]);
      setInput("");
   };

   return (
      <div>
         <h2>Ticket</h2>
         {data ? (
            <div>
               <p>{data.description}</p>
               <p>{data.priority}</p>
               <p>{data.status}</p>
            </div>
         ) : (
            <div>No data</div>
         )}

         {comments &&
            comments.map((comment, index) => <p key={index}>{comment}</p>)}

         <form onSubmit={handleOnSubmit}>
            <textarea
               name=""
               id=""
               cols="50"
               rows="10"
               onChange={handleOnChange}
               value={input}
            ></textarea>
            <button type="submit">Submit</button>
         </form>
      </div>
   );
};

export default Ticket;
