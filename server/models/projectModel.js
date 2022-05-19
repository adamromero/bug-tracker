import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   teamMembers: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
   ],
   tickets: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Ticket",
      },
   ],
   createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
   updatedAt: {
      type: Date,
      default: Date.now,
   },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
