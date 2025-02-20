import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { dbConnect } from "./database/dbConnect.js";
import authRoutes from "./routes/authRoutes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

dbConnect();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Authorization", "Content-Type"],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/auth", authRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
