import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

export async function POST(req: Request) {
  try {
    const { prompt, model = "llama-3.1-8b-instant" } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: model,
      temperature: 0.7,
      max_tokens: 4096,
      top_p: 1,
      stream: false,
    });

    const response = completion.choices[0]?.message?.content || "Unable to generate content. Please try again.";

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Groq API Error:", error);
    return NextResponse.json(
      { error: "AI service is temporarily unavailable. Please try again later." },
      { status: 500 }
    );
  }
}
