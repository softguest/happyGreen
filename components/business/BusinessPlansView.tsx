// src/components/business/BusinessPlansView.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createBusinessPlan, deleteBusinessPlan } from "@/actions/business";
import { SKILL_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  Plus,
  Lightbulb,
  FileText,
  Pencil,
  Trash2,
  ChevronRight,
  Loader2,
  TrendingUp,
  Calendar,
  Sparkles,
  FolderOpen,
  CheckCircle2,
  Clock,
} from "lucide-react";

interface Plan {
  plan: {
    id: string;
    title: string;
    problemStatement: string | null;
    solution: string | null;
    targetCustomers: string | null;
    revenueModel: string | null;
    startupCostEstimate: number | null;
    monthlyRevenueEstimate: number | null;
    keyActivities: unknown;
    resourcesNeeded: unknown;
    challenges: unknown;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  };
  skill: {
    id: string;
    name: string;
    category: string;
  } | null;
}

interface UserSkill {
  userSkill: {
    id: string;
    skillId: string;
    status: string;
  };
  skill: {
    id: string;
    name: string;
    category: string;
  };
}

interface Props {
  plans: Plan[];
  userSkills: UserSkill[];
}

const STATUS_CONFIG = {
  draft: {
    label: "Draft",
    color: "bg-gray-100 text-gray-600",
    icon: Pencil,
  },
  in_progress: {
    label: "In Progress",
    color: "bg-amber-100 text-amber-700",
    icon: Clock,
  },
  completed: {
    label: "Completed",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle2,
  },
};

export function BusinessPlansView({ plans, userSkills }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [selectedSkillId, setSelectedSkillId] = useState<string>("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleCreate = () => {
    if (!newTitle.trim()) return;

    startTransition(async () => {
      const result = await createBusinessPlan({
        title: newTitle.trim(),
        skillId: selectedSkillId || undefined,
      });

      if (result.success && result.planId) {
        setShowNewDialog(false);
        setNewTitle("");
        setSelectedSkillId("");
        router.push(`/dashboard/business/${result.planId}`);
      }
    });
  };

  const handleDelete = (planId: string) => {
    setDeletingId(planId);
    startTransition(async () => {
      await deleteBusinessPlan(planId);
      setDeletingId(null);
    });
  };

  const getCompletionPercentage = (plan: Plan["plan"]) => {
    const sections = [
      plan.problemStatement,
      plan.solution,
      plan.targetCustomers,
      plan.revenueModel,
      plan.startupCostEstimate,
      plan.monthlyRevenueEstimate,
    ];
    const filled = sections.filter(Boolean).length;
    return Math.round((filled / sections.length) * 100);
  };

  const getCategoryInfo = (category: string) =>
    SKILL_CATEGORIES.find((c) => c.value === category);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">
            Green Business Planner
          </h1>
          <p className="text-muted-foreground mt-1">
            Create AI-guided business plans for your green skills
          </p>
        </div>
        <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
          <DialogTrigger>
            <Button className="bg-green-800 hover:bg-green-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Plan
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-gold-500" />
                Create New Business Plan
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="title">Business Idea Name *</Label>
                <Input
                  id="title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Eco-Compost Douala, Solar Light Solutions..."
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="skill">Related Green Skill (optional)</Label>
                <Select
                  value={selectedSkillId}
                  onValueChange={setSelectedSkillId}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Link to a skill you've learned" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No specific skill</SelectItem>
                    {userSkills.map(({ skill }) => (
                      <SelectItem key={skill.id} value={skill.id}>
                        {skill.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Linking a skill helps the AI give more specific advice
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowNewDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreate}
                disabled={!newTitle.trim() || isPending}
                className="bg-green-800 hover:bg-green-700 text-white"
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 mr-2" />
                )}
                Create Plan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Empty State */}
      {plans.length === 0 && (
        <Card className="border-2 border-dashed border-gray-200">
          <CardContent className="p-8 md:p-12 text-center">
            <div className="w-16 h-16 bg-gold-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-8 h-8 text-gold-600" />
            </div>
            <h3 className="text-xl font-heading font-bold text-gray-900">
              Start Your Green Business Journey
            </h3>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              Our AI will guide you step-by-step through creating a simple,
              practical business plan tailored to your skills and location.
            </p>
            <Button
              onClick={() => setShowNewDialog(true)}
              className="mt-6 bg-gold-500 hover:bg-gold-600 text-green-900 px-8"
              size="lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Plan
            </Button>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 text-left">
              {[
                {
                  icon: "🤖",
                  title: "AI-Guided",
                  desc: "AI generates each section based on your context",
                },
                {
                  icon: "💰",
                  title: "Cost Estimates",
                  desc: "Realistic startup costs and revenue projections in XAF",
                },
                {
                  icon: "📄",
                  title: "Export to PDF",
                  desc: "Download and share your plan with partners or funders",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="bg-mist rounded-xl p-4"
                >
                  <span className="text-2xl">{feature.icon}</span>
                  <h4 className="font-semibold text-gray-800 mt-2 text-sm">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Plans Grid */}
      {plans.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plans.map(({ plan, skill }) => {
            const statusConfig =
              STATUS_CONFIG[plan.status as keyof typeof STATUS_CONFIG] ||
              STATUS_CONFIG.draft;
            const StatusIcon = statusConfig.icon;
            const completion = getCompletionPercentage(plan);
            const catInfo = skill ? getCategoryInfo(skill.category) : null;

            return (
              <Card
                key={plan.id}
                className="border border-gray-100 card-hover group"
              >
                <CardContent className="p-5">
                  {/* Top Badges */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={cn("text-xs", statusConfig.color)}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {statusConfig.label}
                    </Badge>
                    {catInfo && (
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs",
                          catInfo.bgColor,
                          catInfo.color
                        )}
                      >
                        {catInfo.label}
                      </Badge>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-bold text-gray-900 mt-3 line-clamp-2">
                    {plan.title}
                  </h3>

                  {/* Skill */}
                  {skill && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Skill: {skill.name}
                    </p>
                  )}

                  {/* Summary snippet */}
                  {plan.solution && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {plan.solution}
                    </p>
                  )}

                  {/* Financial */}
                  {(plan.startupCostEstimate ||
                    plan.monthlyRevenueEstimate) && (
                    <div className="flex items-center gap-4 mt-3 text-xs">
                      {plan.startupCostEstimate && (
                        <span className="text-gray-500">
                          💰 Startup:{" "}
                          {plan.startupCostEstimate.toLocaleString()} XAF
                        </span>
                      )}
                      {plan.monthlyRevenueEstimate && (
                        <span className="text-green-600 font-medium">
                          📈{" "}
                          {plan.monthlyRevenueEstimate.toLocaleString()}{" "}
                          XAF/mo
                        </span>
                      )}
                    </div>
                  )}

                  {/* Completion */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-500">Plan completion</span>
                      <span className="font-medium text-gray-700">
                        {completion}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          completion === 100
                            ? "bg-green-500"
                            : completion > 50
                            ? "bg-amber-400"
                            : "bg-gray-300"
                        )}
                        style={{ width: `${completion}%` }}
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <p className="text-[10px] text-gray-400 mt-3 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Updated{" "}
                    {new Date(plan.updatedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                    <Link href={`/dashboard/business/${plan.id}`}>
                      <Button
                        size="sm"
                        className="bg-green-800 hover:bg-green-700 text-white"
                      >
                        <Pencil className="w-3.5 h-3.5 mr-1.5" />
                        {completion > 0 ? "Continue" : "Start"}
                      </Button>
                    </Link>

                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-400 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete this plan?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete &quot;{plan.title}&quot;
                            and all its content. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(plan.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            {deletingId === plan.id ? (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4 mr-2" />
                            )}
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* New Plan Card */}
          <Card
            className="border-2 border-dashed border-gray-200 hover:border-green-300 cursor-pointer transition-all group"
            onClick={() => setShowNewDialog(true)}
          >
            <CardContent className="p-5 flex flex-col items-center justify-center min-h-[240px] text-center">
              <div className="w-12 h-12 bg-gray-100 group-hover:bg-green-100 rounded-xl flex items-center justify-center transition-colors">
                <Plus className="w-6 h-6 text-gray-400 group-hover:text-green-700 transition-colors" />
              </div>
              <p className="text-sm font-medium text-gray-500 group-hover:text-green-700 mt-3 transition-colors">
                Create New Plan
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}