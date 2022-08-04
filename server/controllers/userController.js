import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

const registerUser = asyncHandler(async (req, res) => {
   const { name, email, password } = req.body;

   if (!name || !email || !password) {
      res.status(400).json({ message: "Please provide required fields" });
   }

   const userExists = await User.findOne({ email });
   if (userExists) {
      res.status(400).json({ message: "User already exists" });
   }

   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);

   const user = await User.create({ name, email, password: hashedPassword });
   if (user) {
      res.status(201).json({
         _id: user.id,
         name: user.name,
         email: user.email,
         token: generateToken(user._id),
      });
   } else {
      res.status(400).json({
         message: "Something went wrong, user not created",
      });
   }
});

const loginUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

   const user = await User.findOne({ email });

   if (!email || !password) {
      res.status(400).json({ message: "Please provide required fields" });
   }

   if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
         _id: user._id,
         name: user.name,
         email: user.email,
         image: user.image,
         isAdmin: user.isAdmin,
         isVerified: user.isVerified,
         token: generateToken(user._id),
      });
   } else {
      res.status(400).json({
         message: "Invalid credentials",
      });
   }
});

const updatePassword = asyncHandler(async (req, res) => {
   const { id, currentPassword, newPassword, confirmPassword } = req.body;

   const user = await User.findById(id);

   if (user && (await bcrypt.compare(currentPassword, user.password))) {
      if (newPassword !== confirmPassword) {
         res.status(400).json({ message: "Passwords do not match" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      await User.findByIdAndUpdate(id, { password: hashedPassword });
      res.status(200).json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
         token: generateToken(user._id),
      });
   } else {
      res.status(400).json({ message: "Invalid credentials" });
   }
});

const getUser = asyncHandler(async (req, res) => {
   res.status(200).json(req.user);
});

const generateToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
   });
};

export { registerUser, loginUser, getUser, updatePassword };
