import asyncHandler from "express-async-handler";
import multer from "multer";
import {
   getObjectSignedUrl,
   uploadImageFile,
   deleteImageFile,
} from "../config/aws.js";
import User from "../models/userModel.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const getImage = asyncHandler(async (req, res) => {
   const user = await User.findById(req.params.id);
   console.log("user image: ", user.image);
   const url = getObjectSignedUrl(user.image);
   console.log("url: ", url);
   res.status(200).json({ url });
});

const postImage = asyncHandler(async (req, res) => {
   const singleImageUpload = upload.single("image");

   singleImageUpload(req, res, async (err) => {
      if (err) {
         return res.status(400).json({ error: err.message });
      }

      const { originalname, buffer, mimetype } = req.file;
      await uploadImageFile(buffer, originalname, mimetype);
   });
});

const deleteImage = asyncHandler(async (req, res) => {});

export { getImage, postImage, deleteImage };
