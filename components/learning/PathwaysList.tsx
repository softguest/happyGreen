// src/components/learning/PathwaysList.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SKILL_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Clock,
  Layers,
  ChevronRight,
  GraduationCap,
  Trophy,
  Sparkles,
  Filter,
  FolderOpen,
} from "lucide-react";

interface PathwayWithSkill {
  pathway: {
    id: string;
    skillId: string;
    title: string;
    description: string;
    estimatedHours: number | null;
    totalModules: number;
    difficulty: string;
    prerequisites: unknown;
    learningOutcomes: unknown;
    isPublished: boolean;
  };
  skill: {
    id: string;
    name: string;
    category: string;
    description: string;
    icon: string | null;
  };
}

interface Props {
  pathways: PathwayWithSkill[];
  userProgress: Record<string, { total: number; completed: number }>;
}

export function PathwaysList({ pathways, userProgress }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPathways = pathways.filter(
    (p) => !activeCategory || p.skill.category === activeCategory
  );

  const getCategoryInfo = (category: string) =>
    SKILL_CATEGORIES.find((c) => c.value === category);

  const getDifficultyConfig = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return { label: "Beginner", color: "bg-green-100 text-green-700", icon: "🌱" };
      case "intermediate":
        return { label: "Intermediate", color: "bg-amber-100 text-amber-700", icon: "🌿" };
      case "advanced":
        return { label: "Advanced", color: "bg-red-100 text-red-700", icon: "🌳" };
      default:
        return { label: difficulty, color: "bg-gray-100 text-gray-700", icon: "📗" };
    }
  };

  const getPathwayStatus = (pathwayId: string, totalModules: number) => {
    const progress = userProgress[pathwayId];
    if (!progress) return "not_started";
    if (progress.completed >= totalModules) return "completed";
    if (progress.completed > 0) return "in_progress";
    return "started";
  };

  // Group pathways by status
  const inProgressPathways = filteredPathways.filter((p) => {
    const status = getPathwayStatus(p.pathway.id, p.pathway.totalModules);
    return status === "in_progress" || status === "started";
  });

  const otherPathways = filteredPathways.filter((p) => {
    const status = getPathwayStatus(p.pathway.id, p.pathway.totalModules);
    return status === "not_started";
  });

  const completedPathways = filteredPathways.filter((p) => {
    const status = getPathwayStatus(p.pathway.id, p.pathway.totalModules);
    return status === "completed";
  });

  if (pathways.length === 0) {
    return (
      <Card className="border-2 border-dashed border-gray-200">
        <CardContent className="p-12 text-center">
          <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-heading font-semibold text-gray-600">
            No learning pathways available yet
          </h3>
          <p className="text-muted-foreground mt-2">
            New pathways are being added. Check back soon!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setActiveCategory(null)}
          className={cn(
            "rounded-full",
            !activeCategory && "bg-green-800 text-white hover:bg-green-700"
          )}
        >
          <Filter className="w-3.5 h-3.5 mr-1" />
          All ({pathways.length})
        </Button>
        {SKILL_CATEGORIES.map((cat) => {
          const catCount = pathways.filter(
            (p) => p.skill.category === cat.value
          ).length;
          if (catCount === 0) return null;
          return (
            <Button
              key={cat.value}
              variant="outline"
              size="sm"
              onClick={() =>
                setActiveCategory(
                  activeCategory === cat.value ? null : cat.value
                )
              }
              className={cn(
                "rounded-full",
                activeCategory === cat.value &&
                  "bg-green-800 text-white hover:bg-green-700"
              )}
            >
              {cat.label} ({catCount})
            </Button>
          );
        })}
      </div>

      {/* Continue Learning Section */}
      {inProgressPathways.length > 0 && (
        <div>
          <h2 className="text-lg font-heading font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-green-700" />
            Continue Learning
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inProgressPathways.map((item) => (
              <PathwayCard
                key={item.pathway.id}
                item={item}
                progress={userProgress[item.pathway.id]}
                getCategoryInfo={getCategoryInfo}
                getDifficultyConfig={getDifficultyConfig}
                highlight
              />
            ))}
          </div>
        </div>
      )}

      {/* Available Pathways */}
      {otherPathways.length > 0 && (
        <div>
          <h2 className="text-lg font-heading font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold-500" />
            Available Pathways
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherPathways.map((item) => (
              <PathwayCard
                key={item.pathway.id}
                item={item}
                progress={userProgress[item.pathway.id]}
                getCategoryInfo={getCategoryInfo}
                getDifficultyConfig={getDifficultyConfig}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Pathways */}
      {completedPathways.length > 0 && (
        <div>
          <h2 className="text-lg font-heading font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-gold-500" />
            Completed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedPathways.map((item) => (
              <PathwayCard
                key={item.pathway.id}
                item={item}
                progress={userProgress[item.pathway.id]}
                getCategoryInfo={getCategoryInfo}
                getDifficultyConfig={getDifficultyConfig}
                completed
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// Individual Pathway Card
// ============================================
function PathwayCard({
  item,
  progress,
  getCategoryInfo,
  getDifficultyConfig,
  highlight,
  completed,
}: {
  item: {
    pathway: {
      id: string;
      title: string;
      description: string;
      estimatedHours: number | null;
      totalModules: number;
      difficulty: string;
      learningOutcomes: unknown;
    };
    skill: {
      name: string;
      category: string;
    };
  };
  progress?: { total: number; completed: number };
  getCategoryInfo: (cat: string) => (typeof SKILL_CATEGORIES)[number] | undefined;
  getDifficultyConfig: (d: string) => { label: string; color: string; icon: string };
  highlight?: boolean;
  completed?: boolean;
}) {
  const catInfo = getCategoryInfo(item.skill.category);
  const diffConfig = getDifficultyConfig(item.pathway.difficulty);
  const completedCount = progress?.completed || 0;
  const progressPercent =
    item.pathway.totalModules > 0
      ? Math.round((completedCount / item.pathway.totalModules) * 100)
      : 0;
  const outcomes = (item.pathway.learningOutcomes as string[]) || [];

  return (
    <Link href={`/dashboard/learn/${item.pathway.id}`}>
      <Card
        className={cn(
          "card-hover cursor-pointer border h-full transition-all",
          highlight
            ? "border-green-300 bg-green-50/30 shadow-sm"
            : completed
            ? "border-gold-200 bg-gold-50/20"
            : "border-gray-100"
        )}
      >
        <CardContent className="p-5">
          {/* Category + Difficulty */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              variant="outline"
              className={cn("text-xs", catInfo?.bgColor, catInfo?.color)}
            >
              {catInfo?.label || item.skill.category}
            </Badge>
            <Badge className={cn("text-xs", diffConfig.color)}>
              {diffConfig.icon} {diffConfig.label}
            </Badge>
            {completed && (
              <Badge className="text-xs bg-gold-100 text-gold-700">
                <Trophy className="w-3 h-3 mr-1" />
                Completed
              </Badge>
            )}
          </div>

          {/* Title & Skill */}
          <h3 className="font-heading font-bold text-gray-900 mt-3 leading-tight">
            {item.pathway.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Skill: {item.skill.name}
          </p>

          {/* Description */}
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {item.pathway.description}
          </p>

          {/* Learning Outcomes Preview */}
          {outcomes.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-medium text-gray-500 mb-1">
                You&apos;ll learn:
              </p>
              <ul className="space-y-0.5">
                {outcomes.slice(0, 2).map((outcome, i) => (
                  <li
                    key={i}
                    className="text-xs text-gray-600 flex items-start gap-1.5"
                  >
                    <span className="text-green-500 mt-0.5">✓</span>
                    {outcome}
                  </li>
                ))}
                {outcomes.length > 2 && (
                  <li className="text-xs text-muted-foreground">
                    +{outcomes.length - 2} more outcomes
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Meta */}
          <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" />
              {item.pathway.totalModules} modules
            </span>
            {item.pathway.estimatedHours && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                ~{item.pathway.estimatedHours}h
              </span>
            )}
          </div>

          {/* Progress Bar */}
          {progress && progressPercent > 0 && (
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-gray-600 font-medium">
                  {completedCount}/{item.pathway.totalModules} completed
                </span>
                <span className="text-green-700 font-bold">
                  {progressPercent}%
                </span>
              </div>
              <Progress
                value={progressPercent}
                className="h-2 bg-gray-100"
              />
            </div>
          )}

          {/* CTA */}
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm font-medium text-green-700">
              {completed
                ? "Review"
                : progressPercent > 0
                ? "Continue"
                : "Start Learning"}
            </span>
            <ChevronRight className="w-5 h-5 text-green-600" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}