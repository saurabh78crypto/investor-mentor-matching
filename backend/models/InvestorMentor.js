import mongoose from "mongoose";

const InvestorMentorSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    required: true, 
    enum: ["Investor", "Mentor"] 
  },
});

const InvestorMentor = mongoose.model("InvestorMentor", InvestorMentorSchema);
export default InvestorMentor;