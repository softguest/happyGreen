// import { streamText } from "ai";
// import { geminiModel } from "@/lib/ai/gemini";
// import {
//   buildAdvisorSystemPrompt,
//   buildRecommendationPrompt,
// } from "@/lib/ai/prompts";
// import { auth } from "@clerk/nextjs/server";
// import { db } from "@/config/db";
// import { userProfiles, userSkills, greenSkills } from "@/config/schema";
// import { eq } from "drizzle-orm";
// import { CAMEROON_REGIONS } from "@/lib/constants";

// export async function POST(req: Request) {
//   try {
//     // ✅ Auth
//     const { userId } = await auth();
//     if (!userId) {
//       return new Response("Unauthorized", { status: 401 });
//     }

//     // ✅ Parse request
//     const body = await req.json();
//     const messages = Array.isArray(body.messages) ? body.messages : [];
//     const mode = body.mode || "chat";

//     // =========================
//     // ✅ Fetch user profile
//     // =========================
//     let profile: any = null;

//     try {
//       const profiles = await db
//         .select()
//         .from(userProfiles)
//         .where(eq(userProfiles.clerkId, userId))
//         .limit(1);

//       profile = profiles[0];
//     } catch (error) {
//       console.error("DB profile fetch failed:", error);
//     }

//     // ✅ Fallback profile
//     if (!profile) {
//       profile = {
//         id: "unknown",
//         fullName: "User",
//         region: "cameroon",
//         city: "",
//         currentSituation: "unknown",
//         interests: [],
//         availableResources: [],
//       };
//     }

//     // =========================
//     // ✅ Fetch user skills
//     // =========================
//     let existingSkillNames: string[] = [];

//     try {
//       if (profile.id !== "unknown") {
//         const savedSkills = await db
//           .select({ name: greenSkills.name })
//           .from(userSkills)
//           .innerJoin(greenSkills, eq(userSkills.skillId, greenSkills.id))
//           .where(eq(userSkills.userId, profile.id));

//         existingSkillNames = savedSkills.map((s) => s.name);
//       }
//     } catch (error) {
//       console.error("DB skills fetch failed:", error);
//     }

//     // =========================
//     // ✅ Region + climate
//     // =========================
//     const regionInfo = CAMEROON_REGIONS.find(
//       (r) => r.value === profile.region
//     );

//     const climateZone = regionInfo?.climateZone || "equatorial";
//     const regionLabel = regionInfo?.label || profile.region || "Cameroon";

//     // =========================
//     // ✅ Build user context
//     // =========================
//     const userContext = {
//       fullName: profile.fullName,
//       region: regionLabel,
//       city: profile.city || "",
//       climateZone,
//       currentSituation: profile.currentSituation || "unknown",
//       interests: (profile.interests as string[]) || [],
//       availableResources: (profile.availableResources as string[]) || [],
//       existingSkills: existingSkillNames,
//     };

//     // =========================
//     // ✅ System prompt
//     // =========================
//     const systemPrompt = buildAdvisorSystemPrompt(userContext);

//     // =========================
//     // ✅ Normalize messages (CRITICAL FIX)
//     // =========================
//     const safeMessages = (messages || [])
//       .filter((m: any) => m && m.role)
//       .map((m: any) => ({
//         role: m.role,
//         content:
//           typeof m.content === "string"
//             ? m.content
//             : Array.isArray(m.parts)
//             ? m.parts
//                 .filter((p: any) => p?.type === "text")
//                 .map((p: any) => p.text)
//                 .join("\n")
//             : "",
//       }))
//       .filter((m: any) => m.content.trim().length > 0);

//     // =========================
//     // ✅ Recommendation mode
//     // =========================
//     let finalMessages = safeMessages;

//     if (mode === "recommend") {
//       const recPrompt = buildRecommendationPrompt(userContext);

//       finalMessages = [
//         {
//           role: "user",
//           content: recPrompt,
//         },
//       ];
//     }

//     // =========================
//     // ✅ Stream AI response
//     // =========================
//     const result = streamText({
//       model: geminiModel,
//       system: systemPrompt,
//       messages: finalMessages,
//       temperature: 0.7,
//     });

//     return result.toTextStreamResponse();
//   } catch (error) {
//     console.error("AI Advisor error:", error);
//     return new Response("AI service error", { status: 500 });
//   }
// }

// app/api/ai/advisor/route.ts

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
// ✅ Zod Schema (CRITICAL)
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

export async function POST(req: Request) {
  try {
    // =========================
    // ✅ Auth
    // =========================
    const { userId } = await auth();
    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const mode = body.mode || "chat";

    // =========================
    // ✅ Fetch Profile
    // =========================
    let profile: any = null;

    try {
      const profiles = await db
        .select()
        .from(userProfiles)
        .where(eq(userProfiles.clerkId, userId))
        .limit(1);

      profile = profiles[0];
    } catch (error) {
      console.error("Profile fetch failed:", error);
    }

    if (!profile) {
      profile = {
        id: "unknown",
        fullName: "User",
        region: "cameroon",
        city: "",
        currentSituation: "unknown",
        interests: [],
        availableResources: [],
      };
    }

    // =========================
    // ✅ Fetch Skills
    // =========================
    let existingSkillNames: string[] = [];

    try {
      if (profile.id !== "unknown") {
        const savedSkills = await db
          .select({ name: greenSkills.name })
          .from(userSkills)
          .innerJoin(greenSkills, eq(userSkills.skillId, greenSkills.id))
          .where(eq(userSkills.userId, profile.id));

        existingSkillNames = savedSkills.map((s) => s.name);
      }
    } catch (error) {
      console.error("Skills fetch failed:", error);
    }

    // =========================
    // ✅ Region Info
    // =========================
    const regionInfo = CAMEROON_REGIONS.find(
      (r) => r.value === profile.region
    );

    const userContext = {
      fullName: profile.fullName,
      region: regionInfo?.label || profile.region || "Cameroon",
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
    // ✅ Prompts
    // =========================
    const systemPrompt = buildAdvisorSystemPrompt(userContext);

    let prompt = "";

    if (mode === "recommend") {
      prompt = `
${buildRecommendationPrompt(userContext)}

IMPORTANT:
- Return ONLY valid JSON
- No markdown
- No explanations
- No backticks

FORMAT:
{
  "recommendations": [
    {
      "skillName": "...",
      "category": "...",
      "whySuitable": "...",
      "requirements": ["..."],
      "startupCost": "...",
      "monthlyIncome": "...",
      "environmentalImpact": "...",
      "difficulty": "beginner | intermediate | advanced",
      "timeToLearn": "...",
      "quickWin": "...",
      "relevanceScore": number
    }
  ],
  "personalNote": "..."
}
`;
    }

    // =========================
    // ✅ Generate (NON-STREAM)
    // =========================
    const { text } = await generateText({
      model: geminiModel,
      system: systemPrompt,
      prompt,
      temperature: 0.7,
    });

    // =========================
    // ✅ Safe Parse
    // =========================
    let parsed;

    try {
      parsed = ResponseSchema.parse(JSON.parse(text));
    } catch (err) {
      console.error("Parse failed:", text);

      return Response.json(
        {
          error: "Invalid AI response format",
        },
        { status: 500 }
      );
    }

    // =========================
    // ✅ Success
    // =========================
    return Response.json(parsed);
  } catch (error) {
    console.error("AI Advisor error:", error);

    return Response.json(
      { error: "AI service error" },
      { status: 500 }
    );
  }
}