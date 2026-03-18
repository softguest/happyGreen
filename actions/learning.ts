// src/actions/learning.ts
"use server";

import { db } from "@/config/db";
import {
  userProfiles,
  greenSkills,
  learningPathways,
  learningModules,
  userModuleProgress,
  userSkills,
  userBadges,
  badges,
} from "@/config/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and, asc, count, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// ============================================
// Helper: Get current user's profile
// ============================================
async function getCurrentProfile() {
  const { userId } = await auth();
  if (!userId) return null;

  const profiles = await db
    .select()
    .from(userProfiles)
    .where(eq(userProfiles.clerkId, userId))
    .limit(1);

  return profiles[0] || null;
}

// ============================================
// Get all published pathways with skill info
// ============================================
export async function getAllPathways() {
  const profile = await getCurrentProfile();
  if (!profile) return { pathways: [], userProgress: {} };

  const pathwaysList = await db
    .select({
      pathway: learningPathways,
      skill: greenSkills,
    })
    .from(learningPathways)
    .innerJoin(greenSkills, eq(learningPathways.skillId, greenSkills.id))
    .where(eq(learningPathways.isPublished, true));

  // Get user's progress for each pathway
  const progressData = await db
    .select({
      pathwayId: userModuleProgress.pathwayId,
      total: count(),
      completed: sql<number>`COUNT(CASE WHEN ${userModuleProgress.status} = 'completed' THEN 1 END)`,
    })
    .from(userModuleProgress)
    .where(eq(userModuleProgress.userId, profile.id))
    .groupBy(userModuleProgress.pathwayId);

  const userProgress: Record<
    string,
    { total: number; completed: number }
  > = {};
  progressData.forEach((p) => {
    userProgress[p.pathwayId] = {
      total: Number(p.total),
      completed: Number(p.completed),
    };
  });

  return { pathways: pathwaysList, userProgress };
}

// ============================================
// Get single pathway with all modules
// ============================================
export async function getPathwayWithModules(pathwayId: string) {
  const profile = await getCurrentProfile();
  if (!profile) return null;

  // Get pathway + skill
  const pathwayData = await db
    .select({
      pathway: learningPathways,
      skill: greenSkills,
    })
    .from(learningPathways)
    .innerJoin(greenSkills, eq(learningPathways.skillId, greenSkills.id))
    .where(eq(learningPathways.id, pathwayId))
    .limit(1);

  if (pathwayData.length === 0) return null;

  // Get all modules ordered by index
  const modules = await db
    .select()
    .from(learningModules)
    .where(eq(learningModules.pathwayId, pathwayId))
    .orderBy(asc(learningModules.orderIndex));

  // Get user's progress for each module
  const progress = await db
    .select()
    .from(userModuleProgress)
    .where(
      and(
        eq(userModuleProgress.userId, profile.id),
        eq(userModuleProgress.pathwayId, pathwayId)
      )
    );

  const progressMap: Record<string, typeof progress[0]> = {};
  progress.forEach((p) => {
    progressMap[p.moduleId] = p;
  });

  return {
    ...pathwayData[0],
    modules,
    progressMap,
    profileId: profile.id,
  };
}

// ============================================
// Get a single module with content
// ============================================
export async function getModuleWithProgress(
  pathwayId: string,
  moduleId: string
) {
  const profile = await getCurrentProfile();
  if (!profile) return null;

  // Get the module
  const moduleData = await db
    .select()
    .from(learningModules)
    .where(eq(learningModules.id, moduleId))
    .limit(1);

  if (moduleData.length === 0) return null;

  // Get pathway info
  const pathwayData = await db
    .select({
      pathway: learningPathways,
      skill: greenSkills,
    })
    .from(learningPathways)
    .innerJoin(greenSkills, eq(learningPathways.skillId, greenSkills.id))
    .where(eq(learningPathways.id, pathwayId))
    .limit(1);

  if (pathwayData.length === 0) return null;

  // Get all modules for navigation (prev/next)
  const allModules = await db
    .select({
      id: learningModules.id,
      orderIndex: learningModules.orderIndex,
      title: learningModules.title,
    })
    .from(learningModules)
    .where(eq(learningModules.pathwayId, pathwayId))
    .orderBy(asc(learningModules.orderIndex));

  // Get user's progress for this module
  const progress = await db
    .select()
    .from(userModuleProgress)
    .where(
      and(
        eq(userModuleProgress.userId, profile.id),
        eq(userModuleProgress.moduleId, moduleId)
      )
    )
    .limit(1);

  // Get progress for all modules (for sidebar)
  const allProgress = await db
    .select()
    .from(userModuleProgress)
    .where(
      and(
        eq(userModuleProgress.userId, profile.id),
        eq(userModuleProgress.pathwayId, pathwayId)
      )
    );

  const allProgressMap: Record<string, typeof allProgress[0]> = {};
  allProgress.forEach((p) => {
    allProgressMap[p.moduleId] = p;
  });

  // Find prev and next modules
  const currentIndex = allModules.findIndex((m) => m.id === moduleId);
  const prevModule = currentIndex > 0 ? allModules[currentIndex - 1] : null;
  const nextModule =
    currentIndex < allModules.length - 1
      ? allModules[currentIndex + 1]
      : null;

  return {
    module: moduleData[0],
    pathway: pathwayData[0].pathway,
    skill: pathwayData[0].skill,
    progress: progress[0] || null,
    allModules,
    allProgressMap,
    prevModule,
    nextModule,
    profileId: profile.id,
  };
}

// ============================================
// Start a module (mark as in_progress)
// ============================================
export async function startModule(pathwayId: string, moduleId: string) {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "Unauthorized" };

  try {
    // Check if progress record exists
    const existing = await db
      .select()
      .from(userModuleProgress)
      .where(
        and(
          eq(userModuleProgress.userId, profile.id),
          eq(userModuleProgress.moduleId, moduleId)
        )
      )
      .limit(1);

    if (existing.length === 0) {
      await db.insert(userModuleProgress).values({
        userId: profile.id,
        moduleId,
        pathwayId,
        status: "in_progress",
        startedAt: new Date(),
      });
    } else if (existing[0].status === "not_started") {
      await db
        .update(userModuleProgress)
        .set({
          status: "in_progress",
          startedAt: new Date(),
        })
        .where(eq(userModuleProgress.id, existing[0].id));
    }

    revalidatePath(`/dashboard/learn/${pathwayId}`);
    revalidatePath(`/dashboard/learn/${pathwayId}/${moduleId}`);
    return { success: true };
  } catch (error) {
    console.error("Start module error:", error);
    return { success: false, error: "Failed to start module" };
  }
}

// ============================================
// Complete a module (with optional quiz score)
// ============================================
export async function completeModule(
  pathwayId: string,
  moduleId: string,
  data: {
    quizScore?: number;
    quizAttempts?: number;
    practicalTaskCompleted?: boolean;
    notes?: string;
  }
) {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "Unauthorized" };

  try {
    const existing = await db
      .select()
      .from(userModuleProgress)
      .where(
        and(
          eq(userModuleProgress.userId, profile.id),
          eq(userModuleProgress.moduleId, moduleId)
        )
      )
      .limit(1);

    const updateData = {
      status: "completed" as const,
      completedAt: new Date(),
      quizScore: data.quizScore,
      quizAttempts: data.quizAttempts,
      practicalTaskCompleted: data.practicalTaskCompleted ?? false,
      notes: data.notes,
    };

    if (existing.length > 0) {
      await db
        .update(userModuleProgress)
        .set(updateData)
        .where(eq(userModuleProgress.id, existing[0].id));
    } else {
      await db.insert(userModuleProgress).values({
        userId: profile.id,
        moduleId,
        pathwayId,
        startedAt: new Date(),
        ...updateData,
      });
    }

    // Award points for completing a module
    await db
      .update(userProfiles)
      .set({
        totalPoints: profile.totalPoints + 20,
        updatedAt: new Date(),
      })
      .where(eq(userProfiles.id, profile.id));

    // Check if entire pathway is completed
    await checkPathwayCompletion(profile.id, pathwayId);

    revalidatePath(`/dashboard/learn/${pathwayId}`);
    revalidatePath(`/dashboard/learn/${pathwayId}/${moduleId}`);
    revalidatePath("/dashboard/learn");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Complete module error:", error);
    return { success: false, error: "Failed to complete module" };
  }
}

// ============================================
// Save notes for a module
// ============================================
export async function saveModuleNotes(
  pathwayId: string,
  moduleId: string,
  notes: string
) {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "Unauthorized" };

  try {
    const existing = await db
      .select()
      .from(userModuleProgress)
      .where(
        and(
          eq(userModuleProgress.userId, profile.id),
          eq(userModuleProgress.moduleId, moduleId)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(userModuleProgress)
        .set({ notes })
        .where(eq(userModuleProgress.id, existing[0].id));
    } else {
      await db.insert(userModuleProgress).values({
        userId: profile.id,
        moduleId,
        pathwayId,
        status: "in_progress",
        startedAt: new Date(),
        notes,
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Save notes error:", error);
    return { success: false, error: "Failed to save notes" };
  }
}

// ============================================
// Check if all modules in a pathway are done
// ============================================
async function checkPathwayCompletion(
  profileId: string,
  pathwayId: string
) {
  // Get total modules in pathway
  const [totalResult] = await db
    .select({ count: count() })
    .from(learningModules)
    .where(eq(learningModules.pathwayId, pathwayId));

  const totalModules = totalResult?.count || 0;

  // Get completed modules
  const [completedResult] = await db
    .select({ count: count() })
    .from(userModuleProgress)
    .where(
      and(
        eq(userModuleProgress.userId, profileId),
        eq(userModuleProgress.pathwayId, pathwayId),
        eq(userModuleProgress.status, "completed")
      )
    );

  const completedModules = completedResult?.count || 0;

  if (totalModules > 0 && completedModules >= totalModules) {
    // Pathway completed — award bonus points
    await db
      .update(userProfiles)
      .set({
        totalPoints: sql`${userProfiles.totalPoints} + 100`,
        updatedAt: new Date(),
      })
      .where(eq(userProfiles.id, profileId));

    // Award "Pathway Pioneer" badge if not already earned
    const pathwayBadge = await db
      .select()
      .from(badges)
      .where(eq(badges.name, "Pathway Pioneer"))
      .limit(1);

    if (pathwayBadge.length > 0) {
      const alreadyEarned = await db
        .select()
        .from(userBadges)
        .where(
          and(
            eq(userBadges.userId, profileId),
            eq(userBadges.badgeId, pathwayBadge[0].id)
          )
        )
        .limit(1);

      if (alreadyEarned.length === 0) {
        await db.insert(userBadges).values({
          userId: profileId,
          badgeId: pathwayBadge[0].id,
        });
      }
    }

    // Also check and award "Module Master" badge for first completion
    const moduleBadge = await db
      .select()
      .from(badges)
      .where(eq(badges.name, "Module Master"))
      .limit(1);

    if (moduleBadge.length > 0) {
      const alreadyHas = await db
        .select()
        .from(userBadges)
        .where(
          and(
            eq(userBadges.userId, profileId),
            eq(userBadges.badgeId, moduleBadge[0].id)
          )
        )
        .limit(1);

      if (alreadyHas.length === 0) {
        await db.insert(userBadges).values({
          userId: profileId,
          badgeId: moduleBadge[0].id,
        });
      }
    }

    // Update the related user skill to "completed"
    const pathway = await db
      .select()
      .from(learningPathways)
      .where(eq(learningPathways.id, pathwayId))
      .limit(1);

    if (pathway.length > 0 && pathway[0].skillId) {
      await db
        .update(userSkills)
        .set({
          status: "completed",
          completedAt: new Date(),
        })
        .where(
          and(
            eq(userSkills.userId, profileId),
            eq(userSkills.skillId, pathway[0].skillId)
          )
        );
    }
  }
}

// ============================================
// Initialize progress for all modules in a pathway
// ============================================
export async function enrollInPathway(pathwayId: string) {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "Unauthorized" };

  try {
    // Get all modules
    const modules = await db
      .select()
      .from(learningModules)
      .where(eq(learningModules.pathwayId, pathwayId))
      .orderBy(asc(learningModules.orderIndex));

    if (modules.length === 0) {
      return { success: false, error: "No modules in this pathway" };
    }

    // Check existing progress
    const existing = await db
      .select()
      .from(userModuleProgress)
      .where(
        and(
          eq(userModuleProgress.userId, profile.id),
          eq(userModuleProgress.pathwayId, pathwayId)
        )
      );

    const existingModuleIds = new Set(existing.map((e) => e.moduleId));

    // Create progress entries for modules without progress
    const newEntries = modules
      .filter((m) => !existingModuleIds.has(m.id))
      .map((m, index) => ({
        userId: profile.id,
        moduleId: m.id,
        pathwayId,
        status: index === 0 ? ("in_progress" as const) : ("not_started" as const),
        startedAt: index === 0 ? new Date() : null,
      }));

    if (newEntries.length > 0) {
      await db.insert(userModuleProgress).values(newEntries);
    }

    // Also update/create user skill
    const pathway = await db
      .select()
      .from(learningPathways)
      .where(eq(learningPathways.id, pathwayId))
      .limit(1);

    if (pathway.length > 0 && pathway[0].skillId) {
      const existingSkill = await db
        .select()
        .from(userSkills)
        .where(
          and(
            eq(userSkills.userId, profile.id),
            eq(userSkills.skillId, pathway[0].skillId)
          )
        )
        .limit(1);

      if (existingSkill.length === 0) {
        await db.insert(userSkills).values({
          userId: profile.id,
          skillId: pathway[0].skillId,
          status: "learning",
          startedAt: new Date(),
        });
      } else if (existingSkill[0].status === "interested") {
        await db
          .update(userSkills)
          .set({ status: "learning", startedAt: new Date() })
          .where(eq(userSkills.id, existingSkill[0].id));
      }
    }

    revalidatePath(`/dashboard/learn/${pathwayId}`);
    revalidatePath("/dashboard/learn");
    revalidatePath("/dashboard");
    return { success: true, firstModuleId: modules[0].id };
  } catch (error) {
    console.error("Enroll error:", error);
    return { success: false, error: "Failed to enroll" };
  }
}