// src/components/dashboard/StatsOverview.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Brain, Lightbulb, TreePine, Star } from "lucide-react";

interface Props {
  stats: {
    skills: number;
    modulesCompleted: number;
    businessPlans: number;
    impactActions: number;
    points: number;
  };
}

const statCards = [
  {
    key: "skills" as const,
    label: "Skills Saved",
    icon: Brain,
    color: "text-green-700",
    bg: "bg-green-100",
  },
  {
    key: "modulesCompleted" as const,
    label: "Modules Done",
    icon: BookOpen,
    color: "text-blue-700",
    bg: "bg-blue-100",
  },
  {
    key: "businessPlans" as const,
    label: "Business Plans",
    icon: Lightbulb,
    color: "text-amber-700",
    bg: "bg-amber-100",
  },
  {
    key: "impactActions" as const,
    label: "Impact Actions",
    icon: TreePine,
    color: "text-emerald-700",
    bg: "bg-emerald-100",
  },
];

export function StatsOverview({ stats }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.key} className="card-hover border border-gray-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}
                >
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats[stat.key]}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}