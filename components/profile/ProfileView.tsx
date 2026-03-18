// src/components/profile/ProfileView.tsx
"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  UserCircle,
  BarChart3,
  Settings,
  Shield,
} from "lucide-react";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileEditForm } from "./ProfileEditForm";
import { ProfileSettings } from "./ProfileSettings";
import { ProfileOverview } from "./ProfileOverview";


interface SavedSkill {
  userSkill: {
    id: string;
    skillId: string;
    status: string;
    recommendedByAi: boolean;
    aiRecommendationReason: string | null;
    createdAt: Date;
  };
  skill: {
    id: string;
    name: string;
    category: string;
    description: string;
    shortDescription: string | null;
    difficulty: string;
    estimatedDuration: string | null;
    marketPotential: string | null;
    climateBenefit: string | null;
    icon: string | null;
  };
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

interface ImpactCategory {
  category: string;
  totalQuantity: number;
  logCount: number;
}

export interface ProfileData {
  profile: {
    id: string;
    clerkId: string;
    fullName: string;
    email: string | null;
    phone: string | null;
    region: string | null;
    city: string | null;
    preferredLanguage: string;
    currentSituation: string | null;
    interests: unknown;
    availableResources: unknown;
    onboardingCompleted: boolean;
    totalPoints: number;
    createdAt: Date;
    updatedAt: Date;
  };
  skillsSummary: {
    interested: number;
    learning: number;
    completed: number;
  };
  savedSkills: SavedSkill[];
  learning: {
    totalModules: number;
    completedModules: number;
    pathwaysEnrolled: number;
  };
  business: {
    totalPlans: number;
    completedPlans: number;
  };
  impact: {
    totalLogs: number;
    categories: ImpactCategory[];
  };
  earnedBadges: EarnedBadge[];
  accountAge: number;
  streak: number;
}

interface Props {
  data: ProfileData;
}

export function ProfileView({ data }: Props) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Profile Header Card */}
      <ProfileHeader data={data} />

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-mist">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-green-800 data-[state=active]:text-white text-xs sm:text-sm"
          >
            <BarChart3 className="w-4 h-4 mr-1 sm:mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="edit"
            className="data-[state=active]:bg-green-800 data-[state=active]:text-white text-xs sm:text-sm"
          >
            <UserCircle className="w-4 h-4 mr-1 sm:mr-2" />
            Edit Profile
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="data-[state=active]:bg-green-800 data-[state=active]:text-white text-xs sm:text-sm"
          >
            <Settings className="w-4 h-4 mr-1 sm:mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <ProfileOverview data={data} />
        </TabsContent>

        <TabsContent value="edit" className="mt-6">
          <ProfileEditForm profile={data.profile} />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <ProfileSettings profile={data.profile} />
        </TabsContent>
      </Tabs>
    </div>
  );
}