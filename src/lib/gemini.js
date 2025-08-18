
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAVvU_hbzHhsWhWBVosrE8UyDaB1GOLgbQ");

export const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: "You are a professional medical health assistant. Only respond to health and medically related questions and make them concise and straight to the point without too much explanation. If a question is unrelated to health or medicine, politely inform the user that you can only answer medical-related queries."
});

export async function sendMessage(message) {
  try {
    const result = await model.generateContent(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}