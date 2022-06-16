import asyncHandler from "express-async-handler";
import Comment from "../models/commentModel.js";

const getComments = asyncHandler(async (req, res) => {
   const comments = await Comment.find().populate("createdBy", "name");
   res.status(200).json(comments);
});

const createComment = asyncHandler(async (req, res) => {
   const comment = await Comment.create(req.body);
   res.status(200).json(comment);
});

const updateComment = asyncHandler(async (req, res) => {
   const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
   });
   if (!comment) {
      res.status(404);
      throw new Error("Comment not found");
   }
   res.status(200).json(comment);
});

const deleteComment = asyncHandler(async (req, res) => {
   const comment = await Comment.findByIdAndDelete(req.params.id);
   if (!comment) {
      res.status(404);
      throw new Error("Comment not found");
   }
   res.status(200).json(comment);
});

export { getComments, createComment, updateComment, deleteComment };
