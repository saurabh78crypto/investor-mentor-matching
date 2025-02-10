import User from "../models/User.js";
import InvestorMentor from "../models/InvestorMentor.js";
import { sendEmail } from "../config/emailService.js";
import getInvestorMentorRecommendation from "../utils/geminiApi.js";

const searchInvestorsMentors = async (req, res) => {
  try {
    const { email, query } = req.body;

    const user = await User.findOneAndUpdate(
      { email, credits: { $gt: 0 } }, // Ensure user has credits before decrementing
      { $inc: { credits: -1 } }, // Deducts 1 credit automatically
      { new: true }
    ); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.credits <= 0) {
      await sendEmail(email, "Recharge Credits",   `Your credits are exhausted. Please send an email to saurabhpingale93@gmail.com with the subject "recharge 5 credits" to get more credits.`);
      return res.status(400).json({ message: "You’ve run out of credits. Please recharge to continue using our services." });
    }

    const investorsMentors = await InvestorMentor.find();

    // Get recommendation from OpenAI API
    const recommendation = await getInvestorMentorRecommendation(query, investorsMentors);

    if (!recommendation || recommendation === "No match found") {
      return res.json({ result: "No suitable mentor or investor found." });
    }

    // Deduct credit only if API returns a valid response
    user.credits -= 1;
    await user.save();

    res.json({ result: recommendation, remainingCredits: user.credits });
  } catch (error) {
    console.error("Error in searchInvestorsMentors:", error);
    return res.status(500).json({ message: "An error occurred while searching. Please try again later." });
  }
};

export { searchInvestorsMentors };
