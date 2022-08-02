import {
   S3Client,
   PutObjectCommand,
   DeleteObjectCommand,
   GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3Client = new S3Client({
   credentials: {
      accessKeyId,
      secretAccessKey,
   },
   region,
});

const uploadImageFile = (buffer, filename, mimetype) => {
   const uploadParams = {
      Bucket: bucketName,
      Body: buffer,
      Key: filename,
      ContentType: mimetype,
   };

   return s3Client.send(new PutObjectCommand(uploadParams));
};

const deleteImageFile = () => {
   const deleteParams = {
      Bucket: bucketName,
      Key: "",
   };

   return s3Client.send(new DeleteObjectCommand(deleteParams));
};

const getObjectSignedUrl = async (key) => {
   const params = {
      Bucket: bucketName,
      Key: key,
   };

   const command = new GetObjectCommand(params);
   const seconds = 60;
   const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });

   return url;
};

export { getObjectSignedUrl, uploadImageFile, deleteImageFile };
