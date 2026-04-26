import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { prompt, model = "llama-3.1-8b-instant" } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Check API keys
    if (!process.env.GROQ_API_KEY && !process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "AI service not configured properly. Please contact support." },
        { status: 500 }
      );
    }

    let response = "";
    let usedProvider = "";

    // Try Groq first (primary provider)
    if (process.env.GROQ_API_KEY) {
      try {
        console.log("🚀 Attempting Groq API...");
        const completion = await groq.chat.completions.create({
          messages: [
            {
              role: "system",
              content: "You are an expert content creator. Generate high-quality, ready-to-use content that exceeds expectations. Focus on comprehensive, detailed, publication-ready content that requires no editing. Provide exceptional value with insights and actionable advice."
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          model: model,
          temperature: 0.8,
          max_tokens: 4000, // Reduced to stay within Groq limits
          top_p: 0.95,
          frequency_penalty: 0.1,
          presence_penalty: 0.1,
          stream: false,
        });

        response = completion.choices[0]?.message?.content || "";
        usedProvider = "Groq";
        console.log("✅ Groq API successful");
      } catch (groqError: any) {
        console.error("❌ Groq API Error:", groqError);
        console.log("🔄 Falling back to Gemini...");
        
        // Fall back to Gemini
        if (process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY) {
          try {
            const model_gemini = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
            const result = await model_gemini.generateContent(prompt);
            response = result.response.text() || "";
            usedProvider = "Gemini";
            console.log("✅ Gemini API successful");
          } catch (geminiError: any) {
            console.error("❌ Gemini API Error:", geminiError);
            return NextResponse.json(
              { 
                error: "All AI services are currently unavailable. Please try again in a few minutes.",
                details: `Groq: ${groqError.message || 'Unknown error'}, Gemini: ${geminiError.message || 'Unknown error'}`
              },
              { status: 500 }
            );
          }
        } else {
          return NextResponse.json(
            { 
              error: "Groq API is unavailable and Gemini API key is not configured. Please try again later.",
              details: groqError.message || 'Unknown Groq error'
            },
            { status: 500 }
          );
        }
      }
    } else {
      // Only Gemini available
      try {
        console.log("🚀 Using Gemini API only...");
        const model_gemini = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const result = await model_gemini.generateContent(prompt);
        response = result.response.text() || "";
        usedProvider = "Gemini";
        console.log("✅ Gemini API successful");
      } catch (geminiError: any) {
        console.error("❌ Gemini API Error:", geminiError);
        return NextResponse.json(
          { 
            error: "Gemini API is currently unavailable. Please try again later.",
            details: geminiError.message || 'Unknown Gemini error'
          },
          { status: 500 }
        );
      }
    }

    if (!response) {
      return NextResponse.json(
        { error: "Unable to generate content. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      response,
      provider: usedProvider,
      message: usedProvider === "Gemini" ? "Generated using backup AI service" : undefined
    });

  } catch (error: any) {
    console.error("💥 General API Error:", error);
    return NextResponse.json(
      { 
        error: "An unexpected error occurred. Please try again.",
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}
