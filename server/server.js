import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();
import projectRoutes from "./routes/projectRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import allUsersRoutes from "./routes/allUsersRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import awsRoutes from "./routes/awsRoutes.js";
import connectDB from "./config/db.js";

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/project", projectRoutes);
app.use("/api/users", userRoutes);
app.use("/api/allUsers", allUsersRoutes);
app.use("/api/ticket", ticketRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/aws", awsRoutes);

if (process.env.NODE_ENV === "production") {
   const __filename = fileURLToPath(import.meta.url);
   const __dirname = path.dirname(__filename);

   app.use(express.static(path.join(__dirname, "../client/build")));

   app.get("*", (req, res) =>
      res.sendFile(
         path.resolve(__dirname, "../", "client", "build", "index.html")
      )
   );
} else {
   app.get("/", (req, res) => res.send("Please set to production"));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
