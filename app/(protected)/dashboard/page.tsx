// src/app/dashboard/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/config/db";
import { userProfiles, userSkills, userModuleProgress, businessPlans, impactLogs } from "@/config/schema";
import { eq, count, sql } from "drizzle-orm";
import { WelcomeCard } from "@/components/dashboard/WelcomeCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { StatsOverview } from "@/components/dashboard/StatsOverview";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  // Fetch user profile
  const profiles = await db
    .select()
    .from(userProfiles)
    .where(eq(userProfiles.clerkId, userId))
    .limit(1);

  const profile = profiles[0];
  if (!profile) redirect("/onboarding");

  // Fetch stats
  const [skillsCount] = await db
    .select({ count: count() })
    .from(userSkills)
    .where(eq(userSkills.userId, profile.id));

  const [completedModules] = await db
    .select({ count: count() })
    .from(userModuleProgress)
    .where(
      sql`${userModuleProgress.userId} = ${profile.id} AND ${userModuleProgress.status} = 'completed'`
    );

  const [plansCount] = await db
    .select({ count: count() })
    .from(businessPlans)
    .where(eq(businessPlans.userId, profile.id));

  const [impactCount] = await db
    .select({ count: count() })
    .from(impactLogs)
    .where(eq(impactLogs.userId, profile.id));

  const stats = {
    skills: skillsCount?.count || 0,
    modulesCompleted: completedModules?.count || 0,
    businessPlans: plansCount?.count || 0,
    impactActions: impactCount?.count || 0,
    points: profile.totalPoints,
  };

  return (
    <div className="space-y-6 p-8">
      <WelcomeCard profile={profile} />
      <StatsOverview stats={stats} />
      <QuickActions interests={profile.interests as string[]} />
    </div>
  );
}