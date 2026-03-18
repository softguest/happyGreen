// src/components/learning/PathwayDetail.tsx
"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { enrollInPathway } from "@/actions/learning";
import { SKILL_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  GraduationCap,
  Layers,
  Loader2,
  Lock,
  PlayCircle,
  Trophy,
  ChevronRight,
} from "lucide-react";

interface ModuleProgressData {
  id: string;
  userId: string;
  moduleId: string;
  pathwayId: string;
  status: string;
  quizScore: number | null;
  completedAt: Date | null;
}

interface Props {
  data: {
    pathway: {
      id: string;
      title: string;
      description: string;
      estimatedHours: number | null;
      totalModules: number;
      difficulty: string;
      learningOutcomes: unknown;
      prerequisites: unknown;
    };
    skill: {
      id: string;
      name: string;
      category: string;
    };
    modules: Array<{
      id: string;
      pathwayId: string;
      orderIndex: number;
      title: string;
      summary: string | null;
      durationMinutes: number | null;
      contentType: string;
      practicalTask: string | null;
      quizQuestions: unknown;
    }>;
    progressMap: Record<string, ModuleProgressData>;
    profileId: string;
  };
}

export function PathwayDetail({ data }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { pathway, skill, modules, progressMap } = data;

  const completedCount = Object.values(progressMap).filter(
    (p) => p.status === "completed"
  ).length;
  const progressPercent =
    pathway.totalModules > 0
      ? Math.round((completedCount / pathway.totalModules) * 100)
      : 0;
  const isCompleted = completedCount >= pathway.totalModules && pathway.totalModules > 0;
  const hasStarted = Object.keys(progressMap).length > 0;

  const catInfo = SKILL_CATEGORIES.find((c) => c.value === skill.category);
  const outcomes = (pathway.learningOutcomes as string[]) || [];
  const prerequisites = (pathway.prerequisites as string[]) || [];

  const handleEnroll = () => {
    startTransition(async () => {
      const result = await enrollInPathway(pathway.id);
      if (result.success && result.firstModuleId) {
        router.push(
          `/dashboard/learn/${pathway.id}/${result.firstModuleId}`
        );
      } else {
        router.refresh();
      }
    });
  };

  const getModuleStatus = (moduleId: string) => {
    return progressMap[moduleId]?.status || "not_started";
  };

  const getStatusIcon = (status: string, index: number) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-6 h-6 text-green-600" />;
      case "in_progress":
        return <PlayCircle className="w-6 h-6 text-amber-500" />;
      default:
        // If previous module is completed or it's the first and user enrolled
        if (hasStarted) {
          const prevModule = modules[index - 1];
          if (
            index === 0 ||
            (prevModule && getModuleStatus(prevModule.id) === "completed")
          ) {
            return <Circle className="w-6 h-6 text-gray-400" />;
          }
          return <Lock className="w-6 h-6 text-gray-300" />;
        }
        return <Circle className="w-6 h-6 text-gray-300" />;
    }
  };

  const canAccessModule = (index: number): boolean => {
    if (!hasStarted) return false;
    if (index === 0) return true;
    const prevModule = modules[index - 1];
    if (!prevModule) return true;
    const prevStatus = getModuleStatus(prevModule.id);
    return prevStatus === "completed";
  };

  // Find the next module to study
  const nextModuleIndex = modules.findIndex((m) => {
    const status = getModuleStatus(m.id);
    return status !== "completed";
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <Link href="/dashboard/learn">
        <Button variant="ghost" size="sm" className="text-gray-600">
          <ArrowLeft className="w-4 h-4 mr-2" />
          All Pathways
        </Button>
      </Link>

      {/* Header Card */}
      <Card
        className={cn(
          "border-0 overflow-hidden",
          isCompleted ? "gradient-gold" : "gradient-green"
        )}
      >
        <CardContent className="p-6 md:p-8 text-white">
          <div className="flex items-center gap-2 mb-3">
            <Badge
              variant="outline"
              className="border-white/30 text-white/90 text-xs"
            >
              {catInfo?.label || skill.category}
            </Badge>
            <Badge
              variant="outline"
              className="border-white/30 text-white/90 text-xs"
            >
              {pathway.difficulty}
            </Badge>
            {isCompleted && (
              <Badge className="bg-white/20 text-white text-xs">
                <Trophy className="w-3 h-3 mr-1" />
                Completed!
              </Badge>
            )}
          </div>

          <h1
            className={cn(
              "text-2xl md:text-3xl font-heading font-bold",
              isCompleted ? "text-green-900" : "text-white"
            )}
          >
            {pathway.title}
          </h1>
          <p
            className={cn(
              "mt-2 max-w-2xl",
              isCompleted ? "text-green-800" : "text-green-100"
            )}
          >
            {pathway.description}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
            <span
              className={cn(
                "flex items-center gap-1.5",
                isCompleted ? "text-green-800" : "text-green-200"
              )}
            >
              <Layers className="w-4 h-4" />
              {pathway.totalModules} modules
            </span>
            {pathway.estimatedHours && (
              <span
                className={cn(
                  "flex items-center gap-1.5",
                  isCompleted ? "text-green-800" : "text-green-200"
                )}
              >
                <Clock className="w-4 h-4" />
                ~{pathway.estimatedHours} hours
              </span>
            )}
            <span
              className={cn(
                "flex items-center gap-1.5",
                isCompleted ? "text-green-800" : "text-green-200"
              )}
            >
              <GraduationCap className="w-4 h-4" />
              {skill.name}
            </span>
          </div>

          {/* Progress */}
          {hasStarted && (
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span
                  className={
                    isCompleted ? "text-green-800" : "text-green-200"
                  }
                >
                  {completedCount}/{pathway.totalModules} modules completed
                </span>
                <span
                  className={cn(
                    "font-bold",
                    isCompleted ? "text-green-900" : "text-white"
                  )}
                >
                  {progressPercent}%
                </span>
              </div>
              <Progress
                value={progressPercent}
                className={cn(
                  "h-3",
                  isCompleted ? "bg-green-200" : "bg-green-700"
                )}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Learning Outcomes + Prerequisites */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {outcomes.length > 0 && (
          <Card className="border border-gray-100">
            <CardContent className="p-5">
              <h3 className="font-heading font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-green-700" />
                What You&apos;ll Learn
              </h3>
              <ul className="space-y-2">
                {outcomes.map((outcome, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {prerequisites.length > 0 && (
          <Card className="border border-gray-100">
            <CardContent className="p-5">
              <h3 className="font-heading font-semibold text-gray-900 mb-3">
                📋 Prerequisites
              </h3>
              <ul className="space-y-2">
                {prerequisites.map((prereq, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <span className="text-amber-500">•</span>
                    {prereq}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Enroll / Continue Button */}
      {!hasStarted && (
        <Card className="border-2 border-dashed border-green-300 bg-green-50/50">
          <CardContent className="p-6 text-center">
            <h3 className="font-heading font-semibold text-gray-900">
              Ready to start learning?
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Enroll to unlock all {pathway.totalModules} modules and track your
              progress.
            </p>
            <Button
              onClick={handleEnroll}
              disabled={isPending}
              className="mt-4 bg-green-800 hover:bg-green-700 text-white px-8"
              size="lg"
            >
              {isPending ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <PlayCircle className="w-5 h-5 mr-2" />
              )}
              Start Learning
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Module List */}
      <div>
        <h2 className="text-lg font-heading font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-green-700" />
          Course Modules
        </h2>

        <div className="space-y-3">
          {modules.map((module, index) => {
            const status = getModuleStatus(module.id);
            const accessible = canAccessModule(index);
            const isNext = index === nextModuleIndex && hasStarted;
            const quizCount = (
              module.quizQuestions as Array<unknown> | null
            )?.length || 0;

            return (
              <div key={module.id} className="relative">
                {/* Connector Line */}
                {index < modules.length - 1 && (
                  <div
                    className={cn(
                      "absolute left-[19px] top-[48px] w-0.5 h-[calc(100%-16px)]",
                      status === "completed" ? "bg-green-300" : "bg-gray-200"
                    )}
                  />
                )}

                {accessible || status === "completed" ? (
                  <Link
                    href={`/dashboard/learn/${pathway.id}/${module.id}`}
                  >
                    <ModuleCard
                      module={module}
                      index={index}
                      status={status}
                      isNext={isNext}
                      quizCount={quizCount}
                      statusIcon={getStatusIcon(status, index)}
                      accessible
                    />
                  </Link>
                ) : (
                  <ModuleCard
                    module={module}
                    index={index}
                    status={status}
                    isNext={false}
                    quizCount={quizCount}
                    statusIcon={getStatusIcon(status, index)}
                    accessible={false}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Completion Card */}
      {isCompleted && (
        <Card className="border-gold-300 bg-gold-50">
          <CardContent className="p-6 text-center">
            <Trophy className="w-12 h-12 text-gold-500 mx-auto mb-3" />
            <h3 className="text-xl font-heading font-bold text-gray-900">
              Pathway Complete! 🎉
            </h3>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              Congratulations! You&apos;ve completed all modules. You earned{" "}
              <strong>100 bonus points</strong> and the{" "}
              <strong>Pathway Pioneer</strong> badge.
            </p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <Link href="/dashboard/business">
                <Button className="bg-gold-500 hover:bg-gold-600 text-green-900">
                  💡 Plan a Business
                </Button>
              </Link>
              <Link href="/dashboard/learn">
                <Button variant="outline">Explore More Pathways</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ============================================
// Module Card Sub-Component
// ============================================
function ModuleCard({
  module,
  index,
  status,
  isNext,
  quizCount,
  statusIcon,
  accessible,
}: {
  module: {
    id: string;
    title: string;
    summary: string | null;
    durationMinutes: number | null;
    contentType: string;
    practicalTask: string | null;
  };
  index: number;
  status: string;
  isNext: boolean;
  quizCount: number;
  statusIcon: React.ReactNode;
  accessible: boolean;
}) {
  return (
    <Card
      className={cn(
        "border transition-all",
        status === "completed"
          ? "border-green-200 bg-green-50/30"
          : isNext
          ? "border-green-400 bg-green-50/50 shadow-sm ring-2 ring-green-200"
          : accessible
          ? "border-gray-200 hover:border-green-200 hover:shadow-sm cursor-pointer"
          : "border-gray-100 bg-gray-50/50 opacity-60"
      )}
    >
      <CardContent className="p-4 flex items-center gap-4">
        {/* Status Icon */}
        <div className="flex-shrink-0">{statusIcon}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-medium">
              Module {index + 1}
            </span>
            {isNext && (
              <Badge className="text-[10px] bg-green-600 text-white px-1.5 py-0">
                UP NEXT
              </Badge>
            )}
            {status === "completed" && (
              <Badge className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0">
                DONE
              </Badge>
            )}
          </div>
          <h4 className="font-medium text-gray-900 mt-0.5 text-sm">
            {module.title}
          </h4>
          {module.summary && (
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
              {module.summary}
            </p>
          )}

          {/* Tags */}
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
            {module.durationMinutes && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {module.durationMinutes} min
              </span>
            )}
            {quizCount > 0 && (
              <span>📝 {quizCount} quiz question{quizCount > 1 ? "s" : ""}</span>
            )}
            {module.practicalTask && <span>🔨 Practical task</span>}
          </div>
        </div>

        {/* Arrow */}
        {accessible && (
          <ChevronRight
            className={cn(
              "w-5 h-5 flex-shrink-0",
              status === "completed"
                ? "text-green-400"
                : "text-gray-300"
            )}
          />
        )}
      </CardContent>
    </Card>
  );
}