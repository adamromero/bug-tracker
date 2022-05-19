import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const getUsers = asyncHandler(async (req, res) => {
   const users = await User.find();
   res.status(200).json(users);
});

const createUser = asyncHandler(async (req, res) => {
   if (!req.body.name || !req.body.email || !req.body.password) {
      res.status(400);
      throw new Error("Please provide required fields");
   }

   const user = await User.create(req.body);
   res.status(200).json(user);
});

const updateUser = asyncHandler(async (req, res) => {
   const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
   });

   if (!user) {
      res.status(404);
      throw new Error("User not found");
   }

   res.status(200).json(user);
});

const deleteUser = asyncHandler(async (req, res) => {
   const user = await User.findById(req.params.id);
   if (!user) {
      res.status(404);
      throw new Error("User not found");
   }
   await user.remove();
   res.status(200).json({ id: req.params.id });
});

export { getUsers, createUser, updateUser, deleteUser };
