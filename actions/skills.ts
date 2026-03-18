// src/actions/skills.ts
"use server";

import { db } from "@/config/db";
import {
  userProfiles,
  greenSkills,
  userSkills,
  aiConversations,
} from "@/config/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getUserWithSkills() {
  const { userId } = await auth();
  if (!userId) return null;

  const profiles = await db
    .select()
    .from(userProfiles)
    .where(eq(userProfiles.clerkId, userId))
    .limit(1);

  const profile = profiles[0];
  if (!profile) return null;

  // Get user's saved skills with skill details
  const savedSkills = await db
    .select({
      userSkill: userSkills,
      skill: greenSkills,
    })
    .from(userSkills)
    .innerJoin(greenSkills, eq(userSkills.skillId, greenSkills.id))
    .where(eq(userSkills.userId, profile.id));

  return { profile, savedSkills };
}

export async function saveSkillToProfile(data: {
  skillName: string;
  category: string;
  aiReason: string;
}) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  try {
    const profiles = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.clerkId, userId))
      .limit(1);

    const profile = profiles[0];
    if (!profile) return { success: false, error: "Profile not found" };

    // Find the skill in our catalog
    let skill = await db
      .select()
      .from(greenSkills)
      .where(eq(greenSkills.name, data.skillName))
      .limit(1);

    let skillId: string;

    if (skill.length > 0) {
      skillId = skill[0].id;
    } else {
      // Create the skill if it doesn't exist in catalog
      // (AI might recommend skills not yet in our seed data)
      const [newSkill] = await db
        .insert(greenSkills)
        .values({
          name: data.skillName,
          category: data.category,
          description: data.aiReason,
          shortDescription: data.aiReason.substring(0, 100),
          difficulty: "beginner",
          isActive: true,
        })
        .returning();
      skillId = newSkill.id;
    }

    // Check if already saved
    const existing = await db
      .select()
      .from(userSkills)
      .where(
        and(
          eq(userSkills.userId, profile.id),
          eq(userSkills.skillId, skillId)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      return { success: false, error: "Skill already saved" };
    }

    // Save the skill
    await db.insert(userSkills).values({
      userId: profile.id,
      skillId: skillId,
      status: "interested",
      recommendedByAi: true,
      aiRecommendationReason: data.aiReason,
    });

    // Award points
    await db
      .update(userProfiles)
      .set({
        totalPoints: profile.totalPoints + 15,
        updatedAt: new Date(),
      })
      .where(eq(userProfiles.id, profile.id));

    revalidatePath("/dashboard/skills");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Save skill error:", error);
    return { success: false, error: "Failed to save skill" };
  }
}

export async function removeSkillFromProfile(userSkillId: string) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  try {
    const profiles = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.clerkId, userId))
      .limit(1);

    if (!profiles[0]) return { success: false, error: "Profile not found" };

    await db
      .delete(userSkills)
      .where(
        and(
          eq(userSkills.id, userSkillId),
          eq(userSkills.userId, profiles[0].id)
        )
      );

    revalidatePath("/dashboard/skills");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Remove skill error:", error);
    return { success: false, error: "Failed to remove skill" };
  }
}

export async function updateSkillStatus(
  userSkillId: string,
  status: "interested" | "learning" | "completed"
) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  try {
    const profiles = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.clerkId, userId))
      .limit(1);

    if (!profiles[0]) return { success: false, error: "Profile not found" };

    const updateData: Record<string, unknown> = { status };

    if (status === "learning") {
      updateData.startedAt = new Date();
    } else if (status === "completed") {
      updateData.completedAt = new Date();
    }

    await db
      .update(userSkills)
      .set(updateData)
      .where(
        and(
          eq(userSkills.id, userSkillId),
          eq(userSkills.userId, profiles[0].id)
        )
      );

    revalidatePath("/dashboard/skills");
    return { success: true };
  } catch (error) {
    console.error("Update skill status error:", error);
    return { success: false, error: "Failed to update skill" };
  }
}

export async function saveConversation(
  conversationType: string,
  messages: { role: string; content: string; timestamp: string }[]
) {
  const { userId } = await auth();
  if (!userId) return { success: false };

  try {
    const profiles = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.clerkId, userId))
      .limit(1);

    if (!profiles[0]) return { success: false };

    // Check if conversation exists
    const existing = await db
      .select()
      .from(aiConversations)
      .where(
        and(
          eq(aiConversations.userId, profiles[0].id),
          eq(aiConversations.conversationType, conversationType)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(aiConversations)
        .set({
          messages,
          updatedAt: new Date(),
        })
        .where(eq(aiConversations.id, existing[0].id));
    } else {
      await db.insert(aiConversations).values({
        userId: profiles[0].id,
        conversationType,
        messages,
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Save conversation error:", error);
    return { success: false };
  }
}

export async function getConversationHistory(conversationType: string) {
  const { userId } = await auth();
  if (!userId) return null;

  const profiles = await db
    .select()
    .from(userProfiles)
    .where(eq(userProfiles.clerkId, userId))
    .limit(1);

  if (!profiles[0]) return null;

  const conversations = await db
    .select()
    .from(aiConversations)
    .where(
      and(
        eq(aiConversations.userId, profiles[0].id),
        eq(aiConversations.conversationType, conversationType)
      )
    )
    .limit(1);

  return conversations[0] || null;
}

export async function getAllGreenSkills() {
  return await db
    .select()
    .from(greenSkills)
    .where(eq(greenSkills.isActive, true));
}