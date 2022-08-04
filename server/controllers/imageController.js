import asyncHandler from "express-async-handler";
import multer from "multer";

const storage = multer.diskStorage({
   destination: "./client/public/uploads/",
   filename: (req, file, cb) => {
      cb(null, file.originalname);
   },
});

const upload = multer({ storage }).single("image");

const uploadImage = asyncHandler(async (req, res) => {
   upload(req, res, (err) => {
      console.log("req.file: ", req.file.filename);
      res.status(200).json({
         image: req.file.filename,
      });
   });
});

export { uploadImage };
