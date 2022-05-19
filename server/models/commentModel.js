import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
   text: {
      type: String,
      required: true,
   },
   createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
   },
   ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
