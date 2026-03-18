// src/actions/profile-page.ts
"use server";

import { db } from "@/config/db";
import {
  userProfiles,
  userSkills,
  greenSkills,
  userModuleProgress,
  learningPathways,
  businessPlans,
  impactLogs,
  userBadges,
  badges,
  aiConversations,
} from "@/config/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq, and, count, sql, desc } from "drizzle-orm";
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
// Get full profile data for profile page
// ============================================
export async function getFullProfileData() {
  const profile = await getCurrentProfile();
  if (!profile) return null;

  // Skills summary
  const skillsData = await db
    .select({
      status: userSkills.status,
      count: count(),
    })
    .from(userSkills)
    .where(eq(userSkills.userId, profile.id))
    .groupBy(userSkills.status);

  const skillsSummary = {
    interested: 0,
    learning: 0,
    completed: 0,
  };
  skillsData.forEach((s) => {
    skillsSummary[s.status as keyof typeof skillsSummary] = Number(s.count);
  });

  // Saved skills with details
  const savedSkills = await db
    .select({
      userSkill: userSkills,
      skill: greenSkills,
    })
    .from(userSkills)
    .innerJoin(greenSkills, eq(userSkills.skillId, greenSkills.id))
    .where(eq(userSkills.userId, profile.id))
    .orderBy(desc(userSkills.createdAt))
    .limit(5);

  // Learning progress
  const [totalModules] = await db
    .select({ count: count() })
    .from(userModuleProgress)
    .where(eq(userModuleProgress.userId, profile.id));

  const [completedModules] = await db
    .select({ count: count() })
    .from(userModuleProgress)
    .where(
      and(
        eq(userModuleProgress.userId, profile.id),
        eq(userModuleProgress.status, "completed")
      )
    );

  // Pathways enrolled
  const pathwaysEnrolled = await db
    .select({
      pathwayId: userModuleProgress.pathwayId,
    })
    .from(userModuleProgress)
    .where(eq(userModuleProgress.userId, profile.id))
    .groupBy(userModuleProgress.pathwayId);

  // Business plans
  const [plansCount] = await db
    .select({ count: count() })
    .from(businessPlans)
    .where(eq(businessPlans.userId, profile.id));

  const [completedPlans] = await db
    .select({ count: count() })
    .from(businessPlans)
    .where(
      and(
        eq(businessPlans.userId, profile.id),
        eq(businessPlans.status, "completed")
      )
    );

  // Impact summary
  const impactSummary = await db
    .select({
      category: impactLogs.category,
      totalQuantity: sql<number>`COALESCE(SUM(${impactLogs.quantity}), 0)`,
      logCount: count(),
    })
    .from(impactLogs)
    .where(eq(impactLogs.userId, profile.id))
    .groupBy(impactLogs.category);

  const [totalImpactLogs] = await db
    .select({ count: count() })
    .from(impactLogs)
    .where(eq(impactLogs.userId, profile.id));

  // Badges
  const earnedBadges = await db
    .select({
      badge: badges,
      earnedAt: userBadges.earnedAt,
    })
    .from(userBadges)
    .innerJoin(badges, eq(userBadges.badgeId, badges.id))
    .where(eq(userBadges.userId, profile.id))
    .orderBy(desc(userBadges.earnedAt));

  // Account age
  const accountAge = Math.floor(
    (Date.now() - new Date(profile.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  // Streak — consecutive days with at least one impact log in last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const recentDates = await db
    .select({
      day: sql<string>`TO_CHAR(${impactLogs.dateLogged}, 'YYYY-MM-DD')`,
    })
    .from(impactLogs)
    .where(
      and(
        eq(impactLogs.userId, profile.id),
        sql`${impactLogs.dateLogged} >= ${thirtyDaysAgo}`
      )
    )
    .groupBy(sql`TO_CHAR(${impactLogs.dateLogged}, 'YYYY-MM-DD')`)
    .orderBy(desc(sql`TO_CHAR(${impactLogs.dateLogged}, 'YYYY-MM-DD')`));

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 30; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(checkDate.getDate() - i);
    const dateStr = checkDate.toISOString().split("T")[0];

    if (recentDates.some((d) => d.day === dateStr)) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }

  return {
    profile,
    skillsSummary,
    savedSkills,
    learning: {
      totalModules: totalModules?.count || 0,
      completedModules: completedModules?.count || 0,
      pathwaysEnrolled: pathwaysEnrolled.length,
    },
    business: {
      totalPlans: plansCount?.count || 0,
      completedPlans: completedPlans?.count || 0,
    },
    impact: {
      totalLogs: totalImpactLogs?.count || 0,
      categories: impactSummary,
    },
    earnedBadges,
    accountAge,
    streak,
  };
}

// ============================================
// Update profile information
// ============================================
export async function updateProfileInfo(data: {
  fullName?: string;
  phone?: string;
  preferredLanguage?: string;
  region?: string;
  city?: string;
  currentSituation?: string;
  interests?: string[];
  availableResources?: string[];
}) {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "Unauthorized" };

  try {
    await db
      .update(userProfiles)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(userProfiles.id, profile.id));

    revalidatePath("/dashboard/profile");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Update profile error:", error);
    return { success: false, error: "Failed to update profile" };
  }
}

// ============================================
// Get profile completion percentage
// ============================================
export async function getProfileCompletion() {
  const profile = await getCurrentProfile();
  if (!profile) return 0;

  const fields = [
    profile.fullName,
    profile.email,
    profile.phone,
    profile.region,
    profile.city,
    profile.currentSituation,
    profile.preferredLanguage,
    (profile.interests as string[])?.length > 0,
    (profile.availableResources as string[])?.length > 0,
  ];

  const filled = fields.filter(Boolean).length;
  return Math.round((filled / fields.length) * 100);
}

// ============================================
// Delete all user data (for account deletion)
// ============================================
export async function deleteAllUserData() {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "Profile not found" };

  try {
    // Delete in order (respecting foreign keys)
    await db.delete(aiConversations).where(eq(aiConversations.userId, profile.id));
    await db.delete(userBadges).where(eq(userBadges.userId, profile.id));
    await db.delete(impactLogs).where(eq(impactLogs.userId, profile.id));
    await db.delete(businessPlans).where(eq(businessPlans.userId, profile.id));
    await db.delete(userModuleProgress).where(eq(userModuleProgress.userId, profile.id));
    await db.delete(userSkills).where(eq(userSkills.userId, profile.id));
    await db.delete(userProfiles).where(eq(userProfiles.id, profile.id));

    return { success: true };
  } catch (error) {
    console.error("Delete user data error:", error);
    return { success: false, error: "Failed to delete account data" };
  }
}

// ============================================
// Export user data (GDPR-style)
// ============================================
export async function exportUserData() {
  const profile = await getCurrentProfile();
  if (!profile) return null;

  const skills = await db
    .select({ skill: greenSkills, userSkill: userSkills })
    .from(userSkills)
    .innerJoin(greenSkills, eq(userSkills.skillId, greenSkills.id))
    .where(eq(userSkills.userId, profile.id));

  const plans = await db
    .select()
    .from(businessPlans)
    .where(eq(businessPlans.userId, profile.id));

  const impacts = await db
    .select()
    .from(impactLogs)
    .where(eq(impactLogs.userId, profile.id));

  const badgesEarned = await db
    .select({ badge: badges, earnedAt: userBadges.earnedAt })
    .from(userBadges)
    .innerJoin(badges, eq(userBadges.badgeId, badges.id))
    .where(eq(userBadges.userId, profile.id));

  return {
    profile: {
      fullName: profile.fullName,
      email: profile.email,
      phone: profile.phone,
      region: profile.region,
      city: profile.city,
      currentSituation: profile.currentSituation,
      preferredLanguage: profile.preferredLanguage,
      interests: profile.interests,
      availableResources: profile.availableResources,
      totalPoints: profile.totalPoints,
      createdAt: profile.createdAt,
    },
    skills: skills.map((s) => ({
      name: s.skill.name,
      category: s.skill.category,
      status: s.userSkill.status,
      startedAt: s.userSkill.startedAt,
      completedAt: s.userSkill.completedAt,
    })),
    businessPlans: plans.map((p) => ({
      title: p.title,
      status: p.status,
      problemStatement: p.problemStatement,
      solution: p.solution,
      targetCustomers: p.targetCustomers,
      revenueModel: p.revenueModel,
      startupCost: p.startupCostEstimate,
      monthlyRevenue: p.monthlyRevenueEstimate,
      createdAt: p.createdAt,
    })),
    impactLogs: impacts.map((i) => ({
      category: i.category,
      description: i.activityDescription,
      quantity: i.quantity,
      unit: i.unit,
      dateLogged: i.dateLogged,
    })),
    badges: badgesEarned.map((b) => ({
      name: b.badge.name,
      description: b.badge.description,
      earnedAt: b.earnedAt,
    })),
    exportedAt: new Date().toISOString(),
  };
}