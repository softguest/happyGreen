// src/components/profile/ProfileOverview.tsx
"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { SKILL_CATEGORIES, CAMEROON_REGIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Clock,
  Lightbulb,
  MapPin,
  Sparkles,
  Star,
  TreePine,
  Trophy,
  Trash2,
  Zap,
  Droplets,
  TrendingUp,
  Globe,
  Flame,
} from "lucide-react";
import { format } from "date-fns";
import type { ProfileData } from "./ProfileView";

interface Props {
  data: ProfileData;
}

const IMPACT_ICONS: Record<string, { icon: React.ReactNode; color: string }> = {
  waste: { icon: <Trash2 className="w-4 h-4" />, color: "text-amber-600" },
  agriculture: { icon: <TreePine className="w-4 h-4" />, color: "text-green-600" },
  energy: { icon: <Zap className="w-4 h-4" />, color: "text-yellow-600" },
  water: { icon: <Droplets className="w-4 h-4" />, color: "text-blue-600" },
  income: { icon: <TrendingUp className="w-4 h-4" />, color: "text-emerald-600" },
};

const IMPACT_LABELS: Record<string, { label: string; unit: string }> = {
  waste: { label: "Waste Reduced", unit: "kg" },
  agriculture: { label: "Crops & Trees", unit: "planted" },
  energy: { label: "Energy Saved", unit: "kWh" },
  water: { label: "Water Conserved", unit: "liters" },
  income: { label: "Income Generated", unit: "XAF" },
};

export function ProfileOverview({ data }: Props) {
  const {
    profile,
    skillsSummary,
    savedSkills,
    learning,
    business,
    impact,
    earnedBadges,
    streak,
  } = data;

  const interests = (profile.interests as string[]) || [];
  const resources = (profile.availableResources as string[]) || [];

  const getCategoryInfo = (category: string) =>
    SKILL_CATEGORIES.find((c) => c.value === category);

  return (
    <div className="space-y-6">
      {/* ====== INTERESTS & RESOURCES ====== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Interests */}
        <Card className="border border-gray-100">
          <CardContent className="p-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Globe className="w-4 h-4 text-green-600" />
              Green Interests
            </h3>
            {interests.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => {
                  const cat = getCategoryInfo(interest);
                  return (
                    <Badge
                      key={interest}
                      variant="outline"
                      className={cn(
                        "text-xs",
                        cat?.bgColor,
                        cat?.color
                      )}
                    >
                      {cat?.label || interest}
                    </Badge>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No interests selected yet
              </p>
            )}
          </CardContent>
        </Card>

        {/* Resources */}
        <Card className="border border-gray-100">
          <CardContent className="p-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-500" />
              Available Resources
            </h3>
            {resources.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {resources.map((resource) => (
                  <Badge
                    key={resource}
                    variant="outline"
                    className="text-xs border-gray-200"
                  >
                    {resource
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No resources specified yet
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ====== SKILLS SUMMARY ====== */}
      <Card className="border border-gray-100">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <Brain className="w-4 h-4 text-green-600" />
              Green Skills
            </h3>
            <Link href="/dashboard/skills">
              <Button variant="ghost" size="sm" className="text-green-700 text-xs">
                View All
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>

          {/* Status Bars */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <StatusCard
              label="Interested"
              value={skillsSummary.interested}
              color="bg-blue-100 text-blue-700"
            />
            <StatusCard
              label="Learning"
              value={skillsSummary.learning}
              color="bg-amber-100 text-amber-700"
            />
            <StatusCard
              label="Completed"
              value={skillsSummary.completed}
              color="bg-green-100 text-green-700"
            />
          </div>

          {/* Recent Skills */}
          {savedSkills.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-medium">
                Recent Skills
              </p>
              {savedSkills.slice(0, 3).map(({ userSkill, skill }) => {
                const cat = getCategoryInfo(skill.category);
                return (
                  <div
                    key={userSkill.id}
                    className="flex items-center gap-3 bg-mist rounded-lg p-2.5"
                  >
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px]",
                        cat?.bgColor,
                        cat?.color
                      )}
                    >
                      {cat?.label?.split(" ")[0] || skill.category}
                    </Badge>
                    <span className="text-sm text-gray-800 font-medium flex-1 line-clamp-1">
                      {skill.name}
                    </span>
                    <Badge
                      className={cn(
                        "text-[10px]",
                        userSkill.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : userSkill.status === "learning"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-blue-100 text-blue-700"
                      )}
                    >
                      {userSkill.status}
                    </Badge>
                  </div>
                );
              })}
            </div>
          )}

          {savedSkills.length === 0 && (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground">
                No skills saved yet
              </p>
              <Link href="/dashboard/skills">
                <Button
                  size="sm"
                  className="mt-2 bg-green-800 hover:bg-green-700 text-white"
                >
                  <Brain className="w-4 h-4 mr-1.5" />
                  Explore Skills
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ====== LEARNING + BUSINESS SIDE BY SIDE ====== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Learning */}
        <Card className="border border-gray-100">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                Learning Progress
              </h3>
              <Link href="/dashboard/learn">
                <Button variant="ghost" size="sm" className="text-blue-700 text-xs">
                  Go <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Pathways Enrolled</span>
                <span className="font-bold text-gray-900">
                  {learning.pathwaysEnrolled}
                </span>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Modules Completed</span>
                  <span className="font-bold text-gray-900">
                    {learning.completedModules}/{learning.totalModules}
                  </span>
                </div>
                {learning.totalModules > 0 && (
                  <Progress
                    value={
                      (learning.completedModules / learning.totalModules) * 100
                    }
                    className="h-2"
                  />
                )}
              </div>
            </div>

            {learning.totalModules === 0 && (
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Start a learning pathway to track progress
              </p>
            )}
          </CardContent>
        </Card>

        {/* Business */}
        <Card className="border border-gray-100">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-gold-500" />
                Business Plans
              </h3>
              <Link href="/dashboard/business">
                <Button variant="ghost" size="sm" className="text-gold-700 text-xs">
                  Go <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Total Plans</span>
                <span className="font-bold text-gray-900">
                  {business.totalPlans}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Completed</span>
                <span className="font-bold text-green-700">
                  {business.completedPlans}
                </span>
              </div>
            </div>

            {business.totalPlans === 0 && (
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Create your first green business plan
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ====== IMPACT SUMMARY ====== */}
      <Card className="border border-gray-100">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500" />
              Impact Summary
              {streak > 0 && (
                <Badge className="text-[10px] bg-orange-100 text-orange-700 ml-1">
                  🔥 {streak}-day streak
                </Badge>
              )}
            </h3>
            <Link href="/dashboard/impact">
              <Button variant="ghost" size="sm" className="text-orange-700 text-xs">
                Details <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>

          {impact.totalLogs > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {impact.categories.map((cat) => {
                const config = IMPACT_ICONS[cat.category];
                const labelConfig = IMPACT_LABELS[cat.category];
                if (!config || !labelConfig) return null;

                return (
                  <div
                    key={cat.category}
                    className="bg-mist rounded-xl p-3 text-center"
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center mb-1",
                        config.color
                      )}
                    >
                      {config.icon}
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {cat.category === "income"
                        ? Number(cat.totalQuantity).toLocaleString()
                        : Number(cat.totalQuantity).toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {labelConfig.label} ({labelConfig.unit})
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground">
                No impact activities logged yet
              </p>
              <Link href="/dashboard/impact">
                <Button
                  size="sm"
                  className="mt-2 bg-green-800 hover:bg-green-700 text-white"
                >
                  Log First Activity
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ====== BADGES ====== */}
      <Card className="border border-gray-100">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-gold-500" />
              Badges Earned ({earnedBadges.length})
            </h3>
            <Link href="/dashboard/impact">
              <Button variant="ghost" size="sm" className="text-gold-700 text-xs">
                View All <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>

          {earnedBadges.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {earnedBadges.map(({ badge, earnedAt }) => (
                <div
                  key={badge.id}
                  className="flex items-center gap-2 bg-gold-50 border border-gold-200 rounded-xl px-3 py-2"
                  title={`${badge.description} — Earned ${format(
                    new Date(earnedAt),
                    "dd MMM yyyy"
                  )}`}
                >
                  <span className="text-xl">{badge.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">
                      {badge.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      +{badge.pointsAwarded} pts
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-3">
              Complete activities to earn badges!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StatusCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-mist rounded-xl p-3 text-center">
      <p className="text-xl font-bold text-gray-900">{value}</p>
      <Badge className={cn("text-[10px] mt-1", color)}>{label}</Badge>
    </div>
  );
}