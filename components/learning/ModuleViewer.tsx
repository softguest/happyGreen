// src/components/learning/ModuleViewer.tsx
"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  startModule,
  completeModule,
  saveModuleNotes,
} from "@/actions/learning";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  ChevronRight,
  Loader2,
  Notebook,
  PlayCircle,
  Save,
  Trophy,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { PracticalTask } from "./PracticalTask";
import { ModuleContent } from "./ModuleContent";
import { QuizSection } from "./QuizSection";

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface ModuleNav {
  id: string;
  orderIndex: number;
  title: string;
}

interface ModuleProgressEntry {
  id: string;
  status: string;
  quizScore: number | null;
  quizAttempts: number | null;
  practicalTaskCompleted: boolean | null;
  notes: string | null;
  completedAt: Date | null;
}

interface Props {
  data: {
    module: {
      id: string;
      pathwayId: string;
      orderIndex: number;
      title: string;
      content: string;
      summary: string | null;
      practicalTask: string | null;
      durationMinutes: number | null;
      contentType: string;
      quizQuestions: unknown;
      resources: unknown;
    };
    pathway: {
      id: string;
      title: string;
      totalModules: number;
    };
    skill: {
      id: string;
      name: string;
      category: string;
    };
    progress: ModuleProgressEntry | null;
    allModules: ModuleNav[];
    allProgressMap: Record<string, ModuleProgressEntry>;
    prevModule: ModuleNav | null;
    nextModule: ModuleNav | null;
    profileId: string;
  };
}

type ViewSection = "content" | "quiz" | "task" | "notes";

export function ModuleViewer({ data }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeSection, setActiveSection] = useState<ViewSection>("content");
  const [notes, setNotes] = useState(data.progress?.notes || "");
  const [notesSaved, setNotesSaved] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(
    data.progress?.quizScore ?? null
  );
  const [taskCompleted, setTaskCompleted] = useState(
    data.progress?.practicalTaskCompleted ?? false
  );
  const [isCompleted, setIsCompleted] = useState(
    data.progress?.status === "completed"
  );

  const {
    module: mod,
    pathway,
    skill,
    allModules,
    allProgressMap,
    prevModule,
    nextModule,
  } = data;

  const quizQuestions = (mod.quizQuestions as QuizQuestion[]) || [];
  const hasQuiz = quizQuestions.length > 0;
  const hasTask = !!mod.practicalTask;

  // Track reading — mark as in_progress when page loads
  useEffect(() => {
    if (!data.progress || data.progress.status === "not_started") {
      startModule(pathway.id, mod.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Overall progress
  const totalCompleted = Object.values(allProgressMap).filter(
    (p) => p.status === "completed"
  ).length;
  const overallProgress =
    pathway.totalModules > 0
      ? Math.round(
          ((totalCompleted + (isCompleted ? 0 : 0)) / pathway.totalModules) *
            100
        )
      : 0;

  const canComplete = (): boolean => {
    if (isCompleted) return false;
    if (hasQuiz && quizScore === null && !quizCompleted) return false;
    return true;
  };

  const handleCompleteModule = () => {
    startTransition(async () => {
      const result = await completeModule(pathway.id, mod.id, {
        quizScore: quizScore ?? undefined,
        quizAttempts: data.progress?.quizAttempts
          ? (data.progress.quizAttempts) + 1
          : 1,
        practicalTaskCompleted: taskCompleted,
        notes: notes || undefined,
      });

      if (result.success) {
        setIsCompleted(true);
      }
    });
  };

  const handleSaveNotes = async () => {
    await saveModuleNotes(pathway.id, mod.id, notes);
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  };

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
    setQuizCompleted(true);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between mb-4">
        <Link href={`/dashboard/learn/${pathway.id}`}>
          <Button variant="ghost" size="sm" className="text-gray-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {pathway.title}
          </Button>
        </Link>
        <span className="text-xs text-muted-foreground hidden sm:block">
          Module {mod.orderIndex} of {pathway.totalModules}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ====== SIDEBAR — Module Navigation ====== */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <Card className="border border-gray-100 sticky top-24">
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Modules
              </h3>
              <nav className="space-y-1">
                {allModules.map((m) => {
                  const mProgress = allProgressMap[m.id];
                  const mStatus = mProgress?.status || "not_started";
                  const isCurrent = m.id === mod.id;

                  return (
                    <Link
                      key={m.id}
                      href={`/dashboard/learn/${pathway.id}/${m.id}`}
                    >
                      <div
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all",
                          isCurrent
                            ? "bg-green-100 text-green-800 font-medium"
                            : "text-gray-600 hover:bg-gray-50"
                        )}
                      >
                        {mStatus === "completed" ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                        ) : isCurrent ? (
                          <PlayCircle className="w-4 h-4 text-green-700 flex-shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-gray-300 flex-shrink-0" />
                        )}
                        <span className="line-clamp-1">{m.title}</span>
                      </div>
                    </Link>
                  );
                })}
              </nav>

              {/* Overall Progress */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-500">Progress</span>
                  <span className="text-green-700 font-bold">
                    {overallProgress}%
                  </span>
                </div>
                <Progress value={overallProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* ====== MAIN CONTENT ====== */}
        <main className="flex-1 min-w-0">
          {/* Module Header */}
          <Card className="border-0 bg-green-800 text-white mb-6">
            <CardContent className="p-5 md:p-6">
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant="outline"
                  className="border-white/30 text-white/80 text-xs"
                >
                  Module {mod.orderIndex}
                </Badge>
                {mod.durationMinutes && (
                  <Badge
                    variant="outline"
                    className="border-white/30 text-white/80 text-xs"
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    {mod.durationMinutes} min
                  </Badge>
                )}
                {isCompleted && (
                  <Badge className="bg-white/20 text-white text-xs">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
              <h1 className="text-xl md:text-2xl font-heading font-bold">
                {mod.title}
              </h1>
              {mod.summary && (
                <p className="text-green-200 text-sm mt-2">{mod.summary}</p>
              )}
            </CardContent>
          </Card>

          {/* Section Tabs */}
          <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
            <TabButton
              active={activeSection === "content"}
              onClick={() => setActiveSection("content")}
              icon={<BookOpen className="w-4 h-4" />}
              label="Lesson"
            />
            {hasQuiz && (
              <TabButton
                active={activeSection === "quiz"}
                onClick={() => setActiveSection("quiz")}
                icon={<Sparkles className="w-4 h-4" />}
                label="Quiz"
                badge={
                  quizScore !== null
                    ? `${quizScore}%`
                    : undefined
                }
              />
            )}
            {hasTask && (
              <TabButton
                active={activeSection === "task"}
                onClick={() => setActiveSection("task")}
                icon={
                  taskCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <span className="text-sm">🔨</span>
                  )
                }
                label="Task"
              />
            )}
            <TabButton
              active={activeSection === "notes"}
              onClick={() => setActiveSection("notes")}
              icon={<Notebook className="w-4 h-4" />}
              label="Notes"
            />
          </div>

          {/* Section Content */}
          {activeSection === "content" && (
            <ModuleContent content={mod.content} />
          )}

          {activeSection === "quiz" && hasQuiz && (
            <QuizSection
              questions={quizQuestions}
              previousScore={quizScore}
              onComplete={handleQuizComplete}
            />
          )}

          {activeSection === "task" && hasTask && (
            <PracticalTask
              task={mod.practicalTask!}
              completed={taskCompleted}
              onToggle={() => setTaskCompleted(!taskCompleted)}
            />
          )}

          {activeSection === "notes" && (
            <Card className="border border-gray-100">
              <CardContent className="p-5">
                <h3 className="font-heading font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Notebook className="w-5 h-5 text-green-700" />
                  My Notes
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Write down key takeaways, ideas, or action plans from this
                  module.
                </p>
                <Textarea
                  value={notes}
                  onChange={(e) => {
                    setNotes(e.target.value);
                    setNotesSaved(false);
                  }}
                  placeholder="What did you learn? What will you try?"
                  rows={6}
                  className="resize-none"
                />
                <div className="flex items-center gap-3 mt-3">
                  <Button
                    onClick={handleSaveNotes}
                    size="sm"
                    variant="outline"
                    className="text-green-700 border-green-300"
                  >
                    <Save className="w-4 h-4 mr-1.5" />
                    Save Notes
                  </Button>
                  {notesSaved && (
                    <span className="text-xs text-green-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Saved!
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* ====== COMPLETION BAR ====== */}
          <Separator className="my-6" />

          <Card
            className={cn(
              "border",
              isCompleted
                ? "border-green-200 bg-green-50"
                : "border-gray-100"
            )}
          >
            <CardContent className="p-5">
              {isCompleted ? (
                <div className="text-center">
                  <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto mb-2" />
                  <h3 className="font-heading font-bold text-green-800">
                    Module Completed! 🎉
                  </h3>
                  <p className="text-sm text-green-700 mt-1">
                    You earned <strong>20 points</strong> for this module.
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="font-heading font-semibold text-gray-900 mb-2">
                    Ready to complete this module?
                  </h3>

                  {/* Checklist */}
                  <div className="space-y-2 mb-4">
                    <ChecklistItem
                      done={true}
                      label="Read the lesson content"
                    />
                    {hasQuiz && (
                      <ChecklistItem
                        done={quizScore !== null}
                        label={
                          quizScore !== null
                            ? `Quiz completed (${quizScore}%)`
                            : "Complete the quiz"
                        }
                      />
                    )}
                    {hasTask && (
                      <ChecklistItem
                        done={taskCompleted}
                        label="Mark practical task as done (optional)"
                      />
                    )}
                  </div>

                  <Button
                    onClick={handleCompleteModule}
                    disabled={!canComplete() || isPending}
                    className="bg-green-800 hover:bg-green-700 text-white w-full sm:w-auto"
                  >
                    {isPending ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                    )}
                    Complete Module & Earn 20 Points
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            {prevModule ? (
              <Link
                href={`/dashboard/learn/${pathway.id}/${prevModule.id}`}
              >
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">
                    {prevModule.title}
                  </span>
                  <span className="sm:hidden">Previous</span>
                </Button>
              </Link>
            ) : (
              <div />
            )}

            {nextModule ? (
              <Link
                href={`/dashboard/learn/${pathway.id}/${nextModule.id}`}
              >
                <Button
                  className="bg-green-800 hover:bg-green-700 text-white"
                  size="sm"
                >
                  <span className="hidden sm:inline">
                    {nextModule.title}
                  </span>
                  <span className="sm:hidden">Next</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            ) : (
              <Link href={`/dashboard/learn/${pathway.id}`}>
                <Button
                  className="bg-gold-500 hover:bg-gold-600 text-green-900"
                  size="sm"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  Back to Pathway
                </Button>
              </Link>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

// ============================================
// Sub-components
// ============================================

function TabButton({
  active,
  onClick,
  icon,
  label,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  badge?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-all whitespace-nowrap",
        active
          ? "border-green-700 text-green-800"
          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
      )}
    >
      {icon}
      {label}
      {badge && (
        <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-bold">
          {badge}
        </span>
      )}
    </button>
  );
}

function ChecklistItem({ done, label }: { done: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {done ? (
        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
      ) : (
        <Circle className="w-4 h-4 text-gray-300 flex-shrink-0" />
      )}
      <span className={done ? "text-green-700" : "text-gray-600"}>
        {label}
      </span>
    </div>
  );
}