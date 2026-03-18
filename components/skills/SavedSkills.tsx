// src/components/skills/SavedSkills.tsx
"use client";

import { useState, useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  removeSkillFromProfile,
  updateSkillStatus,
} from "@/actions/skills";
import { SKILL_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  Trash2,
  BookOpen,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Clock,
  Loader2,
  FolderOpen,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface Props {
  savedSkills: Array<{
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
  }>;
}

const STATUS_CONFIG = {
  interested: {
    label: "Interested",
    color: "bg-blue-100 text-blue-700",
    icon: Sparkles,
  },
  learning: {
    label: "Learning",
    color: "bg-amber-100 text-amber-700",
    icon: BookOpen,
  },
  completed: {
    label: "Completed",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle2,
  },
};

export function SavedSkills({ savedSkills }: Props) {
  const [isPending, startTransition] = useTransition();
  const [actionId, setActionId] = useState<string | null>(null);

  const handleRemove = (userSkillId: string) => {
    setActionId(userSkillId);
    startTransition(async () => {
      await removeSkillFromProfile(userSkillId);
      setActionId(null);
    });
  };

  const handleStatusChange = (
    userSkillId: string,
    newStatus: "interested" | "learning" | "completed"
  ) => {
    setActionId(userSkillId);
    startTransition(async () => {
      await updateSkillStatus(userSkillId, newStatus);
      setActionId(null);
    });
  };

  const getCategoryInfo = (category: string) => {
    return SKILL_CATEGORIES.find((c) => c.value === category);
  };

  if (savedSkills.length === 0) {
    return (
      <Card className="border-2 border-dashed border-gray-200">
        <CardContent className="p-8 md:p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FolderOpen className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-heading font-semibold text-gray-700">
            No skills saved yet
          </h3>
          <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
            Get AI recommendations and save the skills that interest you to
            start building your green skill profile.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Group by status
  const grouped = {
    learning: savedSkills.filter((s) => s.userSkill.status === "learning"),
    interested: savedSkills.filter((s) => s.userSkill.status === "interested"),
    completed: savedSkills.filter((s) => s.userSkill.status === "completed"),
  };

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        {Object.entries(STATUS_CONFIG).map(([status, config]) => {
          const count =
            grouped[status as keyof typeof grouped]?.length || 0;
          const Icon = config.icon;
          return (
            <Card
              key={status}
              className="border border-gray-100"
            >
              <CardContent className="p-3 text-center">
                <Icon className="w-5 h-5 mx-auto mb-1 text-gray-500" />
                <p className="text-xl font-bold text-gray-900">{count}</p>
                <p className="text-xs text-muted-foreground">{config.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Skills by Status */}
      {(["learning", "interested", "completed"] as const).map((status) => {
        const skills = grouped[status];
        if (skills.length === 0) return null;
        const config = STATUS_CONFIG[status];

        return (
          <div key={status}>
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <config.icon className="w-4 h-4" />
              {config.label} ({skills.length})
            </h3>
            <div className="space-y-3">
              {skills.map(({ userSkill, skill }) => {
                const catInfo = getCategoryInfo(skill.category);
                const isProcessing = actionId === userSkill.id && isPending;

                return (
                  <Card
                    key={userSkill.id}
                    className="border border-gray-100 card-hover"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-xs",
                                catInfo?.bgColor,
                                catInfo?.color
                              )}
                            >
                              {catInfo?.label || skill.category}
                            </Badge>
                            <Badge
                              className={cn("text-xs", config.color)}
                            >
                              {config.label}
                            </Badge>
                            {userSkill.recommendedByAi && (
                              <Badge
                                variant="outline"
                                className="text-xs border-blue-200 text-blue-600"
                              >
                                <Sparkles className="w-3 h-3 mr-1" />
                                AI Pick
                              </Badge>
                            )}
                          </div>

                          <h4 className="font-semibold text-gray-900 mt-2">
                            {skill.name}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {userSkill.aiRecommendationReason ||
                              skill.shortDescription ||
                              skill.description}
                          </p>

                          {/* Meta */}
                          <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                            {skill.estimatedDuration && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {skill.estimatedDuration}
                              </span>
                            )}
                            {skill.marketPotential && (
                              <span className="flex items-center gap-1">
                                📈 {skill.marketPotential} potential
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100">
                        {status === "interested" && (
                          <Button
                            size="sm"
                            className="bg-green-800 hover:bg-green-700 text-white"
                            onClick={() =>
                              handleStatusChange(userSkill.id, "learning")
                            }
                            disabled={isProcessing}
                          >
                            {isProcessing ? (
                              <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                            ) : (
                              <BookOpen className="w-4 h-4 mr-1.5" />
                            )}
                            Start Learning
                          </Button>
                        )}
                        {status === "learning" && (
                          <>
                            <Link href="/dashboard/learn">
                              <Button
                                size="sm"
                                className="bg-green-800 hover:bg-green-700 text-white"
                              >
                                <ArrowRight className="w-4 h-4 mr-1.5" />
                                Continue
                              </Button>
                            </Link>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-700 border-green-300"
                              onClick={() =>
                                handleStatusChange(
                                  userSkill.id,
                                  "completed"
                                )
                              }
                              disabled={isProcessing}
                            >
                              {isProcessing ? (
                                <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                              ) : (
                                <CheckCircle2 className="w-4 h-4 mr-1.5" />
                              )}
                              Mark Complete
                            </Button>
                          </>
                        )}
                        {status === "completed" && (
                          <Link href="/dashboard/business">
                            <Button
                              size="sm"
                              className="bg-gold-500 hover:bg-gold-600 text-green-900"
                            >
                              💡 Plan a Business
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </Link>
                        )}

                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 ml-auto"
                          onClick={() => handleRemove(userSkill.id)}
                          disabled={isProcessing}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}