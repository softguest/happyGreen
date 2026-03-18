// src/app/api/ai/advisor/route.ts
import { streamText } from "ai";
import { geminiModel } from "@/lib/ai/gemini";
import {
  buildAdvisorSystemPrompt,
  buildRecommendationPrompt,
} from "@/lib/ai/prompts";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/config/db";
import { userProfiles, userSkills, greenSkills } from "@/config/schema";
import { eq } from "drizzle-orm";
import { CAMEROON_REGIONS } from "@/lib/constants";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { messages, mode } = await req.json();

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

    // Get user's existing saved skills
    const savedSkills = await db
      .select({ name: greenSkills.name })
      .from(userSkills)
      .innerJoin(greenSkills, eq(userSkills.skillId, greenSkills.id))
      .where(eq(userSkills.userId, profile.id));

    const existingSkillNames = savedSkills.map((s) => s.name);

    // Get climate zone
    const regionInfo = CAMEROON_REGIONS.find(
      (r) => r.value === profile.region
    );
    const climateZone = regionInfo?.climateZone || "equatorial";
    const regionLabel = regionInfo?.label || profile.region || "Unknown";

    const userContext = {
      fullName: profile.fullName,
      region: regionLabel,
      city: profile.city || "",
      climateZone,
      currentSituation: profile.currentSituation || "unemployed",
      interests: (profile.interests as string[]) || [],
      availableResources: (profile.availableResources as string[]) || [],
      existingSkills: existingSkillNames,
    };

    const systemPrompt = buildAdvisorSystemPrompt(userContext);

    // If mode is "recommend", add recommendation prompt to messages
    let finalMessages = messages;
    if (mode === "recommend") {
      const recPrompt = buildRecommendationPrompt(userContext);
      finalMessages = [{ role: "user", content: recPrompt }];
    }

    const result = streamText({
      model: geminiModel,
      system: systemPrompt,
      messages: finalMessages,
      temperature: 0.7,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("AI Advisor error:", error);
    return new Response("AI service error", { status: 500 });
  }
}