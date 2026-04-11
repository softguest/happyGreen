import { NextResponse } from "next/server";
import { generateText } from "ai";
import { geminiModel } from "@/lib/ai/gemini";
import { buildModuleContentPrompt } from "@/lib/ai/moduleContent";

export async function POST(req: Request) {
  try {
    const { skill, moduleTitle, difficulty, region } = await req.json();

    const prompt = buildModuleContentPrompt({
      skill,
      moduleTitle,
      difficulty,
      region,
    });

    const result = await generateText({
      model: geminiModel,
      prompt,
    });

    return NextResponse.json({
      content: result.text,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate module content" },
      { status: 500 }
    );
  }
}