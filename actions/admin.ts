// src/actions/admin.ts
"use server";

import { db } from "@/config/db";
import {
  userProfiles,
  greenSkills,
  userSkills,
  learningPathways,
  learningModules,
  userModuleProgress,
  businessPlans,
  impactLogs,
  userBadges,
  badges,
  adminLogs,
} from "@/config/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq, and, desc, asc, count, sql, gte, lte, like, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { isAdminId, isAdminEmail } from "@/lib/admin";

// ============================================
// Admin Auth Check
// ============================================
async function requireAdmin() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const email = user.emailAddresses[0]?.emailAddress || "";
  const isAdmin = isAdminId(userId) || isAdminEmail(email);

  if (!isAdmin) throw new Error("Forbidden: Admin access required");

  return { userId, email };
}

// ============================================
// Log admin action
// ============================================
async function logAdminAction(
  adminClerkId: string,
  action: string,
  entity: string,
  entityId?: string,
  details?: Record<string, unknown>
) {
  await db.insert(adminLogs).values({
    adminClerkId,
    action,
    entity,
    entityId,
    details: details || {},
  });
}

// ============================================
// DASHBOARD OVERVIEW
// ============================================
export async function getAdminDashboardData() {
  await requireAdmin();

  // Total users
  const [totalUsers] = await db
    .select({ count: count() })
    .from(userProfiles);

  // Users this month
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [newUsersThisMonth] = await db
    .select({ count: count() })
    .from(userProfiles)
    .where(gte(userProfiles.createdAt, startOfMonth));

  // Users this week
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - 7);

  const [newUsersThisWeek] = await db
    .select({ count: count() })
    .from(userProfiles)
    .where(gte(userProfiles.createdAt, startOfWeek));

  // Total skills
  const [totalSkills] = await db
    .select({ count: count() })
    .from(greenSkills);

  // Total saved skills
  const [totalSavedSkills] = await db
    .select({ count: count() })
    .from(userSkills);

  // Skills by status
  const skillsByStatus = await db
    .select({
      status: userSkills.status,
      count: count(),
    })
    .from(userSkills)
    .groupBy(userSkills.status);

  // Learning stats
  const [totalPathways] = await db
    .select({ count: count() })
    .from(learningPathways);

  const [publishedPathways] = await db
    .select({ count: count() })
    .from(learningPathways)
    .where(eq(learningPathways.isPublished, true));

  const [totalModules] = await db
    .select({ count: count() })
    .from(learningModules);

  const [completedModuleProgress] = await db
    .select({ count: count() })
    .from(userModuleProgress)
    .where(eq(userModuleProgress.status, "completed"));

  // Business plans
  const [totalPlans] = await db
    .select({ count: count() })
    .from(businessPlans);

  const plansByStatus = await db
    .select({
      status: businessPlans.status,
      count: count(),
    })
    .from(businessPlans)
    .groupBy(businessPlans.status);

  // Impact
  const [totalImpactLogs] = await db
    .select({ count: count() })
    .from(impactLogs);

  const impactByCategory = await db
    .select({
      category: impactLogs.category,
      totalQuantity: sql<number>`COALESCE(SUM(${impactLogs.quantity}), 0)`,
      logCount: count(),
      uniqueUsers: sql<number>`COUNT(DISTINCT ${impactLogs.userId})`,
    })
    .from(impactLogs)
    .groupBy(impactLogs.category);

  // Badges awarded
  const [totalBadgesAwarded] = await db
    .select({ count: count() })
    .from(userBadges);

  // User growth (last 6 months)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const userGrowth = await db
    .select({
      month: sql<string>`TO_CHAR(${userProfiles.createdAt}, 'YYYY-MM')`,
      count: count(),
    })
    .from(userProfiles)
    .where(gte(userProfiles.createdAt, sixMonthsAgo))
    .groupBy(sql`TO_CHAR(${userProfiles.createdAt}, 'YYYY-MM')`)
    .orderBy(sql`TO_CHAR(${userProfiles.createdAt}, 'YYYY-MM')`);

  // Impact growth (last 6 months)
  const impactGrowth = await db
    .select({
      month: sql<string>`TO_CHAR(${impactLogs.dateLogged}, 'YYYY-MM')`,
      count: count(),
      totalQuantity: sql<number>`COALESCE(SUM(${impactLogs.quantity}), 0)`,
    })
    .from(impactLogs)
    .where(gte(impactLogs.dateLogged, sixMonthsAgo))
    .groupBy(sql`TO_CHAR(${impactLogs.dateLogged}, 'YYYY-MM')`)
    .orderBy(sql`TO_CHAR(${impactLogs.dateLogged}, 'YYYY-MM')`);

  // Users by region
  const usersByRegion = await db
    .select({
      region: userProfiles.region,
      count: count(),
    })
    .from(userProfiles)
    .where(sql`${userProfiles.region} IS NOT NULL`)
    .groupBy(userProfiles.region)
    .orderBy(desc(count()));

  // Top skills (most saved)
  const topSkills = await db
    .select({
      skillName: greenSkills.name,
      category: greenSkills.category,
      saveCount: count(),
    })
    .from(userSkills)
    .innerJoin(greenSkills, eq(userSkills.skillId, greenSkills.id))
    .groupBy(greenSkills.name, greenSkills.category)
    .orderBy(desc(count()))
    .limit(5);

  // Recent activity
  const recentUsers = await db
    .select({
      id: userProfiles.id,
      fullName: userProfiles.fullName,
      email: userProfiles.email,
      region: userProfiles.region,
      createdAt: userProfiles.createdAt,
    })
    .from(userProfiles)
    .orderBy(desc(userProfiles.createdAt))
    .limit(5);

  return {
    users: {
      total: totalUsers?.count || 0,
      thisMonth: newUsersThisMonth?.count || 0,
      thisWeek: newUsersThisWeek?.count || 0,
      byRegion: usersByRegion,
      growth: userGrowth,
      recent: recentUsers,
    },
    skills: {
      totalCatalog: totalSkills?.count || 0,
      totalSaved: totalSavedSkills?.count || 0,
      byStatus: skillsByStatus,
      topSkills,
    },
    learning: {
      totalPathways: totalPathways?.count || 0,
      publishedPathways: publishedPathways?.count || 0,
      totalModules: totalModules?.count || 0,
      completedModules: completedModuleProgress?.count || 0,
    },
    business: {
      totalPlans: totalPlans?.count || 0,
      byStatus: plansByStatus,
    },
    impact: {
      totalLogs: totalImpactLogs?.count || 0,
      byCategory: impactByCategory,
      growth: impactGrowth,
    },
    badges: {
      totalAwarded: totalBadgesAwarded?.count || 0,
    },
  };
}

// ============================================
// USER MANAGEMENT
// ============================================
export async function getAdminUsers(
  page: number = 1,
  search: string = "",
  region: string = "",
  limit: number = 20
) {
  await requireAdmin();

  const offset = (page - 1) * limit;

  let whereConditions = [];
  if (search) {
    whereConditions.push(
      or(
        like(userProfiles.fullName, `%${search}%`),
        like(userProfiles.email, `%${search}%`),
        like(userProfiles.city, `%${search}%`)
      )
    );
  }
  if (region) {
    whereConditions.push(eq(userProfiles.region, region));
  }

  const whereClause =
    whereConditions.length > 0
      ? and(...whereConditions)
      : undefined;

  const users = await db
    .select()
    .from(userProfiles)
    .where(whereClause)
    .orderBy(desc(userProfiles.createdAt))
    .limit(limit)
    .offset(offset);

  const [totalResult] = await db
    .select({ count: count() })
    .from(userProfiles)
    .where(whereClause);

  // Get stats for each user
  const usersWithStats = await Promise.all(
    users.map(async (user) => {
      const [skillCount] = await db
        .select({ count: count() })
        .from(userSkills)
        .where(eq(userSkills.userId, user.id));

      const [moduleCount] = await db
        .select({ count: count() })
        .from(userModuleProgress)
        .where(
          and(
            eq(userModuleProgress.userId, user.id),
            eq(userModuleProgress.status, "completed")
          )
        );

      const [planCount] = await db
        .select({ count: count() })
        .from(businessPlans)
        .where(eq(businessPlans.userId, user.id));

      const [impactCount] = await db
        .select({ count: count() })
        .from(impactLogs)
        .where(eq(impactLogs.userId, user.id));

      const [badgeCount] = await db
        .select({ count: count() })
        .from(userBadges)
        .where(eq(userBadges.userId, user.id));

      return {
        ...user,
        stats: {
          skills: skillCount?.count || 0,
          modules: moduleCount?.count || 0,
          plans: planCount?.count || 0,
          impacts: impactCount?.count || 0,
          badges: badgeCount?.count || 0,
        },
      };
    })
  );

  return {
    users: usersWithStats,
    total: totalResult?.count || 0,
    page,
    totalPages: Math.ceil((totalResult?.count || 0) / limit),
  };
}

// ============================================
// SKILL MANAGEMENT
// ============================================
export async function getAdminSkills() {
  await requireAdmin();

  const skills = await db
    .select()
    .from(greenSkills)
    .orderBy(asc(greenSkills.category), asc(greenSkills.name));

  // Get save count for each skill
  const skillsWithStats = await Promise.all(
    skills.map(async (skill) => {
      const [saveCount] = await db
        .select({ count: count() })
        .from(userSkills)
        .where(eq(userSkills.skillId, skill.id));

      const [pathwayCount] = await db
        .select({ count: count() })
        .from(learningPathways)
        .where(eq(learningPathways.skillId, skill.id));

      return {
        ...skill,
        saveCount: saveCount?.count || 0,
        pathwayCount: pathwayCount?.count || 0,
      };
    })
  );

  return skillsWithStats;
}

export async function createAdminSkill(data: {
  name: string;
  category: string;
  description: string;
  shortDescription: string;
  difficulty: string;
  estimatedDuration: string;
  requiredResources: string[];
  applicableRegions: string[];
  marketPotential: string;
  climateBenefit: string;
  icon: string;
}) {
  const { userId } = await requireAdmin();

  try {
    const [skill] = await db
      .insert(greenSkills)
      .values({
        ...data,
        isActive: true,
      })
      .returning();

    await logAdminAction(userId, "create", "skill", skill.id, {
      name: data.name,
    });

    revalidatePath("/admin/skills");
    revalidatePath("/dashboard/skills");
    return { success: true, skill };
  } catch (error) {
    console.error("Create skill error:", error);
    return { success: false, error: "Failed to create skill" };
  }
}

export async function updateAdminSkill(
  skillId: string,
  data: Partial<{
    name: string;
    category: string;
    description: string;
    shortDescription: string;
    difficulty: string;
    estimatedDuration: string;
    requiredResources: string[];
    applicableRegions: string[];
    marketPotential: string;
    climateBenefit: string;
    icon: string;
    isActive: boolean;
  }>
) {
  const { userId } = await requireAdmin();

  try {
    await db
      .update(greenSkills)
      .set(data)
      .where(eq(greenSkills.id, skillId));

    await logAdminAction(userId, "update", "skill", skillId, data);

    revalidatePath("/admin/skills");
    revalidatePath("/dashboard/skills");
    return { success: true };
  } catch (error) {
    console.error("Update skill error:", error);
    return { success: false, error: "Failed to update skill" };
  }
}

export async function deleteAdminSkill(skillId: string) {
  const { userId } = await requireAdmin();

  try {
    await db.delete(greenSkills).where(eq(greenSkills.id, skillId));

    await logAdminAction(userId, "delete", "skill", skillId);

    revalidatePath("/admin/skills");
    revalidatePath("/dashboard/skills");
    return { success: true };
  } catch (error) {
    console.error("Delete skill error:", error);
    return { success: false, error: "Failed to delete skill. It may have dependent records." };
  }
}

// ============================================
// PATHWAY MANAGEMENT
// ============================================
export async function getAdminPathways() {
  await requireAdmin();

  const pathways = await db
    .select({
      pathway: learningPathways,
      skill: greenSkills,
    })
    .from(learningPathways)
    .innerJoin(greenSkills, eq(learningPathways.skillId, greenSkills.id))
    .orderBy(desc(learningPathways.createdAt));

  const pathwaysWithStats = await Promise.all(
    pathways.map(async (p) => {
      const [moduleCount] = await db
        .select({ count: count() })
        .from(learningModules)
        .where(eq(learningModules.pathwayId, p.pathway.id));

      const [enrolledUsers] = await db
        .select({
          count: sql<number>`COUNT(DISTINCT ${userModuleProgress.userId})`,
        })
        .from(userModuleProgress)
        .where(eq(userModuleProgress.pathwayId, p.pathway.id));

      const [completions] = await db
        .select({ count: count() })
        .from(userModuleProgress)
        .where(
          and(
            eq(userModuleProgress.pathwayId, p.pathway.id),
            eq(userModuleProgress.status, "completed")
          )
        );

      return {
        ...p,
        moduleCount: moduleCount?.count || 0,
        enrolledUsers: Number(enrolledUsers?.count) || 0,
        completedModules: completions?.count || 0,
      };
    })
  );

  return pathwaysWithStats;
}

export async function togglePathwayPublish(pathwayId: string) {
  const { userId } = await requireAdmin();

  const [pathway] = await db
    .select()
    .from(learningPathways)
    .where(eq(learningPathways.id, pathwayId))
    .limit(1);

  if (!pathway) return { success: false, error: "Pathway not found" };

  await db
    .update(learningPathways)
    .set({
      isPublished: !pathway.isPublished,
      updatedAt: new Date(),
    })
    .where(eq(learningPathways.id, pathwayId));

  await logAdminAction(userId, "toggle_publish", "pathway", pathwayId, {
    isPublished: !pathway.isPublished,
  });

  revalidatePath("/admin/pathways");
  revalidatePath("/dashboard/learn");
  return { success: true, isPublished: !pathway.isPublished };
}

// ============================================
// IMPACT REPORTS
// ============================================
export async function getAdminImpactReport(
  startDate?: Date,
  endDate?: Date
) {
  await requireAdmin();

  let conditions = [];
  if (startDate) conditions.push(gte(impactLogs.dateLogged, startDate));
  if (endDate) conditions.push(lte(impactLogs.dateLogged, endDate));

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // By category
  const byCategory = await db
    .select({
      category: impactLogs.category,
      totalQuantity: sql<number>`COALESCE(SUM(${impactLogs.quantity}), 0)`,
      logCount: count(),
      uniqueUsers: sql<number>`COUNT(DISTINCT ${impactLogs.userId})`,
    })
    .from(impactLogs)
    .where(whereClause)
    .groupBy(impactLogs.category);

  // By region
  const byRegion = await db
    .select({
      region: userProfiles.region,
      totalQuantity: sql<number>`COALESCE(SUM(${impactLogs.quantity}), 0)`,
      logCount: count(),
      uniqueUsers: sql<number>`COUNT(DISTINCT ${impactLogs.userId})`,
    })
    .from(impactLogs)
    .innerJoin(userProfiles, eq(impactLogs.userId, userProfiles.id))
    .where(whereClause)
    .groupBy(userProfiles.region)
    .orderBy(desc(count()));

  // Monthly trend
  const monthlyTrend = await db
    .select({
      month: sql<string>`TO_CHAR(${impactLogs.dateLogged}, 'YYYY-MM')`,
      category: impactLogs.category,
      totalQuantity: sql<number>`COALESCE(SUM(${impactLogs.quantity}), 0)`,
      logCount: count(),
    })
    .from(impactLogs)
    .where(whereClause)
    .groupBy(
      sql`TO_CHAR(${impactLogs.dateLogged}, 'YYYY-MM')`,
      impactLogs.category
    )
    .orderBy(sql`TO_CHAR(${impactLogs.dateLogged}, 'YYYY-MM')`);

  // Top contributors
  const topContributors = await db
    .select({
      fullName: userProfiles.fullName,
      region: userProfiles.region,
      totalQuantity: sql<number>`COALESCE(SUM(${impactLogs.quantity}), 0)`,
      logCount: count(),
    })
    .from(impactLogs)
    .innerJoin(userProfiles, eq(impactLogs.userId, userProfiles.id))
    .where(whereClause)
    .groupBy(userProfiles.fullName, userProfiles.region)
    .orderBy(desc(count()))
    .limit(10);

  return {
    byCategory,
    byRegion,
    monthlyTrend,
    topContributors,
  };
}

// ============================================
// RECENT ADMIN LOGS
// ============================================
export async function getAdminLogs(limit: number = 20) {
  await requireAdmin();

  return await db
    .select()
    .from(adminLogs)
    .orderBy(desc(adminLogs.createdAt))
    .limit(limit);
}