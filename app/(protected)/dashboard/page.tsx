"use client";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader";
import { RecommendedSkillsCard } from "@/components/dashboard/RecommendedSkillsCard";
import { LearningPathCard } from "@/components/dashboard/LearningPathCard";
import { ImpactSnapshot } from "@/components/dashboard/ImpactSnapshot";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { useUser } from '@clerk/nextjs';

export default function Dashboard() {
  const { user } = useUser();
  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
        {/* Welcome Header */}
        <WelcomeHeader userName={user?.firstName ?? ""} />

        {/* Quick Actions */}
        <QuickActions />

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column - Learning Path */}
          <div className="space-y-6">
            <LearningPathCard />
          </div>

          {/* Right Column - AI Recommendations */}
          <div className="space-y-6">
            <RecommendedSkillsCard />
          </div>
        </div>

        {/* Impact Stats */}
        <ImpactSnapshot />
      </div>
    </DashboardLayout>
  );
}
