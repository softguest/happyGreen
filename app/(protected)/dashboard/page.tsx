import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader";
import { RecommendedSkillsCard } from "@/components/dashboard/RecommendedSkillsCard";
import { LearningPathCard } from "@/components/dashboard/LearningPathCard";
import { ImpactSnapshot } from "@/components/dashboard/ImpactSnapshot";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
const isLoading = false; // replace with real loading state

// Dummy user data
const user = {
  name: "Maria",
  email: "maria@email.com",
};

export default function Dashboard() {
    if (isLoading) {
    return (
      <DashboardLayout>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <DashboardSkeleton />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 sm:space-y-8">
        {/* Welcome Header */}
        <div className="lg:sticky lg:top-6 z-20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <WelcomeHeader userName={user.name} />
        </div>

        {/* Quick Actions */}
        {/* <div className="relative -mx-4 sm:mx-0">
          <div className="flex gap-4 overflow-x-auto px-4 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 scrollbar-hide"> */}
            <QuickActions />
          {/* </div>
        </div> */}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Learning Path */}
          <div className="space-y-6">
            <LearningPathCard />
          </div>

          {/* AI Recommendations */}
          <div className="space-y-6">
            <RecommendedSkillsCard />
          </div>
        </div>

        {/* Impact Stats */}
        <div className="pt-2 sm:pt-4">
          <ImpactSnapshot />
        </div>
      </div>
    </DashboardLayout>
  );
}
