// src/components/profile/ProfileHeader.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CAMEROON_REGIONS, USER_SITUATIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  MapPin,
  Star,
  Calendar,
  Flame,
  Trophy,
  Briefcase,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { format } from "date-fns";
import type { ProfileData } from "./ProfileView";

interface Props {
  data: ProfileData;
}

export function ProfileHeader({ data }: Props) {
  const { profile, skillsSummary, learning, business, impact, earnedBadges, accountAge, streak } = data;

  const regionLabel = CAMEROON_REGIONS.find(
    (r) => r.value === profile.region
  )?.label;

  const situationLabel = USER_SITUATIONS.find(
    (s) => s.value === profile.currentSituation
  )?.label;

  const totalSkills =
    skillsSummary.interested + skillsSummary.learning + skillsSummary.completed;

  // Profile completion
  const fields = [
    profile.fullName,
    profile.email,
    profile.phone,
    profile.region,
    profile.city,
    profile.currentSituation,
    (profile.interests as string[])?.length > 0,
    (profile.availableResources as string[])?.length > 0,
  ];
  const profileCompletion = Math.round(
    (fields.filter(Boolean).length / fields.length) * 100
  );

  // Initials for avatar
  const initials = profile.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="border-0 overflow-hidden">
      {/* Green Banner */}
      <div className="gradient-green h-28 relative">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern
              id="dots"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="white" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
      </div>

      <CardContent className="px-5 md:px-8 pb-6 -mt-14">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          {/* Avatar */}
          <div className="w-24 h-24 bg-gold-500 rounded-2xl flex items-center justify-center text-green-900 text-2xl font-bold border-4 border-white shadow-lg flex-shrink-0">
            {initials}
          </div>

          {/* Info */}
          <div className="flex-1 pt-2 sm:pt-8">
            <h1 className="text-2xl font-heading font-bold text-gray-900">
              {profile.fullName}
            </h1>

            <div className="flex flex-wrap items-center gap-2 mt-2">
              {regionLabel && (
                <Badge
                  variant="outline"
                  className="text-xs border-green-200 text-green-700"
                >
                  <MapPin className="w-3 h-3 mr-1" />
                  {profile.city || regionLabel}
                </Badge>
              )}
              {situationLabel && (
                <Badge
                  variant="outline"
                  className="text-xs border-blue-200 text-blue-700"
                >
                  <Briefcase className="w-3 h-3 mr-1" />
                  {situationLabel}
                </Badge>
              )}
              <Badge
                variant="outline"
                className="text-xs border-gold-200 text-gold-700"
              >
                <Star className="w-3 h-3 mr-1" />
                {profile.totalPoints} points
              </Badge>
            </div>

            {/* Quick Stats Row */}
            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Joined{" "}
                {format(new Date(profile.createdAt), "MMM yyyy")}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {accountAge} days on platform
              </span>
              {streak > 0 && (
                <span className="flex items-center gap-1 text-orange-500 font-medium">
                  <Flame className="w-3.5 h-3.5" />
                  {streak}-day streak!
                </span>
              )}
            </div>
          </div>

          {/* Points Card (Desktop) */}
          <div className="hidden md:block bg-gold-50 border border-gold-200 rounded-xl p-4 text-center mt-8">
            <Star className="w-6 h-6 text-gold-500 mx-auto mb-1" />
            <p className="text-2xl font-bold text-gray-900">
              {profile.totalPoints}
            </p>
            <p className="text-[10px] text-muted-foreground">Total Points</p>
          </div>
        </div>

        {/* Profile Completion Bar */}
        {profileCompletion < 100 && (
          <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl p-3">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-amber-800 font-medium flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Profile Completion
              </span>
              <span className="text-amber-700 font-bold">
                {profileCompletion}%
              </span>
            </div>
            <Progress
              value={profileCompletion}
              className="h-2 bg-amber-100"
            />
            <p className="text-[10px] text-amber-600 mt-1.5">
              Complete your profile for better AI recommendations
            </p>
          </div>
        )}

        {/* Mini Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          <MiniStat
            icon={<Sparkles className="w-4 h-4 text-green-600" />}
            label="Skills"
            value={totalSkills}
            sub={`${skillsSummary.completed} completed`}
          />
          <MiniStat
            icon={<BookOpen className="w-4 h-4 text-blue-600" />}
            label="Modules"
            value={learning.completedModules}
            sub={`of ${learning.totalModules} started`}
          />
          <MiniStat
            icon={<Trophy className="w-4 h-4 text-gold-500" />}
            label="Badges"
            value={earnedBadges.length}
            sub="earned"
          />
          <MiniStat
            icon={<Flame className="w-4 h-4 text-orange-500" />}
            label="Impact Logs"
            value={impact.totalLogs}
            sub="activities"
          />
        </div>
      </CardContent>
    </Card>
  );
}

function MiniStat({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  sub: string;
}) {
  return (
    <div className="bg-mist rounded-xl p-3 text-center">
      <div className="flex items-center justify-center mb-1">{icon}</div>
      <p className="text-xl font-bold text-gray-900">{value}</p>
      <p className="text-[10px] text-muted-foreground">
        {label} · {sub}
      </p>
    </div>
  );
}