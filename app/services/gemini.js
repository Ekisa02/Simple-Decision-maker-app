import { GoogleGenerativeAI } from "@google/generative-ai";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    // 1. Retrieve User Settings from Storage
    const personality = await AsyncStorage.getItem("ai_personality") || "Balanced";
    const customRules = await AsyncStorage.getItem("custom_instructions") || "None";
    
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    // 2. Define Personality Traits for the prompt
    let personalityPrompt = "";
    if (personality === "Strict") {
        personalityPrompt = "You are a Drill Sergeant. Be direct, no excuses, force productivity. Do not be nice.";
    } else if (personality === "Zen") {
        personalityPrompt = "You are a Zen Master. Prioritize mental health, calmness, and avoiding burnout. Be gentle.";
    } else {
        personalityPrompt = "You are a Balanced Assistant. Optimize for a mix of productivity and well-being.";
    }

    // 3. Construct the dynamic prompt
    const prompt = `
      Act as "DeciMate", an advanced AI decision maker.
      
      ${personalityPrompt}

      User Profile: ${userRole}
      Current Timeframe: ${timeFrame}
      
      USER'S CUSTOM RULES (IMPORTANT): "${customRules}"
      
      Options provided by user: ${selectedActivities.join(", ")}.
      ${fileName ? `The user also has a schedule/doc named: "${fileName}".` : ""}

      Your Task: 
      Analyze the options and the custom rules. Pick the SINGLE best activity.
      
      Format the response as this JSON object (no markdown):
      {
        "decision": "Short Action Title",
        "reason": "Reason based on your personality (${personality}) and the custom rules.",
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