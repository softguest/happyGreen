// src/components/admin/AdminPathwaysView.tsx
"use client";

import { useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { togglePathwayPublish } from "@/actions/admin";
import { SKILL_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Users,
  Layers,
  Eye,
  EyeOff,
  CheckCircle2,
  Clock,
  Loader2,
} from "lucide-react";

interface PathwayWithStats {
  pathway: {
    id: string;
    title: string;
    description: string;
    estimatedHours: number | null;
    totalModules: number;
    difficulty: string;
    isPublished: boolean;
    createdAt: Date;
  };
  skill: {
    id: string;
    name: string;
    category: string;
  };
  moduleCount: number;
  enrolledUsers: number;
  completedModules: number;
}

interface Props {
  pathways: PathwayWithStats[];
}

export function AdminPathwaysView({ pathways }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleTogglePublish = (pathwayId: string) => {
    startTransition(async () => {
      await togglePathwayPublish(pathwayId);
    });
  };

  const getCategoryInfo = (category: string) =>
    SKILL_CATEGORIES.find((c) => c.value === category);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-gray-900">
          Pathways Management
        </h1>
        <p className="text-muted-foreground mt-1">
          {pathways.length} pathways · {pathways.filter((p) => p.pathway.isPublished).length}{" "}
          published
        </p>
      </div>

      {/* Pathways Table */}
      <Card className="border border-gray-100">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Pathway</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Skill</th>
                  <th className="text-center px-4 py-3 text-gray-600 font-medium">Modules</th>
                  <th className="text-center px-4 py-3 text-gray-600 font-medium">Enrolled</th>
                  <th className="text-center px-4 py-3 text-gray-600 font-medium">Completions</th>
                  <th className="text-center px-4 py-3 text-gray-600 font-medium">Status</th>
                  <th className="text-right px-4 py-3 text-gray-600 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {pathways.map((item) => {
                  const catInfo = getCategoryInfo(item.skill.category);
                  return (
                    <tr key={item.pathway.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900 line-clamp-1">
                          {item.pathway.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge
                            className={cn(
                              "text-[10px]",
                              item.pathway.difficulty === "beginner"
                                ? "bg-green-100 text-green-700"
                                : item.pathway.difficulty === "intermediate"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-red-100 text-red-700"
                            )}
                          >
                            {item.pathway.difficulty}
                          </Badge>
                          {item.pathway.estimatedHours && (
                            <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                              <Clock className="w-3 h-3" />
                              {item.pathway.estimatedHours}h
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={cn("text-[10px]", catInfo?.bgColor, catInfo?.color)}>
                          {item.skill.name.substring(0, 25)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Layers className="w-3 h-3 text-gray-400" />
                          <span className="font-medium">{item.moduleCount}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Users className="w-3 h-3 text-gray-400" />
                          <span className="font-medium">{item.enrolledUsers}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-green-500" />
                          <span className="font-medium">{item.completedModules}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {item.pathway.isPublished ? (
                          <Badge className="text-[10px] bg-green-100 text-green-700">
                            Published
                          </Badge>
                        ) : (
                          <Badge className="text-[10px] bg-gray-100 text-gray-500">
                            Draft
                          </Badge>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTogglePublish(item.pathway.id)}
                          disabled={isPending}
                          className="text-xs"
                        >
                          {isPending ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : item.pathway.isPublished ? (
                            <>
                              <EyeOff className="w-3.5 h-3.5 mr-1" />
                              Unpublish
                            </>
                          ) : (
                            <>
                              <Eye className="w-3.5 h-3.5 mr-1" />
                              Publish
                            </>
                          )}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}