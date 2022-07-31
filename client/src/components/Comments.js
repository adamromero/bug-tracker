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

import Spinner from "../styles/Spinner";

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

   if (isLoading) {
      return <Spinner />;
   }

   return (
      <>
         <h4 className="text-lg font-bold mb-5">Comments</h4>
         {comments &&
            comments.map((comment) => {
               if (comment.createdBy) {
                  return (
                     <div
                        className="text-black bg-[#ededed] dark:text-white dark:bg-[#087e8b] p-5 mb-2"
                        key={comment._id}
                     >
                        <div className="flex items-center">
                           <strong className="text-xs">
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
                                    <MdDelete className="dark:text-white" />
                                 </SecondaryButton>
                              </div>
                           )}
                        </div>
                        <p>{comment.text}</p>
                     </div>
                  );
               }
            })}
         <form onSubmit={handleOnSubmit}>
            <textarea
               className="border border-gray-500 p-2 w-full dark:bg-zinc-800"
               name="text"
               cols="60"
               rows="6"
               onChange={handleOnChange}
               value={input}
            ></textarea>
            <br />
            <PrimaryButton type="submit" disabled={!input}>
               Submit
            </PrimaryButton>
         </form>
      </>
   );
};

export default Comments;
