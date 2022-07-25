import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Comment from "../models/commentModel.js";

const getUsers = asyncHandler(async (req, res) => {
   const users = await User.find().select("-password");
   res.status(200).json(users);
});

const updateUser = asyncHandler(async (req, res) => {
   const { _id } = req.body;
   const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
   }).select("-password");
   res.status(200).json(user);
});

const deleteUser = asyncHandler(async (req, res) => {
   const { id } = req.params;
   await User.findByIdAndDelete(id);
   await Comment.findOneAndDelete({ createdBy: id });
   res.status(200);
});

export { getUsers, updateUser, deleteUser };
