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

export const getBestDecision = async (userRole, selectedActivities, fileName, timeFrame, mode = "decision") => {
  try {
    const personality = await AsyncStorage.getItem("ai_personality") || "Balanced";
    const customRules = await AsyncStorage.getItem("custom_instructions") || "None";
    
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    let prompt = "";

    // --- MODE 1: TIMETABLE GENERATOR (New Feature) ---
    if (mode === "timetable") {
      prompt = `
        Act as an expert student planner named "DeciMate".
        User Profile: ${userRole} (${personality} style).
        Timeframe: ${timeFrame}
        
        The user needs a STUDY TIMETABLE for these subjects/tasks: 
        "${selectedActivities.join(", ")}".
        ${fileName ? `Context from file: "${fileName}".` : ""}
        
        Custom Rules: ${customRules}

        Your Task:
        Create a concise, realistic micro-schedule for the next 3-4 hours. 
        Include specific times (e.g., "10:00 - 10:45").
        Include short breaks (Pomodoro style).
        
        Format the response strictly as this JSON:
        {
          "decision": "Study Plan Generated",
          "reason": "• 00:00 - 00:45: [Task 1]\\n• 00:45 - 01:00: Break ☕\\n• 01:00 - 01:45: [Task 2]\\n• 01:45 - 02:30: [Task 3]",
          "icon": "calendar-clock"
        }
        (Use actual relative times based on 'now'. Keep the 'reason' field as a clean string with newlines for the list).
      `;
    } 
    // --- MODE 2: STANDARD DECISION (Existing) ---
    else {
      let personalityPrompt = "";
      if (personality === "Strict") personalityPrompt = "You are a Drill Sergeant. Be direct, force productivity.";
      else if (personality === "Zen") personalityPrompt = "You are a Zen Master. Prioritize mental health.";
      else personalityPrompt = "You are a Balanced Assistant.";

      prompt = `
        Act as "DeciMate", an AI decision maker. ${personalityPrompt}
        User Profile: ${userRole}. Time: ${timeFrame}.
        User's Options: ${selectedActivities.join(", ")}.
        ${fileName ? `File: "${fileName}".` : ""}
        Custom Rules: "${customRules}"

        Task: Pick the SINGLE best activity.
        Format as JSON:
        {
          "decision": "Short Action Title",
          "reason": "One sentence reason.",
          "icon": "A relevant ionicon name"
        }
      `;
    }

    const result = await model.generateContent(prompt);
    const text = result.response.text().replace(/```json/g, "").replace(/```/g, "").trim();
    
    return JSON.parse(text);

  } catch (error) {
    console.error("AI Error:", error);
    return {
      decision: "Connection Error",
      reason: "Please check your internet and try again.",
      icon: "alert-circle-outline"
    };
  }
};