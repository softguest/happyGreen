// // // app/api/ai/skill-advisor/route.ts
// // import { NextResponse } from "next/server";
// // import { auth } from "@clerk/nextjs/server";
// // import { db } from "@/config/db";
// // import { users } from "@/config/schema";
// // import { skills } from "@/config/schema";
// // import { eq } from "drizzle-orm";
// // import { generateSkillRecommendations } from "@/lib/ai/skill-advisor";

// // export async function POST() {
// //   const { userId } = await auth();

// //   if (!userId) {
// //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// //   }

// //   // 1. Get user profile
// //   const [user] = await db
// //     .select()
// //     .from(users)
// //     .where(eq(users.clerkUserId, userId));

// //   if (!user) {
// //     return NextResponse.json({ error: "User not found" }, { status: 404 });
// //   }

// //   // 2. Get all skills
// //   const allSkills = await db.select().from(skills);

// //   // 3. Generate AI recommendations
// //   const recommendations = await generateSkillRecommendations({
// //     region: user.region,
// //     interests: user.interests ?? [],
// //     skills: allSkills,
// //   });

// //   return NextResponse.json({ recommendations });
// // }


// import { NextResponse } from "next/server";
// import { db } from "@/config/db";
// import { skills } from "@/config/schema";
// import { skillLevels } from "@/config/schema";
// import { learningSteps } from "@/config/schema";
// import { eq } from "drizzle-orm";
// import { generateSkillAdvice } from "@/lib/ai/skill-advisor";

// export async function POST(req: Request) {
//   const body = await req.json();

//   const {
//     region,
//     interests,
//     goal,
//     resources,
//   } = body;

//   // 1️⃣ Fetch all skills
//   const allSkills = await db.select().from(skills);

//   // 2️⃣ Rank skills using AI logic
//   const rankedSkills = await generateSkillAdvice({
//     skills: allSkills,
//     region,
//     interests,
//     goal,
//     resources,
//   });

//   // 3️⃣ Get top skill
//   const selectedSkill = rankedSkills[0];

//   // 4️⃣ Fetch full roadmap
//   const levels = await db
//     .select()
//     .from(skillLevels)
//     .where(eq(skillLevels.skillId, selectedSkill.id));

//   const roadmap = [];

//   for (const level of levels) {
//     const steps = await db
//       .select()
//       .from(learningSteps)
//       .where(eq(learningSteps.skillLevelId, level.id));

//     roadmap.push({ level, steps });
//   }

//   return NextResponse.json({
//     recommendedSkill: selectedSkill,
//     roadmap,
//   });
// }


import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { skills, skillLevels, learningSteps } from "@/config/schema";
import { eq } from "drizzle-orm";
import { generateSkillAdvice } from "@/lib/ai/skill-advisor";
import type { SkillInput } from "@/lib/ai/skill-advisor";

export async function POST(req: Request) {
  try {
    const body = await req.json();
  
    const {
      region,
      interests,
      goal,
      resources,
    }: {
      region: string;
      interests: string[];
      goal: string;
      resources?: string | string[];
    } = body;
  
    /* Normalize resources into a string[] so it matches AdvisorInput.resources */
    let resourcesArray: string[] = [];
    if (Array.isArray(resources)) {
      resourcesArray = resources;
    } else if (typeof resources === "string" && resources.length) {
      // support a single comma-separated string or a single resource
      resourcesArray = resources.split(",").map((s) => s.trim()).filter(Boolean);
    }
  
    /* -------------------------------------------------
     * 1️⃣ Fetch all skills from DB
     * ------------------------------------------------- */
    const allSkills = await db.select().from(skills);
  
    if (!allSkills.length) {
      return NextResponse.json(
        { error: "No skills available" },
        { status: 404 }
      );
    }
  
    /* -------------------------------------------------
     * 2️⃣ Map DB skills → SkillInput (AI-safe shape)
     * ------------------------------------------------- */
    const skillInputs: SkillInput[] = allSkills.map((skill) => ({
      id: skill.id,
      name: skill.title, // ✅ title → name mapping
      description: skill.description,
      category: skill.category,
      duration: skill.duration ?? null,
      tools: skill.tools ?? null,
    }));
  
    /* -------------------------------------------------
     * 3️⃣ Rank skills using AI logic
     * ------------------------------------------------- */
    const rankedSkills = await generateSkillAdvice({
      skills: skillInputs,
      region,
      interests,
      goal,
      resources: resourcesArray,
    });

    if (!rankedSkills.length) {
      return NextResponse.json(
        { error: "No suitable skill found" },
        { status: 404 }
      );
    }

    /* -------------------------------------------------
     * 4️⃣ Select top recommended skill
     * ------------------------------------------------- */
    const selectedSkill = rankedSkills[0];

    /* -------------------------------------------------
     * 5️⃣ Fetch roadmap (levels + steps)
     * ------------------------------------------------- */
    const levels = await db
      .select()
      .from(skillLevels)
      .where(eq(skillLevels.skillId, selectedSkill.id));

    const roadmap = [];

    for (const level of levels) {
      const steps = await db
        .select()
        .from(learningSteps)
        .where(eq(learningSteps.skillLevelId, level.id));

      roadmap.push({
        level,
        steps,
      });
    }

    /* -------------------------------------------------
     * 6️⃣ Return response
     * ------------------------------------------------- */
    return NextResponse.json({
      recommendedSkill: selectedSkill,
      roadmap,
    });
  } catch (error) {
    console.error("Skill advisor error:", error);

    return NextResponse.json(
      { error: "Failed to generate skill recommendation" },
      { status: 500 }
    );
  }
}
