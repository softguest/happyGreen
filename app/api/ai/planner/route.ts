// src/app/api/ai/planner/route.ts
import { streamText } from "ai";
import { geminiModel } from "@/lib/ai/gemini";
import {
  buildPlannerSystemPrompt,
  buildSectionPrompt,
  buildFullPlanReviewPrompt,
} from "@/lib/ai/business-prompts";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/config/db";
import { userProfiles } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { mode, section, planContext, plan, messages } = await req.json();

    // Get user profile
    const profiles = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.clerkId, userId))
      .limit(1);

    const profile = profiles[0];
    if (!profile) {
      return new Response("Profile not found", { status: 404 });
    }

    const systemPrompt = buildPlannerSystemPrompt({
      fullName: profile.fullName,
      region: profile.region,
      city: profile.city,
      availableResources: (profile.availableResources as string[]) || [],
    });

    let userMessage: string;

    switch (mode) {
      case "generate_section":
        userMessage = buildSectionPrompt(section, planContext);
        break;
      case "review":
        userMessage = buildFullPlanReviewPrompt(plan);
        break;
      case "chat":
        // Free-form chat about the business plan
        const result = streamText({
          model: geminiModel,
          system: systemPrompt,
          messages: messages,
          maxOutputTokens: 1500,
          temperature: 0.7,
        });
        return result.toTextStreamResponse();
      default:
        userMessage = messages?.[0]?.content || "Help me with my business plan.";
    }

    const streamResult = streamText({
      model: geminiModel,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
      maxOutputTokens: 1500,
      temperature: 0.7,
    });

    return streamResult.toTextStreamResponse();
  } catch (error) {
    console.error("Planner AI error:", error);
    return new Response("AI service error", { status: 500 });
  }
}