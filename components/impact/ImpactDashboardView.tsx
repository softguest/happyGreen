// src/components/impact/ImpactDashboardView.tsx
"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Users, Plus, Trophy } from "lucide-react";
import { ImpactLogger } from "./ImpactLogger";
import { ImpactCharts } from "./ImpactCharts";
import { ImpactHistory } from "./ImpactHistory";
import { BadgesDisplay } from "./BadgesDisplay";
import { ImpactOverview } from "./ImpactOverview";
import { CommunityImpact } from "./CommunityImpact";

interface CategoryTotal {
  category: string;
  totalQuantity: number;
  logCount: number;
}

interface ImpactLog {
  id: string;
  userId: string;
  category: string;
  activityDescription: string;
  quantity: number;
  unit: string;
  dateLogged: Date;
  verified: boolean | null;
  createdAt: Date;
}

interface MonthlyData {
  month: string;
  category: string;
  totalQuantity: number;
  logCount: number;
}

interface WeeklyData {
  week: string;
  category: string;
  totalQuantity: number;
}

interface EarnedBadge {
  badge: {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: string;
    pointsAwarded: number;
  };
  earnedAt: Date;
}

interface CommunityData {
  communityTotals: Array<{
    category: string;
    totalQuantity: number;
    uniqueUsers: number;
    logCount: number;
  }>;
  regionalTotals: Array<{
    category: string;
    totalQuantity: number;
    uniqueUsers: number;
    logCount: number;
  }>;
  topContributors: Array<{
    userId: string;
    fullName: string;
    region: string | null;
    totalLogs: number;
    totalQuantity: number;
  }>;
  totalActiveUsers: number;
  userRegion: string | null;
}

interface Props {
  summary: {
    profile: {
      id: string;
      fullName: string;
      region: string | null;
      totalPoints: number;
    };
    categoryTotals: CategoryTotal[];
    recentLogs: ImpactLog[];
    monthlyData: MonthlyData[];
    weeklyData: WeeklyData[];
    totalStats: { totalLogs: number; totalQuantity: number };
    earnedBadges: EarnedBadge[];
  };
  community: CommunityData | null;
}

export function ImpactDashboardView({ summary, community }: Props) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-gray-900">
          My Impact Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Track your environmental contributions and see the difference you&apos;re
          making
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 bg-mist">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-green-800 data-[state=active]:text-white text-xs sm:text-sm"
          >
            <BarChart3 className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">My</span> Impact
          </TabsTrigger>
          <TabsTrigger
            value="log"
            className="data-[state=active]:bg-green-800 data-[state=active]:text-white text-xs sm:text-sm"
          >
            <Plus className="w-4 h-4 mr-1 sm:mr-2" />
            Log Activity
          </TabsTrigger>
          <TabsTrigger
            value="community"
            className="data-[state=active]:bg-green-800 data-[state=active]:text-white text-xs sm:text-sm"
          >
            <Users className="w-4 h-4 mr-1 sm:mr-2" />
            Community
          </TabsTrigger>
          <TabsTrigger
            value="badges"
            className="data-[state=active]:bg-green-800 data-[state=active]:text-white text-xs sm:text-sm"
          >
            <Trophy className="w-4 h-4 mr-1 sm:mr-2" />
            Badges
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <ImpactOverview
            categoryTotals={summary.categoryTotals}
            totalStats={summary.totalStats}
            totalPoints={summary.profile.totalPoints}
          />
          <ImpactCharts
            monthlyData={summary.monthlyData}
            weeklyData={summary.weeklyData}
            categoryTotals={summary.categoryTotals}
          />
          <ImpactHistory logs={summary.recentLogs} />
        </TabsContent>

        <TabsContent value="log" className="mt-6">
          <ImpactLogger />
        </TabsContent>

        <TabsContent value="community" className="mt-6">
          <CommunityImpact
            data={community}
            userName={summary.profile.fullName}
          />
        </TabsContent>

        <TabsContent value="badges" className="mt-6">
          <BadgesDisplay badges={summary.earnedBadges} />
        </TabsContent>
      </Tabs>
    </div>
  );
}