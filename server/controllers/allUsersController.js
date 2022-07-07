import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const getUsers = asyncHandler(async (req, res) => {
   const users = await User.find();
   res.status(200).json(users);
});

const updateUser = asyncHandler(async (req, res) => {
   const { _id } = req.body;
   console.log(_id);
   const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
   });
   res.status(200).json(user);
});

const deleteUser = asyncHandler(async (req, res) => {
   const { id } = req.params;
   const user = await User.findById(id);
   await user.remove();
   res.status(200).json(user);
});

export { getUsers, updateUser, deleteUser };
