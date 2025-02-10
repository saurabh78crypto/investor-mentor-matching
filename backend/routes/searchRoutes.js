import express from "express";
import { searchInvestorsMentors } from "../controllers/searchController.js";

const router = express.Router();

router.post("/", searchInvestorsMentors);

export default router;
