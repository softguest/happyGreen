// src/components/impact/BadgesDisplay.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Trophy, Lock, Calendar } from "lucide-react";
import { format } from "date-fns";

// All possible badges (from seed data)
const ALL_BADGES = [
  {
    name: "Green Explorer",
    description: "Completed onboarding and profile setup",
    icon: "🌱",
    category: "learning",
    points: 10,
  },
  {
    name: "First Skill",
    description: "Saved your first green skill",
    icon: "🎯",
    category: "learning",
    points: 15,
  },
  {
    name: "Module Master",
    description: "Completed your first learning module",
    icon: "📗",
    category: "learning",
    points: 20,
  },
  {
    name: "Pathway Pioneer",
    description: "Completed a full learning pathway",
    icon: "🏆",
    category: "learning",
    points: 100,
  },
  {
    name: "Business Thinker",
    description: "Created your first green business plan",
    icon: "💡",
    category: "business",
    points: 50,
  },
  {
    name: "Impact Starter",
    description: "Logged your first environmental impact",
    icon: "🌍",
    category: "impact",
    points: 25,
  },
  {
    name: "Waste Warrior",
    description: "Logged 100kg of waste reduced",
    icon: "♻️",
    category: "impact",
    points: 75,
  },
  {
    name: "Tree Planter",
    description: "Logged planting 50 trees or seedlings",
    icon: "🌳",
    category: "impact",
    points: 75,
  },
];

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  learning: { label: "Learning", color: "text-blue-600" },
  business: { label: "Business", color: "text-gold-600" },
  impact: { label: "Impact", color: "text-green-600" },
};

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

interface Props {
  badges: EarnedBadge[];
}

export function BadgesDisplay({ badges: earnedBadges }: Props) {
  const earnedNames = new Set(earnedBadges.map((b) => b.badge.name));

  const earnedCount = earnedBadges.length;
  const totalCount = ALL_BADGES.length;
  const progressPercent = Math.round((earnedCount / totalCount) * 100);
  const totalPoints = earnedBadges.reduce(
    (acc, b) => acc + b.badge.pointsAwarded,
    0
  );

  // Group by category
  const categories = ["learning", "business", "impact"];

  return (
    <div className="space-y-6">
      {/* Summary */}
      <Card className="border-0 bg-gradient-to-br from-gold-50 to-amber-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gold-100 rounded-2xl flex items-center justify-center">
              <Trophy className="w-8 h-8 text-gold-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-heading font-bold text-gray-900">
                {earnedCount} / {totalCount} Badges Earned
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                {totalPoints} points from badges
              </p>
              {/* Progress */}
              <div className="mt-2">
                <div className="h-2.5 bg-gold-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gold-500 rounded-full transition-all duration-700"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badges by Category */}
      {categories.map((category) => {
        const categoryBadges = ALL_BADGES.filter(
          (b) => b.category === category
        );
        const catConfig = CATEGORY_LABELS[category];

        return (
          <div key={category}>
            <h3
              className={cn(
                "text-sm font-semibold mb-3 flex items-center gap-1.5",
                catConfig.color
              )}
            >
              {catConfig.label} Badges
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categoryBadges.map((badge) => {
                const isEarned = earnedNames.has(badge.name);
                const earnedData = earnedBadges.find(
                  (b) => b.badge.name === badge.name
                );

                return (
                  <Card
                    key={badge.name}
                    className={cn(
                      "border transition-all",
                      isEarned
                        ? "border-gold-200 bg-gold-50/30 shadow-sm"
                        : "border-gray-100 opacity-60"
                    )}
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      {/* Badge Icon */}
                      <div
                        className={cn(
                          "w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0",
                          isEarned
                            ? "bg-gold-100"
                            : "bg-gray-100 grayscale"
                        )}
                      >
                        {isEarned ? (
                          badge.icon
                        ) : (
                          <Lock className="w-6 h-6 text-gray-400" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p
                          className={cn(
                            "font-semibold text-sm",
                            isEarned ? "text-gray-900" : "text-gray-500"
                          )}
                        >
                          {badge.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {badge.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span
                            className={cn(
                              "text-[10px] font-bold px-2 py-0.5 rounded-full",
                              isEarned
                                ? "bg-gold-100 text-gold-700"
                                : "bg-gray-100 text-gray-500"
                            )}
                          >
                            +{badge.points} pts
                          </span>
                          {isEarned && earnedData && (
                            <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                              <Calendar className="w-3 h-3" />
                              {format(
                                new Date(earnedData.earnedAt),
                                "dd MMM yyyy"
                              )}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Earned Check */}
                      {isEarned && (
                        <span className="text-lg flex-shrink-0">✅</span>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Encouragement */}
      {earnedCount < totalCount && (
        <Card className="border border-green-200 bg-green-50/50">
          <CardContent className="p-5 text-center">
            <p className="text-sm text-green-800 font-medium">
              🌟 Keep going! You&apos;re {totalCount - earnedCount} badges
              away from completing your collection.
            </p>
            <p className="text-xs text-green-600 mt-1">
              Log more activities, complete learning pathways, and create
              business plans to earn badges.
            </p>
          </CardContent>
        </Card>
      )}

      {/* All earned celebration */}
      {earnedCount === totalCount && (
        <Card className="border-2 border-gold-300 bg-gradient-to-br from-gold-50 to-amber-50">
          <CardContent className="p-8 text-center">
            <span className="text-5xl">🏆</span>
            <h3 className="text-xl font-heading font-bold text-gray-900 mt-3">
              All Badges Earned!
            </h3>
            <p className="text-gray-600 mt-2">
              Congratulations! You&apos;ve unlocked every badge. You&apos;re a true
              GreenSkill Hub champion!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}