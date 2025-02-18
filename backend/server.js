import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { dbConnect } from "./database/dbConnect.js";
import authRoutes from "./routes/authRoutes/index.js";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to Database
dbConnect();

// CORS Configuration
const corsOptions = {
  origin: process.env.CLIENT_URL , // Change to process.env.CLIENT_URL if needed
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Authorization", "Content-Type"],
};

// Apply CORS Middleware
app.use(cors(corsOptions));

// Middleware
app.use(express.json()); // Parse incoming JSON data

// Routes
app.use("/auth", authRoutes);

// Global Error Handling Middleware (Fixed)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
