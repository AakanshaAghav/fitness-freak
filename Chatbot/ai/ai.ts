"use server";

// Types
import { ChatItem } from "@/common/types";

// All data
import { data } from "./data"; // Your health tips or food data should be here

// Google AI
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const dataString = JSON.stringify(data);

export const getChatResponse = async (chats: ChatItem[], message: string) => {
  try {
    const chatsContent = chats
      .map(chat => `${chat.source}: ${chat.message}`)
      .join("\n");

    // Improved prompt for confident, clear, and safe health advice
    const prompt = `
You are a helpful and friendly AI Health Tracker Bot. Your goals:
- Provide clear, confident answers about health, fitness, nutrition, and diet.
- Suggest healthy food, diet tips, and wellness advice based on context and data provided.
- Use Markdown formatting, including tables or bullet points where helpful.
- Never provide medical diagnoses or treatment advice.
- If a serious health condition is mentioned, strongly recommend consulting a licensed healthcare professional.
- Politely refuse to answer questions unrelated to health or food, directing the user back to the topic.
- Keep your tone encouraging and supportive.

Context Data:
${dataString}

Conversation History:
${chatsContent}
User asked: "${message}"
Bot answer:
`;

    const resp = await model.generateContent(prompt);
    const responseText = await resp.response.text();

    // Extra: fallback if response is empty or too short
    if (!responseText || responseText.trim().length < 10) {
      return "I'm here to support your health and wellness journey! For personalized advice, please consult a qualified healthcare professional.";
    }

    return responseText;
  } catch (error: unknown) {
    console.error("Error in AI:", error);
    return "Sorry, something went wrong while processing your request. Please try again later.";
  }
};
