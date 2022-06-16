import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getComments, createComment } from "../features/comments/commentSlice";

import PrimaryButton from "../styles/Button";

const Ticket = () => {
   const initialCommentDetails = {
      text: "",
      createdBy: "",
      ticket: "",
      createdAt: "",
   };

   const [commentDetails, setCommentDetails] = useState(initialCommentDetails);
   const [input, setInput] = useState("");
   const { id } = useParams();
   const dispatch = useDispatch();
   const location = useLocation();
   const data = location.state;

   const { user } = useSelector((state) => state.auth);

   const { comments, isLoading, isError, message } = useSelector(
      (state) => state.comments
   );

   useEffect(() => {
      dispatch(getComments());
   }, [dispatch]);

   const handleOnSubmit = (e) => {
      e.preventDefault();
      setInput("");
      dispatch(createComment(commentDetails));
   };

   const handleOnChange = (e) => {
      e.preventDefault();
      setInput(e.target.value);
      setCommentDetails((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
         ticket: id,
         createdBy: user._id,
         createdAt: new Date(),
      }));
   };

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

               {data.assignedTo.map((member) => (
                  <p key={member._id}>{member.name}</p>
               ))}
            </div>
         ) : (
            <div>No data</div>
         )}

         <h4>Comments</h4>
         {comments.map((comment) => (
            <p key={comment._id}>
               {comment.text}: Posted by {comment.createdBy.name}
            </p>
         ))}

         <form onSubmit={handleOnSubmit}>
            <textarea
               name="text"
               cols="60"
               rows="10"
               onChange={handleOnChange}
               value={input}
            ></textarea>
            <br />
            <PrimaryButton type="submit">Submit</PrimaryButton>
         </form>
      </div>
   );
};

export default Ticket;
