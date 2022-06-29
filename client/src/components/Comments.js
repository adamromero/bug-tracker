import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
   getComments,
   createComment,
   deleteComment,
} from "../features/comments/commentSlice";

import { PrimaryButton } from "../styles/Button";
import { SecondaryButton } from "../styles/Button";
import { MdDelete } from "react-icons/md";

const Comments = ({ ticketId }) => {
   const initialCommentDetails = {
      text: "",
      createdBy: "",
      ticket: "",
      createdAt: "",
   };

   const [commentDetails, setCommentDetails] = useState(initialCommentDetails);
   const [input, setInput] = useState("");

   const dispatch = useDispatch();

   const { comments, isLoading, isError, message } = useSelector(
      (state) => state.comments
   );

   const { user } = useSelector((state) => state.auth);

   useEffect(() => {
      dispatch(getComments(ticketId));
   }, [dispatch]);

   const handleOnSubmit = (e) => {
      e.preventDefault();
      setInput("");

      if (commentDetails.text.trim()) {
         dispatch(createComment(commentDetails));
      }
   };

   const handleOnChange = (e) => {
      e.preventDefault();
      setInput(e.target.value);
      setCommentDetails((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
         ticket: ticketId,
         createdBy: user._id,
         createdAt: new Date(),
      }));
   };

   const handleOnDelete = (id) => {
      dispatch(deleteComment(id));
   };

   return (
      <div>
         <h4>Comments</h4>
         <div style={{ marginBottom: "40px" }}>
            {comments &&
               comments.map((comment) => (
                  <div
                     style={{
                        background: "#ededed",
                        padding: "20px",
                        marginBottom: "10px",
                     }}
                     key={comment._id}
                  >
                     <div style={{ display: "flex", alignItems: "center" }}>
                        <strong style={{ fontSize: "12px" }}>
                           {" "}
                           <em>
                              {comment.createdBy.name} -{" "}
                              {new Date(comment.createdAt).toLocaleString(
                                 "en-US",
                                 {
                                    dateStyle: "long",
                                    timeStyle: "long",
                                 }
                              )}
                           </em>
                        </strong>
                        {user._id === comment.createdBy._id && (
                           <div>
                              <SecondaryButton
                                 onClick={() => handleOnDelete(comment._id)}
                              >
                                 <MdDelete />
                              </SecondaryButton>
                           </div>
                        )}
                     </div>

                     <p>{comment.text}</p>
                     <div
                        style={{
                           fontSize: "12px",
                           fontWeight: "bold",
                        }}
                     ></div>
                  </div>
               ))}
         </div>
         <form onSubmit={handleOnSubmit}>
            <textarea
               name="text"
               cols="60"
               rows="10"
               onChange={handleOnChange}
               value={input}
            ></textarea>
            <br />
            <PrimaryButton type="submit" disabled={!input}>
               Submit
            </PrimaryButton>
         </form>
      </div>
   );
};

export default Comments;
