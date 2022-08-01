import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   image: {
      type: String,
   },
   email: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
   tickets: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Ticket",
      },
   ],
   isAdmin: {
      type: Boolean,
      default: false,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

const User = mongoose.model("User", userSchema);

export default User;
