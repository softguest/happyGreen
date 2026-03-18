// src/components/dashboard/QuickActions.tsx
"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Brain,
  BookOpen,
  Lightbulb,
  BarChart3,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface Props {
  interests: string[];
}

const actions = [
  {
    href: "/dashboard/skills",
    label: "Get AI Skill Recommendations",
    description: "Discover green skills matched to your profile",
    icon: Brain,
    color: "bg-green-800 hover:bg-green-700",
    textColor: "text-white",
    featured: true,
  },
  {
    href: "/dashboard/learn",
    label: "Start Learning",
    description: "Practical step-by-step modules",
    icon: BookOpen,
    color: "bg-white hover:bg-green-50",
    textColor: "text-green-800",
    borderColor: "border-green-200",
  },
  {
    href: "/dashboard/business",
    label: "Plan a Green Business",
    description: "AI-guided business planning",
    icon: Lightbulb,
    color: "bg-white hover:bg-gold-50",
    textColor: "text-gold-600",
    borderColor: "border-gold-200",
  },
  {
    href: "/dashboard/impact",
    label: "Track My Impact",
    description: "Log and visualize your contributions",
    icon: BarChart3,
    color: "bg-white hover:bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
  },
];

export function QuickActions({ interests }: Props) {
  return (
    <div>
      <h2 className="text-lg font-heading font-semibold text-gray-800 mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.href} href={action.href}>
              <Card
                className={`card-hover cursor-pointer border ${
                  action.borderColor || "border-transparent"
                } ${action.featured ? action.color : ""}`}
              >
                <CardContent className="p-5 flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      action.featured
                        ? "bg-white/20"
                        : "bg-mist"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        action.featured ? "text-white" : action.textColor
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-semibold text-sm ${
                        action.featured ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {action.label}
                      {action.featured && (
                        <Sparkles className="w-4 h-4 inline ml-1 text-gold-400" />
                      )}
                    </h3>
                    <p
                      className={`text-xs mt-1 ${
                        action.featured
                          ? "text-green-200"
                          : "text-muted-foreground"
                      }`}
                    >
                      {action.description}
                    </p>
                  </div>
                  <ArrowRight
                    className={`w-5 h-5 flex-shrink-0 ${
                      action.featured ? "text-green-300" : "text-gray-300"
                    }`}
                  />
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}