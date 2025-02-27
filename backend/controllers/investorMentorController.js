import InvestorMentor from "../models/InvestorMentor.js";


const fetchInvestorsMentors = async (req, res) => {
    try {
        const investorsMentors = await InvestorMentor.find();
        console.log(investorsMentors)

        return res.status(200).json({ investorsMentors })
    } catch (error) {
        return res.status(400).json({ message: "Failed to fetch Investors and Mentors" })
    }
};

export { fetchInvestorsMentors };