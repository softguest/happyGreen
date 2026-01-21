// app/api/skills/[skillId]/route.ts
import { db } from "@/config/db";
import { skills, skillLevels, learningSteps, userProgress } from "@/config/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ skillId: string }> }
) {
    const { skillId } = await context.params;
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const skill = await db.query.skills.findFirst({
    where: eq(skills.id, skillId),
  });

  const levels = await db.query.skillLevels.findMany({
    where: eq(skillLevels.skillId, skillId),
    with: {
      steps: {
        with: {
          progress: {
            where: eq(userProgress.userId, userId),
          },
        },
      },
    },
    orderBy: skillLevels.order,
  });

  return Response.json({ skill, levels });
}
