import InvestorMentor from "../models/InvestorMentor";


const fetchInvestorsMentors = async () => {
    try {
        const investorsMentors = await InvestorMentor.find();

        return res.status(200).json({ investorsMentors })
    } catch (error) {
        return res.status(400).json({ message: "Failed to fetch Investors and Mentors" })
    }
};

export { fetchInvestorsMentors };