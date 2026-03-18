// src/actions/business.ts
"use server";

import { db } from "@/config/db";
import {
  userProfiles,
  businessPlans,
  greenSkills,
  userSkills,
  userBadges,
  badges,
} from "@/config/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and, desc, count, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// ============================================
// Helper
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
// Get all user's business plans
// ============================================
export async function getUserBusinessPlans() {
  const profile = await getCurrentProfile();
  if (!profile) return [];

  const plans = await db
    .select({
      plan: businessPlans,
      skill: greenSkills,
    })
    .from(businessPlans)
    .leftJoin(greenSkills, eq(businessPlans.skillId, greenSkills.id))
    .where(eq(businessPlans.userId, profile.id))
    .orderBy(desc(businessPlans.updatedAt));

  return plans;
}

// ============================================
// Get single business plan
// ============================================
export async function getBusinessPlan(planId: string) {
  const profile = await getCurrentProfile();
  if (!profile) return null;

  const plans = await db
    .select({
      plan: businessPlans,
      skill: greenSkills,
    })
    .from(businessPlans)
    .leftJoin(greenSkills, eq(businessPlans.skillId, greenSkills.id))
    .where(
      and(
        eq(businessPlans.id, planId),
        eq(businessPlans.userId, profile.id)
      )
    )
    .limit(1);

  return plans[0] || null;
}

// ============================================
// Create a new business plan
// ============================================
export async function createBusinessPlan(data: {
  title: string;
  skillId?: string;
}) {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "Unauthorized" };

  try {
    const [plan] = await db
      .insert(businessPlans)
      .values({
        userId: profile.id,
        title: data.title,
        skillId: data.skillId || null,
        status: "draft",
      })
      .returning();

    // Award "Business Thinker" badge on first plan
    const [planCount] = await db
      .select({ count: count() })
      .from(businessPlans)
      .where(eq(businessPlans.userId, profile.id));

    if (planCount.count === 1) {
      const badge = await db
        .select()
        .from(badges)
        .where(eq(badges.name, "Business Thinker"))
        .limit(1);

      if (badge.length > 0) {
        const alreadyHas = await db
          .select()
          .from(userBadges)
          .where(
            and(
              eq(userBadges.userId, profile.id),
              eq(userBadges.badgeId, badge[0].id)
            )
          )
          .limit(1);

        if (alreadyHas.length === 0) {
          await db.insert(userBadges).values({
            userId: profile.id,
            badgeId: badge[0].id,
          });

          await db
            .update(userProfiles)
            .set({
              totalPoints: profile.totalPoints + 50,
              updatedAt: new Date(),
            })
            .where(eq(userProfiles.id, profile.id));
        }
      }
    }

    revalidatePath("/dashboard/business");
    revalidatePath("/dashboard");
    return { success: true, planId: plan.id };
  } catch (error) {
    console.error("Create plan error:", error);
    return { success: false, error: "Failed to create plan" };
  }
}

// ============================================
// Update business plan fields
// ============================================
export async function updateBusinessPlan(
  planId: string,
  data: {
    title?: string;
    problemStatement?: string;
    solution?: string;
    targetCustomers?: string;
    revenueModel?: string;
    startupCostEstimate?: number;
    monthlyRevenueEstimate?: number;
    keyActivities?: string[];
    resourcesNeeded?: string[];
    challenges?: string[];
    aiSuggestions?: Record<string, unknown>;
    status?: "draft" | "in_progress" | "completed";
  }
) {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "Unauthorized" };

  try {
    await db
      .update(businessPlans)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(businessPlans.id, planId),
          eq(businessPlans.userId, profile.id)
        )
      );

    revalidatePath(`/dashboard/business/${planId}`);
    revalidatePath("/dashboard/business");
    return { success: true };
  } catch (error) {
    console.error("Update plan error:", error);
    return { success: false, error: "Failed to update plan" };
  }
}

// ============================================
// Delete a business plan
// ============================================
export async function deleteBusinessPlan(planId: string) {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "Unauthorized" };

  try {
    await db
      .delete(businessPlans)
      .where(
        and(
          eq(businessPlans.id, planId),
          eq(businessPlans.userId, profile.id)
        )
      );

    revalidatePath("/dashboard/business");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Delete plan error:", error);
    return { success: false, error: "Failed to delete plan" };
  }
}

// ============================================
// Get user's completed skills (for plan creation)
// ============================================
export async function getUserSkillsForPlanning() {
  const profile = await getCurrentProfile();
  if (!profile) return [];

  const skills = await db
    .select({
      userSkill: userSkills,
      skill: greenSkills,
    })
    .from(userSkills)
    .innerJoin(greenSkills, eq(userSkills.skillId, greenSkills.id))
    .where(eq(userSkills.userId, profile.id));

  return skills;
}

// ============================================
// Get user profile for AI context
// ============================================
export async function getProfileForAI() {
  const profile = await getCurrentProfile();
  if (!profile) return null;

  return {
    fullName: profile.fullName,
    region: profile.region,
    city: profile.city,
    currentSituation: profile.currentSituation,
    interests: profile.interests as string[],
    availableResources: profile.availableResources as string[],
  };
}