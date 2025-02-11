import axios from "axios";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function getInvestorMentorRecommendation(query, dbData) {
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

        const formattedData = dbData.map(item => `Name: ${item.name}, Category: ${item.category}, Type: ${item.type}`).join("\n");
        const prompt = `You are an AI expert in matching users with investors or mentors.
                        The user provided this query: "${query}". 
                        Here is a filtered list of investors and mentors relevant to their request: ${formattedData}
                        Select the best match based on the most relevant category and type. Return only the name of the best match.`;

        const response = await axios.post(url, 
            {
                contents: [
                    {
                        role: "user",
                        parts: [{ text: prompt }]
                    }
                ]
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

         // Ensure we return only a string and avoid objects
         if (response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
            return response.data.candidates[0].content.parts[0].text.trim();
        } else {
            return "No match found";
        }
    } catch (error) {
        console.error("Error fetching recommendation:", error.response?.data || error.message);
        return "Error fetching recommendation";
    }
}

export default getInvestorMentorRecommendation;
