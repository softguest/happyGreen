// src/components/impact/ImpactOverview.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { IMPACT_CATEGORIES } from "@/lib/constants";
import {
  Trash2,
  TreePine,
  Zap,
  Droplets,
  TrendingUp,
  Activity,
  Star,
  Leaf,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  categoryTotals: Array<{
    category: string;
    totalQuantity: number;
    logCount: number;
  }>;
  totalStats: { totalLogs: number; totalQuantity: number };
  totalPoints: number;
}

const CATEGORY_CONFIG: Record<
  string,
  {
    label: string;
    unit: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bgColor: string;
    borderColor: string;
    emoji: string;
  }
> = {
  waste: {
    label: "Waste Reduced",
    unit: "kg",
    icon: Trash2,
    color: "text-amber-700",
    bgColor: "bg-amber-100",
    borderColor: "border-amber-200",
    emoji: "♻️",
  },
  agriculture: {
    label: "Crops & Trees",
    unit: "units",
    icon: TreePine,
    color: "text-green-700",
    bgColor: "bg-green-100",
    borderColor: "border-green-200",
    emoji: "🌳",
  },
  energy: {
    label: "Energy Saved",
    unit: "kWh",
    icon: Zap,
    color: "text-yellow-700",
    bgColor: "bg-yellow-100",
    borderColor: "border-yellow-200",
    emoji: "⚡",
  },
  water: {
    label: "Water Conserved",
    unit: "liters",
    icon: Droplets,
    color: "text-blue-700",
    bgColor: "bg-blue-100",
    borderColor: "border-blue-200",
    emoji: "💧",
  },
  income: {
    label: "Income Generated",
    unit: "XAF",
    icon: TrendingUp,
    color: "text-emerald-700",
    bgColor: "bg-emerald-100",
    borderColor: "border-emerald-200",
    emoji: "💰",
  },
};

export function ImpactOverview({
  categoryTotals,
  totalStats,
  totalPoints,
}: Props) {
  const getCategoryData = (category: string) => {
    return categoryTotals.find((c) => c.category === category);
  };

  return (
    <div className="space-y-4">
      {/* Top Summary */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="border border-green-200 bg-green-50/50">
          <CardContent className="p-4 text-center">
            <Activity className="w-6 h-6 text-green-700 mx-auto mb-1" />
            <p className="text-2xl font-bold text-gray-900">
              {totalStats.totalLogs}
            </p>
            <p className="text-xs text-muted-foreground">
              Total Activities
            </p>
          </CardContent>
        </Card>
        <Card className="border border-gold-200 bg-gold-50/50">
          <CardContent className="p-4 text-center">
            <Star className="w-6 h-6 text-gold-600 mx-auto mb-1" />
            <p className="text-2xl font-bold text-gray-900">{totalPoints}</p>
            <p className="text-xs text-muted-foreground">Total Points</p>
          </CardContent>
        </Card>
        <Card className="border border-emerald-200 bg-emerald-50/50">
          <CardContent className="p-4 text-center">
            <Leaf className="w-6 h-6 text-emerald-700 mx-auto mb-1" />
            <p className="text-2xl font-bold text-gray-900">
              {categoryTotals.length}
            </p>
            <p className="text-xs text-muted-foreground">
              Impact Areas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(CATEGORY_CONFIG).map(([key, config]) => {
          const data = getCategoryData(key);
          const Icon = config.icon;
          const quantity = data ? Number(data.totalQuantity) : 0;
          const logs = data?.logCount || 0;

          return (
            <Card
              key={key}
              className={cn(
                "border card-hover",
                quantity > 0 ? config.borderColor : "border-gray-100"
              )}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      quantity > 0 ? config.bgColor : "bg-gray-100"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-6 h-6",
                        quantity > 0 ? config.color : "text-gray-400"
                      )}
                    />
                  </div>
                  <span className="text-2xl">{config.emoji}</span>
                </div>

                <div className="mt-3">
                  <p className="text-sm text-muted-foreground">
                    {config.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {key === "income"
                      ? quantity.toLocaleString()
                      : quantity.toLocaleString(undefined, {
                          maximumFractionDigits: 1,
                        })}
                    <span className="text-sm font-normal text-gray-500 ml-1">
                      {config.unit}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {logs} {logs === 1 ? "activity" : "activities"} logged
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}