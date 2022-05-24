import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import projectRoutes from "./routes/projectRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import connectDB from "./config/db.js";

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/project", projectRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ticket", ticketRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
