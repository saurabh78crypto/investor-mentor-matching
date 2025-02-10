import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cron from "node-cron";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import { checkRechargeEmails } from "./utils/gmailListener.js";

dotenv.config();

const app = express();

// MongoDB Connection
connectDB();

app.use(express.json());
app.use(cors());

// Run Gmail Listener every 5 minutes
cron.schedule("*/5 * * * *", () => {
  console.log("Checking for recharge emails...");
  checkRechargeEmails();
})

app.use("/api/auth", authRoutes);
app.use("/api/search", searchRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
