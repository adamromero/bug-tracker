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

import {
   useUserValidation,
   userValidationMessage,
} from "../utils/userValidation";

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

   const isUserAuthorized = useUserValidation();

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

      if (isUserAuthorized) {
         if (commentDetails.text.trim()) {
            dispatch(createComment(commentDetails));
         }
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
                        className="text-black bg-[#ededed] dark:text-white dark:bg-[#3e3e3e] p-5 mb-2"
                        key={comment._id}
                     >
                        <div className="flex items-center">
                           <img
                              src={`${
                                 comment.createdBy.image
                                    ? `https://bug-tracker-adamromero-images.s3.us-west-1.amazonaws.com/${comment.createdBy.image}`
                                    : "data:image/png;base64,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"
                              }`}
                              width="50"
                              alt={comment.createdBy.name}
                           />
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
            {userValidationMessage(isUserAuthorized)}
            <textarea
               className="border border-gray-500 p-2 w-full dark:bg-zinc-800"
               name="text"
               cols="60"
               rows="6"
               onChange={handleOnChange}
               value={input}
            ></textarea>
            <br />
            <PrimaryButton type="submit" disabled={!input || !isUserAuthorized}>
               Submit
            </PrimaryButton>
         </form>
      </>
   );
};

export default Comments;
