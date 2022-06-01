import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   status: {
      type: String,
      //required: true,
   },
   priority: {
      type: String,
      //required: true,
   },
   dueDate: {
      type: Date,
      //required: true,
   },
   createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
   },
   project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
   },
   assignedTo: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
   ],
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment",
      },
   ],
   createdAt: {
      type: Date,
      default: Date.now,
   },
   updatedAt: {
      type: Date,
      default: Date.now,
   },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
