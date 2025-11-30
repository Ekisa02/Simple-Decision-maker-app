import { GoogleGenerativeAI } from "@google/generative-ai";

// Access the variable from the .env file
const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

// Safety check to ensure the key loaded
if (!API_KEY) {
  console.error("Error: Gemini API Key is missing. Check your .env file.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export const getBestDecision = async (userInput, timeFrame) => {
    // ... keep the rest of your existing code exactly the same ...
    // (copy the rest of the function from the previous step)
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
        const prompt = `
          You are an expert productivity assistant named DeciMate.
          
          The user has provided the following list of tasks, plans, or activities:
          "${userInput}"
          
          The intended timeframe is: ${timeFrame}.
          
          Your Goal: Analyze the list and strictly choose the ONE best option or create a prioritized summary. 
          If it's a list of conflicting options, pick the most logical one based on health and productivity.
          
          Format the response as a valid JSON object with these fields:
          {
            "decision": "Short Title of the decision",
            "reason": "A 1-sentence motivation why this is the best choice.",
            "icon": "A suggested icon name (choose one from: wallet-outline, pizza-outline, walk-outline, book-outline, call-outline, fitness-outline, alarm-outline, star-outline)"
          }
          Do not include markdown formatting like \`\`\`json. Just return the raw JSON string.
        `;
    
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
    
        const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
        
        return JSON.parse(cleanText);
      } catch (error) {
        console.error("AI Error:", error);
        return {
          decision: "Error",
          reason: "Could not connect to AI. Please try again.",
          icon: "alert-circle-outline"
        };
      }
};