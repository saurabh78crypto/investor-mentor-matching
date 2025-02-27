import express from "express";
import { fetchInvestorsMentors } from "../controllers/investorMentorController.js";
const router = express.Router();

router.get("/", fetchInvestorsMentors);

export default router;
