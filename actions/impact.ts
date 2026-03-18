// src/actions/impact.ts
"use server";

import { db } from "@/config/db";
import {
  userProfiles,
  impactLogs,
  userBadges,
  badges,
} from "@/config/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and, desc, sql, gte, lte, count, sum } from "drizzle-orm";
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
// Get user's impact summary
// ============================================
export async function getImpactSummary() {
  const profile = await getCurrentProfile();
  if (!profile) return null;

  // Aggregate by category
  const categoryTotals = await db
    .select({
      category: impactLogs.category,
      totalQuantity: sql<number>`COALESCE(SUM(${impactLogs.quantity}), 0)`,
      logCount: count(),
    })
    .from(impactLogs)
    .where(eq(impactLogs.userId, profile.id))
    .groupBy(impactLogs.category);

  // Recent logs
  const recentLogs = await db
    .select()
    .from(impactLogs)
    .where(eq(impactLogs.userId, profile.id))
    .orderBy(desc(impactLogs.dateLogged))
    .limit(20);

  // Monthly data for charts (last 6 months)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const monthlyData = await db
    .select({
      month: sql<string>`TO_CHAR(${impactLogs.dateLogged}, 'YYYY-MM')`,
      category: impactLogs.category,
      totalQuantity: sql<number>`COALESCE(SUM(${impactLogs.quantity}), 0)`,
      logCount: count(),
    })
    .from(impactLogs)
    .where(
      and(
        eq(impactLogs.userId, profile.id),
        gte(impactLogs.dateLogged, sixMonthsAgo)
      )
    )
    .groupBy(
      sql`TO_CHAR(${impactLogs.dateLogged}, 'YYYY-MM')`,
      impactLogs.category
    )
    .orderBy(sql`TO_CHAR(${impactLogs.dateLogged}, 'YYYY-MM')`);

  // Weekly trend (last 4 weeks)
  const fourWeeksAgo = new Date();
  fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);

  const weeklyData = await db
    .select({
      week: sql<string>`TO_CHAR(${impactLogs.dateLogged}, 'IYYY-IW')`,
      category: impactLogs.category,
      totalQuantity: sql<number>`COALESCE(SUM(${impactLogs.quantity}), 0)`,
    })
    .from(impactLogs)
    .where(
      and(
        eq(impactLogs.userId, profile.id),
        gte(impactLogs.dateLogged, fourWeeksAgo)
      )
    )
    .groupBy(
      sql`TO_CHAR(${impactLogs.dateLogged}, 'IYYY-IW')`,
      impactLogs.category
    )
    .orderBy(sql`TO_CHAR(${impactLogs.dateLogged}, 'IYYY-IW')`);

  // Total all-time stats
  const [totalStats] = await db
    .select({
      totalLogs: count(),
      totalQuantity: sql<number>`COALESCE(SUM(${impactLogs.quantity}), 0)`,
    })
    .from(impactLogs)
    .where(eq(impactLogs.userId, profile.id));

  // User badges
  const earnedBadges = await db
    .select({
      badge: badges,
      earnedAt: userBadges.earnedAt,
    })
    .from(userBadges)
    .innerJoin(badges, eq(userBadges.badgeId, badges.id))
    .where(eq(userBadges.userId, profile.id))
    .orderBy(desc(userBadges.earnedAt));

  return {
    profile,
    categoryTotals,
    recentLogs,
    monthlyData,
    weeklyData,
    totalStats: totalStats || { totalLogs: 0, totalQuantity: 0 },
    earnedBadges,
  };
}

// ============================================
// Get community impact (all users)
// ============================================
export async function getCommunityImpact() {
  const profile = await getCurrentProfile();
  if (!profile) return null;

  // Total community impact by category
  const communityTotals = await db
    .select({
      category: impactLogs.category,
      totalQuantity: sql<number>`COALESCE(SUM(${impactLogs.quantity}), 0)`,
      uniqueUsers: sql<number>`COUNT(DISTINCT ${impactLogs.userId})`,
      logCount: count(),
    })
    .from(impactLogs)
    .groupBy(impactLogs.category);

  // Regional impact (same region as user)
  let regionalTotals: typeof communityTotals = [];
  if (profile.region) {
    regionalTotals = await db
      .select({
        category: impactLogs.category,
        totalQuantity: sql<number>`COALESCE(SUM(${impactLogs.quantity}), 0)`,
        uniqueUsers: sql<number>`COUNT(DISTINCT ${impactLogs.userId})`,
        logCount: count(),
      })
      .from(impactLogs)
      .innerJoin(userProfiles, eq(impactLogs.userId, userProfiles.id))
      .where(eq(userProfiles.region, profile.region))
      .groupBy(impactLogs.category);
  }

  // Top contributors this month
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const topContributors = await db
    .select({
      userId: impactLogs.userId,
      fullName: userProfiles.fullName,
      region: userProfiles.region,
      totalLogs: count(),
      totalQuantity: sql<number>`COALESCE(SUM(${impactLogs.quantity}), 0)`,
    })
    .from(impactLogs)
    .innerJoin(userProfiles, eq(impactLogs.userId, userProfiles.id))
    .where(gte(impactLogs.dateLogged, startOfMonth))
    .groupBy(impactLogs.userId, userProfiles.fullName, userProfiles.region)
    .orderBy(desc(sql`COUNT(*)`))
    .limit(10);

  // Total platform users who've logged impact
  const [totalUsers] = await db
    .select({
      count: sql<number>`COUNT(DISTINCT ${impactLogs.userId})`,
    })
    .from(impactLogs);

  return {
    communityTotals,
    regionalTotals,
    topContributors,
    totalActiveUsers: totalUsers?.count || 0,
    userRegion: profile.region,
  };
}

// ============================================
// Log a new impact activity
// ============================================
export async function logImpactActivity(data: {
  category: string;
  activityDescription: string;
  quantity: number;
  unit: string;
  dateLogged?: Date;
}) {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "Unauthorized" };

  if (!data.activityDescription.trim()) {
    return { success: false, error: "Activity description is required" };
  }

  if (data.quantity <= 0) {
    return { success: false, error: "Quantity must be greater than 0" };
  }

  try {
    await db.insert(impactLogs).values({
      userId: profile.id,
      category: data.category,
      activityDescription: data.activityDescription.trim(),
      quantity: data.quantity,
      unit: data.unit,
      dateLogged: data.dateLogged || new Date(),
    });

    // Award points for logging impact
    await db
      .update(userProfiles)
      .set({
        totalPoints: profile.totalPoints + 10,
        updatedAt: new Date(),
      })
      .where(eq(userProfiles.id, profile.id));

    // Check for badge milestones
    await checkImpactBadges(profile.id);

    revalidatePath("/dashboard/impact");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Log impact error:", error);
    return { success: false, error: "Failed to log activity" };
  }
}

// ============================================
// Delete an impact log
// ============================================
export async function deleteImpactLog(logId: string) {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "Unauthorized" };

  try {
    await db
      .delete(impactLogs)
      .where(
        and(
          eq(impactLogs.id, logId),
          eq(impactLogs.userId, profile.id)
        )
      );

    revalidatePath("/dashboard/impact");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Delete impact log error:", error);
    return { success: false, error: "Failed to delete" };
  }
}

// ============================================
// Check and award impact-related badges
// ============================================
async function checkImpactBadges(profileId: string) {
  // "Impact Starter" — first log ever
  const [totalLogs] = await db
    .select({ count: count() })
    .from(impactLogs)
    .where(eq(impactLogs.userId, profileId));

  if (totalLogs.count === 1) {
    await awardBadge(profileId, "Impact Starter");
  }

  // "Waste Warrior" — 100kg waste reduced
  const [wasteTotal] = await db
    .select({
      total: sql<number>`COALESCE(SUM(${impactLogs.quantity}), 0)`,
    })
    .from(impactLogs)
    .where(
      and(
        eq(impactLogs.userId, profileId),
        eq(impactLogs.category, "waste")
      )
    );

  if (Number(wasteTotal.total) >= 100) {
    await awardBadge(profileId, "Waste Warrior");
  }

  // "Tree Planter" — 50 trees/seedlings
  const [treeTotal] = await db
    .select({
      total: sql<number>`COALESCE(SUM(${impactLogs.quantity}), 0)`,
    })
    .from(impactLogs)
    .where(
      and(
        eq(impactLogs.userId, profileId),
        eq(impactLogs.category, "agriculture")
      )
    );

  if (Number(treeTotal.total) >= 50) {
    await awardBadge(profileId, "Tree Planter");
  }
}

async function awardBadge(profileId: string, badgeName: string) {
  const badge = await db
    .select()
    .from(badges)
    .where(eq(badges.name, badgeName))
    .limit(1);

  if (badge.length === 0) return;

  const alreadyHas = await db
    .select()
    .from(userBadges)
    .where(
      and(
        eq(userBadges.userId, profileId),
        eq(userBadges.badgeId, badge[0].id)
      )
    )
    .limit(1);

  if (alreadyHas.length === 0) {
    await db.insert(userBadges).values({
      userId: profileId,
      badgeId: badge[0].id,
    });

    // Award badge points
    await db
      .update(userProfiles)
      .set({
        totalPoints: sql`${userProfiles.totalPoints} + ${badge[0].pointsAwarded}`,
        updatedAt: new Date(),
      })
      .where(eq(userProfiles.id, profileId));
  }
}

// ============================================
// Get impact data for sharing
// ============================================
export async function getShareableImpact() {
  const profile = await getCurrentProfile();
  if (!profile) return null;

  const categoryTotals = await db
    .select({
      category: impactLogs.category,
      totalQuantity: sql<number>`COALESCE(SUM(${impactLogs.quantity}), 0)`,
      unit: impactLogs.unit,
    })
    .from(impactLogs)
    .where(eq(impactLogs.userId, profile.id))
    .groupBy(impactLogs.category, impactLogs.unit);

  return {
    name: profile.fullName,
    region: profile.region,
    totalPoints: profile.totalPoints,
    categories: categoryTotals,
  };
}