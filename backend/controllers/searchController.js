import User from "../models/User.js";
import InvestorMentor from "../models/InvestorMentor.js";
import { sendEmail } from "../config/emailService.js";
import getInvestorMentorRecommendation from "../utils/geminiApi.js";

const EMAIL_COOLDOWN_MS = 60000; // 60 sec 

const searchInvestorsMentors = async (req, res) => {
  try {
    const { email, query } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user has enough credits
    if (user.credits <= 0) {
      const now = new Date();
      
      // Send email only if no email was sent before or it's a new search attempt
      if(!user.lastEmailSent || now - user.lastEmailSent > EMAIL_COOLDOWN_MS) { 
        await sendEmail(email, "Recharge Credits",   `Your credits are exhausted. Please send an email to saurabhpingale93@gmail.com with the subject "recharge 5 credits" to get more credits.`);
        user.lastEmailSent = now;
        await user.save();
      } 
      return res.status(400).json({ message: "Your credits are exhausted. Please check your email to recharge." });
    }

    const investorsMentors = await InvestorMentor.find();

    // Filter relevant matches based on type and category in query
    const relevantMatches = investorsMentors.filter(item =>
      query.toLowerCase().includes(item.type.toLowerCase()) &&
      query.toLowerCase().includes(item.category.toLowerCase())
    );

    // If no relevant matches found, return "No match found"
    if (relevantMatches.length === 0) {
      return res.json({ result: "No suitable mentor or investor found.", remainingCredits: user.credits });
    }

    // Get recommendation from OpenAI API
    const recommendation = await getInvestorMentorRecommendation(query, relevantMatches);

    if (!recommendation || recommendation === "No match found") {
      return res.json({ result: "No suitable mentor or investor found.", remainingCredits: user.credits });
    }

    // Deduct credit only if a valid match is found
    user.credits -= 1;
    await user.save();

    res.json({ result: recommendation, remainingCredits: user.credits });
  } catch (error) {
    console.error("Error in searchInvestorsMentors:", error);
    return res.status(500).json({ message: "An error occurred while searching. Please try again later." });
  }
};

export { searchInvestorsMentors };
