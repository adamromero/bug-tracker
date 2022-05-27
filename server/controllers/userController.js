import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

const registerUser = asyncHandler(async (req, res) => {
   const { name, email, password } = req.body;

   if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please provide required fields");
   }

   const userExists = await User.findOne({ email });
   if (userExists) {
      res.status(400);
      throw new Error("User already exists");
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
      res.status(400);
      throw new Error("Something went wrong");
   }
});

const loginUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

   const user = await User.findOne({ email });
   console.log(password, user.password);

   if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
         token: generateToken(user._id),
      });
   } else {
      res.status(400);
      throw new Error("Invalid credentials");
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

export { registerUser, loginUser, getUser };
