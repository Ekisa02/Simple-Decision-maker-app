import { GoogleGenerativeAI } from "@google/generative-ai";

// Access the variable from the .env file
const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;


// --- DEBUGGING BLOCK ---
// Remove this after fixing the error
console.log("--------------------------------------------------");
console.log("Debug Check:");
console.log("API Key Exists?", !!API_KEY); // Should say 'true'
// Safety check to ensure the key loaded
if (API_KEY) {
    console.log("API Key starts with:", API_KEY.substring(0, 5) + "...");
} else {
    console.log("API Key is MISSING! Check .env file.");
}
console.log("--------------------------------------------------");
// -----------------------
const genAI = new GoogleGenerativeAI(API_KEY);

export const getBestDecision = async (userRole, selectedActivities, fileName, timeFrame) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    // We construct a complex prompt based on all inputs
    const prompt = `
      Act as "DeciMate", an advanced decision-making AI.
      
      User Profile: ${userRole}
      Context: The user has selected these potential activities: ${selectedActivities.join(", ")}.
      ${fileName ? `The user also has a schedule/doc named: "${fileName}".` : ""}
      Current Constraints: The timeframe is ${timeFrame}.

      Your Task: 
      Based on human nature (circadian rhythms, energy levels), the user's role, and the time of day, pick the SINGLE best activity to do right now.
      
      Format the response as this JSON object (no markdown):
      {
        "decision": "Short Action Title",
        "reason": "Scientific or logical reason why this fits the current time/mood.",
        "icon": "A relevant ionicon name"
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleanText);

  } catch (error) {
    console.error("AI Error:", error);
    return null;
  }
};