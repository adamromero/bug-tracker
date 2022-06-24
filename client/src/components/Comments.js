import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
   getComments,
   createComment,
   deleteComment,
} from "../features/comments/commentSlice";

import { PrimaryButton } from "../styles/Button";

const Comments = ({ id }) => {
   const initialCommentDetails = {
      text: "",
      createdBy: "",
      ticket: "",
      createdAt: "",
   };

   const [commentDetails, setCommentDetails] = useState(initialCommentDetails);
   const [input, setInput] = useState("");
   const [update, setUpdate] = useState(false);

   const dispatch = useDispatch();

   const { comments, isLoading, isError, message } = useSelector(
      (state) => state.comments
   );

   const { user } = useSelector((state) => state.auth);

   useEffect(() => {
      dispatch(getComments(id));
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
         ticket: id,
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
                        borderBottom: "1px solid gray",
                        paddingBottom: "20px",
                     }}
                     key={comment._id}
                  >
                     <p>{comment.text}</p>
                     <div
                        style={{
                           fontSize: "12px",
                           fontWeight: "bold",
                        }}
                     >
                        <em>
                           Posted by {comment.createdBy.name} at{" "}
                           {new Date(comment.createdAt).toLocaleString("en-US")}
                        </em>
                     </div>
                     <div>
                        <button>Edit</button>
                        <button onClick={() => handleOnDelete(comment._id)}>
                           Delete
                        </button>
                     </div>
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
