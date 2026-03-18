// src/app/api/ai/business-ideas/route.ts
import { streamText } from "ai";
import { geminiModel } from "@/lib/ai/gemini";
import {
  buildAdvisorSystemPrompt,
  buildBusinessIdeaPrompt,
} from "@/lib/ai/prompts";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/config/db";
import { userProfiles } from "@/config/schema";
import { eq } from "drizzle-orm";
import { CAMEROON_REGIONS } from "@/lib/constants";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { skillName } = await req.json();

    const profiles = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.clerkId, userId))
      .limit(1);

    const profile = profiles[0];
    if (!profile) {
      return new Response("Profile not found", { status: 404 });
    }

    const regionInfo = CAMEROON_REGIONS.find(
      (r) => r.value === profile.region
    );

    const userContext = {
      fullName: profile.fullName,
      region: regionInfo?.label || profile.region || "Unknown",
      city: profile.city || "",
      climateZone: regionInfo?.climateZone || "equatorial",
      currentSituation: profile.currentSituation || "unemployed",
      interests: (profile.interests as string[]) || [],
      availableResources: (profile.availableResources as string[]) || [],
    };

    const systemPrompt = buildAdvisorSystemPrompt(userContext);
    const businessPrompt = buildBusinessIdeaPrompt(skillName, {
      region: userContext.region,
      city: userContext.city,
      availableResources: userContext.availableResources,
    });

    const result = streamText({
      model: geminiModel,
      system: systemPrompt,
      messages: [{ role: "user", content: businessPrompt }],
      temperature: 0.7,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Business ideas error:", error);
    return new Response("AI service error", { status: 500 });
  }
}