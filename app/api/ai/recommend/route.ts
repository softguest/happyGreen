import { generateText } from "ai";
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
import { z } from "zod";

// =========================
// ✅ ZOD SCHEMA
// =========================
const RecommendationSchema = z.object({
  skillName: z.string(),
  category: z.string(),
  whySuitable: z.string(),
  requirements: z.array(z.string()),
  startupCost: z.string(),
  monthlyIncome: z.string(),
  environmentalImpact: z.string(),
  difficulty: z.string(),
  timeToLearn: z.string(),
  quickWin: z.string(),
  relevanceScore: z.number(),
});

const ResponseSchema = z.object({
  recommendations: z.array(RecommendationSchema),
  personalNote: z.string(),
});

// =========================
// ✅ CLEAN JSON HELPER
// =========================
function extractJson(text: string) {
  // Remove markdown code blocks
  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return cleaned;
}

export async function POST(req: Request) {
  try {
    // =========================
    // ✅ AUTH
    // =========================
    const { userId } = await auth();
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    // =========================
    // ✅ FETCH PROFILE
    // =========================
    const profiles = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.clerkId, userId))
      .limit(1);

    const profile = profiles[0];

    if (!profile) {
      return new Response("Profile not found", { status: 404 });
    }

    // =========================
    // ✅ FETCH USER SKILLS
    // =========================
    const savedSkills = await db
      .select({ name: greenSkills.name })
      .from(userSkills)
      .innerJoin(greenSkills, eq(userSkills.skillId, greenSkills.id))
      .where(eq(userSkills.userId, profile.id));

    const existingSkillNames = savedSkills.map((s) => s.name);

    // =========================
    // ✅ REGION CONTEXT
    // =========================
    const regionInfo = CAMEROON_REGIONS.find(
      (r) => r.value === profile.region
    );

    const userContext = {
      fullName: profile.fullName,
      region: regionInfo?.label || "Cameroon",
      city: profile.city || "",
      climateZone: regionInfo?.climateZone || "equatorial",
      currentSituation: profile.currentSituation || "unknown",
      interests: Array.isArray(profile.interests)
        ? profile.interests
        : [],
      availableResources: Array.isArray(profile.availableResources)
        ? profile.availableResources
        : [],
      existingSkills: existingSkillNames,
    };

    // =========================
    // ✅ PROMPTS
    // =========================
    const systemPrompt = buildAdvisorSystemPrompt(userContext);

    const recPrompt = buildRecommendationPrompt(userContext);

    // =========================
    // ✅ AI GENERATION
    // =========================
    const result = await generateText({
      model: geminiModel,
      system: systemPrompt,
      prompt: recPrompt,
      temperature: 0.7,
    });

    // =========================
    // ✅ SAFE PARSING
    // =========================
    let parsed;

    try {
      const cleaned = extractJson(result.text);

      parsed = JSON.parse(cleaned);

      // Validate with Zod
      parsed = ResponseSchema.parse(parsed);
    } catch (err) {
      console.error("AI parsing failed:", result.text);

      return new Response(
        JSON.stringify({
          error: "Invalid AI response",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // =========================
    // ✅ SUCCESS RESPONSE
    // =========================
    return Response.json(parsed);
  } catch (error) {
    console.error("AI Advisor error:", error);

    return new Response(
      JSON.stringify({
        error: "Server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}