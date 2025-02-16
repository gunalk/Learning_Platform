import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { dbConnect } from "./database/dbConnect.js";
const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;
dbConnect()

cors({
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Authorization", "Content-Type"],
});
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

app.use(express.json())
app.use((err,req,response,next)=>{
  console.log(err.stack)
  res.status(500).json({ message: err.message });
}
)
app.listen(PORT, async() => {
  console.log(`Server running on port ${PORT}`);
  
});

