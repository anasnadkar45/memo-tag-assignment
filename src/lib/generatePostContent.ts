"use server"

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey as string);

export async function generatePostContent(title: string): Promise<string> {
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not set in the environment variables.");
    }

    const prompt = `
    Write an engaging and informative content piece based on the following title:
    
    - Title: "${title}"
    
    The content should be well-structured, approximately 100 words long, and provide valuable insights relevant to the title. Ensure clarity, engagement, and coherence.
  `;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        return result.response.text().trim();
    } catch (error) {
        console.error("Error generating description:", error);
        throw new Error("Failed to generate description. Please try again later.");
    }
}