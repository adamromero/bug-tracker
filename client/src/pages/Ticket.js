import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getComments, createComment } from "../features/comments/commentSlice";

import PrimaryButton from "../styles/Button";

const Ticket = () => {
   const initialCommentDetails = {
      text: "",
      //createdBy: "",
      ticket: "",
      //createdAt: "",
   };

   const [comments, setComments] = useState(initialCommentDetails);
   const [input, setInput] = useState("");
   const { id } = useParams();
   const dispatch = useDispatch();
   const location = useLocation();
   const data = location.state;

   //  const { comments, isLoading, isError, message } = useSelector(
   //     (state) => state.comments
   //  );

   useEffect(() => {
      dispatch(getComments());
   }, [dispatch]);

   const handleOnSubmit = (e) => {
      e.preventDefault();
      setComments((prevState) => ({
         ...prevState,
         text: input,
         [e.target.name]: e.target.value,
      }));
      setInput("");
      console.log(e.target.value);
      dispatch(createComment(comments));
   };

   return (
      <div>
         <h1>Ticket</h1>
         {data ? (
            <div>
               <p>{data.title}</p>
               <h2>Description</h2>
               <p>{data.description}</p>
               <h2>Priority</h2>
               <p>{data.priority}</p>
               <h2>Status</h2>
               <p>{data.status}</p>
               <h2>Assigned to</h2>

               {data.assignedTo.map((member) => (
                  <p key={member._id}>{member.name}</p>
               ))}
            </div>
         ) : (
            <div>No data</div>
         )}

         {/* {comments &&
            comments.map((comment, index) => <p key={index}>{comment.text}</p>)} */}

         <form onSubmit={handleOnSubmit}>
            <textarea
               name=""
               id=""
               cols="100"
               rows="10"
               onChange={(e) => {
                  setInput(e.target.value);
               }}
               value={input}
            ></textarea>
            <br />
            <PrimaryButton type="submit">Submit</PrimaryButton>
         </form>
      </div>
   );
};

export default Ticket;
