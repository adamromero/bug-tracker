import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Comment from "../models/commentModel.js";

const getUsers = asyncHandler(async (req, res) => {
   const users = await User.find().select("-password");
   res.status(200).json(users);
});

const updateUser = asyncHandler(async (req, res) => {
   const user = await User.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
      runValidators: true,
   }).then((user) => {
      return User.findById(user._id).select("-password");
   });

   if (!user) {
      res.status(404);
      throw new Error("User not found");
   }

   res.status(200).json(user);
});

const deleteUser = asyncHandler(async (req, res) => {
   const { id } = req.params;
   await User.findByIdAndDelete(id);
   await Comment.findOneAndDelete({ createdBy: id });
   res.status(200);
});

export { getUsers, updateUser, deleteUser };
