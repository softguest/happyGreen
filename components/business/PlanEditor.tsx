// src/components/business/PlanEditor.tsx
"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateBusinessPlan } from "@/actions/business";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Sparkles,
  Loader2,
  Save,
  CheckCircle2,
  FileText,
  Download,
  MessageCircle,
  Target,
  Users,
  DollarSign,
  Wrench,
  AlertTriangle,
  ListChecks,
  TrendingUp,
  Star,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { PlanPDFExport } from "./PlanPDFExport";
import { AISectionGenerator } from "./AISectionGenerator";
import { PlanReview } from "./PlanReview";
import { PlanChat } from "./PlanChat";
interface PlanData {
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
    aiSuggestions: unknown;
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

interface Props {
  data: PlanData;
  profileContext: {
    fullName: string;
    region: string | null;
    city: string | null;
    currentSituation: string | null;
    interests: string[];
    availableResources: string[];
  } | null;
}

interface PlanSection {
  key: string;
  label: string;
  icon: React.ReactNode;
  type: "text" | "number" | "list";
  placeholder: string;
  helpText: string;
  aiSection: string;
}

const PLAN_SECTIONS: PlanSection[] = [
  {
    key: "problemStatement",
    label: "Problem Statement",
    icon: <Target className="w-5 h-5 text-red-500" />,
    type: "text",
    placeholder: "What environmental or community problem does your business solve?",
    helpText: "Describe the specific problem in your area that your business will address.",
    aiSection: "problemStatement",
  },
  {
    key: "solution",
    label: "Your Solution",
    icon: <Sparkles className="w-5 h-5 text-green-600" />,
    type: "text",
    placeholder: "How does your product or service solve this problem?",
    helpText: "Explain your product/service and how it addresses the problem.",
    aiSection: "solution",
  },
  {
    key: "targetCustomers",
    label: "Target Customers",
    icon: <Users className="w-5 h-5 text-blue-600" />,
    type: "text",
    placeholder: "Who will buy your product or service?",
    helpText: "Describe your ideal customers — who they are, where they are, why they'd buy.",
    aiSection: "targetCustomers",
  },
  {
    key: "revenueModel",
    label: "Revenue Model",
    icon: <DollarSign className="w-5 h-5 text-gold-600" />,
    type: "text",
    placeholder: "How will you make money?",
    helpText: "What you sell, pricing in XAF, how often customers buy.",
    aiSection: "revenueModel",
  },
];

export function PlanEditor({ data, profileContext }: Props) {
  const [isPending, startTransition] = useTransition();
  const [activeView, setActiveView] = useState<"edit" | "review" | "chat">("edit");
  const [expandedSection, setExpandedSection] = useState<string | null>("problemStatement");
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: data.plan.title,
    problemStatement: data.plan.problemStatement || "",
    solution: data.plan.solution || "",
    targetCustomers: data.plan.targetCustomers || "",
    revenueModel: data.plan.revenueModel || "",
    startupCostEstimate: data.plan.startupCostEstimate || 0,
    monthlyRevenueEstimate: data.plan.monthlyRevenueEstimate || 0,
    keyActivities: (data.plan.keyActivities as string[]) || [],
    resourcesNeeded: (data.plan.resourcesNeeded as string[]) || [],
    challenges: (data.plan.challenges as string[]) || [],
  });

  const updateField = (key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setSaveMessage(null);
  };

  const handleSave = (status?: "draft" | "in_progress" | "completed") => {
    startTransition(async () => {
      const updateData: Record<string, unknown> = { ...formData };
      if (status) updateData.status = status;

      // Auto-detect status based on completion
      if (!status) {
        const hasContent =
          formData.problemStatement ||
          formData.solution ||
          formData.targetCustomers;
        const isComplete =
          formData.problemStatement &&
          formData.solution &&
          formData.targetCustomers &&
          formData.revenueModel &&
          formData.startupCostEstimate;

        updateData.status = isComplete
          ? "completed"
          : hasContent
          ? "in_progress"
          : "draft";
      }

      const result = await updateBusinessPlan(data.plan.id, updateData as any);
      if (result.success) {
        setSaveMessage("Saved successfully!");
        setTimeout(() => setSaveMessage(null), 3000);
      }
    });
  };

  const handleAIContent = (section: string, content: string) => {
    // Handle special sections that return JSON arrays
    if (
      section === "keyActivities" ||
      section === "resourcesNeeded" ||
      section === "challenges"
    ) {
      try {
        const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[1]);
          if (Array.isArray(parsed)) {
            updateField(section, parsed);
            return;
          }
        }
      } catch {
        // Fall through to text handling
      }
    }

    // Handle cost/revenue extraction
    if (section === "startupCost") {
      const totalMatch = content.match(/TOTAL:\s*(\d[\d,]*)/);
      if (totalMatch) {
        const amount = parseInt(totalMatch[1].replace(/,/g, ""));
        updateField("startupCostEstimate", amount);
      }
      // Also save the breakdown as part of revenue model or as note
      return;
    }

    if (section === "monthlyRevenue") {
      const monthlyMatch = content.match(/MONTHLY:\s*(\d[\d,]*)/);
      if (monthlyMatch) {
        const amount = parseInt(monthlyMatch[1].replace(/,/g, ""));
        updateField("monthlyRevenueEstimate", amount);
      }
      return;
    }

    updateField(section, content);
  };

  const getCompletionPercentage = () => {
    const sections = [
      formData.problemStatement,
      formData.solution,
      formData.targetCustomers,
      formData.revenueModel,
      formData.startupCostEstimate,
      formData.monthlyRevenueEstimate,
    ];
    const filled = sections.filter(Boolean).length;
    return Math.round((filled / sections.length) * 100);
  };

  const completion = getCompletionPercentage();

  const getExistingSections = () => ({
    "Problem Statement": formData.problemStatement,
    Solution: formData.solution,
    "Target Customers": formData.targetCustomers,
    "Revenue Model": formData.revenueModel,
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4">
        <Link href="/dashboard/business">
          <Button variant="ghost" size="sm" className="text-gray-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            All Plans
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          {saveMessage && (
            <span className="text-xs text-green-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {saveMessage}
            </span>
          )}
          <PlanPDFExport plan={{ ...formData, id: data.plan.id }} skillName={data.skill?.name} />
          <Button
            onClick={() => handleSave()}
            disabled={isPending}
            className="bg-green-800 hover:bg-green-700 text-white"
            size="sm"
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-1.5" />
            )}
            Save
          </Button>
        </div>
      </div>

      {/* Plan Header */}
      <Card className="border-0 bg-green-800 gradient-green text-white">
        <CardContent className="p-5 md:p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Input
                value={formData.title}
                onChange={(e) => updateField("title", e.target.value)}
                className="bg-transparent border-none text-2xl font-heading font-bold text-white placeholder:text-green-300 p-0 h-auto focus-visible:ring-0"
                placeholder="Business Name"
              />
              {data.skill && (
                <p className="text-green-200 text-sm mt-1">
                  Based on: {data.skill.name}
                </p>
              )}
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-green-200 text-xs">Completion</p>
              <p className="text-2xl font-bold">{completion}%</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 h-2 bg-green-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gold-400 rounded-full transition-all duration-500"
              style={{ width: `${completion}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* View Toggle */}
      <div className="flex border-b border-gray-200 overflow-x-auto">
        <button
          onClick={() => setActiveView("edit")}
          className={cn(
            "flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-all whitespace-nowrap",
            activeView === "edit"
              ? "border-green-700 text-green-800"
              : "border-transparent text-gray-500 hover:text-gray-700"
          )}
        >
          <FileText className="w-4 h-4" />
          Edit Plan
        </button>
        <button
          onClick={() => setActiveView("review")}
          className={cn(
            "flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-all whitespace-nowrap",
            activeView === "review"
              ? "border-green-700 text-green-800"
              : "border-transparent text-gray-500 hover:text-gray-700"
          )}
        >
          <Star className="w-4 h-4" />
          AI Review
        </button>
        <button
          onClick={() => setActiveView("chat")}
          className={cn(
            "flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-all whitespace-nowrap",
            activeView === "chat"
              ? "border-green-700 text-green-800"
              : "border-transparent text-gray-500 hover:text-gray-700"
          )}
        >
          <MessageCircle className="w-4 h-4" />
          Ask AI
        </button>
      </div>

      {/* ====== EDIT VIEW ====== */}
      {activeView === "edit" && (
        <div className="space-y-4">
          {/* Text Sections */}
          {PLAN_SECTIONS.map((section) => {
            const value = formData[section.key as keyof typeof formData] as string;
            const isExpanded = expandedSection === section.key;
            const hasContent = !!value;

            return (
              <Card
                key={section.key}
                className={cn(
                  "border transition-all",
                  hasContent
                    ? "border-green-200"
                    : "border-gray-200"
                )}
              >
                <CardContent className="p-0">
                  {/* Section Header */}
                  <button
                    onClick={() =>
                      setExpandedSection(isExpanded ? null : section.key)
                    }
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {section.icon}
                      <div className="text-left">
                        <h3 className="font-semibold text-gray-900 text-sm">
                          {section.label}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {section.helpText}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {hasContent && (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      )}
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-gray-100">
                      <div className="mt-4">
                        <Textarea
                          value={value}
                          onChange={(e) =>
                            updateField(section.key, e.target.value)
                          }
                          placeholder={section.placeholder}
                          rows={6}
                          className="resize-none"
                        />
                      </div>

                      {/* AI Generate Button */}
                      <div className="mt-3">
                        <AISectionGenerator
                          section={section.aiSection}
                          planContext={{
                            title: formData.title,
                            skillName: data.skill?.name,
                            existingSections: getExistingSections(),
                          }}
                          onGenerated={(content) =>
                            handleAIContent(section.key, content)
                          }
                          currentContent={value}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}

          {/* Financial Section */}
          <Card className="border border-gray-200">
            <CardContent className="p-0">
              <button
                onClick={() =>
                  setExpandedSection(
                    expandedSection === "financials" ? null : "financials"
                  )
                }
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      Financial Estimates
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Startup costs and revenue projections
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {(formData.startupCostEstimate > 0 ||
                    formData.monthlyRevenueEstimate > 0) && (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  )}
                  {expandedSection === "financials" ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              {expandedSection === "financials" && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label className="text-sm">
                        Estimated Startup Cost (XAF)
                      </Label>
                      <Input
                        type="number"
                        value={formData.startupCostEstimate || ""}
                        onChange={(e) =>
                          updateField(
                            "startupCostEstimate",
                            parseInt(e.target.value) || 0
                          )
                        }
                        placeholder="e.g., 50000"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm">
                        Estimated Monthly Revenue (XAF)
                      </Label>
                      <Input
                        type="number"
                        value={formData.monthlyRevenueEstimate || ""}
                        onChange={(e) =>
                          updateField(
                            "monthlyRevenueEstimate",
                            parseInt(e.target.value) || 0
                          )
                        }
                        placeholder="e.g., 100000"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* AI Financial Helpers */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <AISectionGenerator
                      section="startupCost"
                      planContext={{
                        title: formData.title,
                        skillName: data.skill?.name,
                        existingSections: getExistingSections(),
                      }}
                      onGenerated={(content) =>
                        handleAIContent("startupCost", content)
                      }
                      label="Estimate Startup Costs"
                      variant="outline"
                    />
                    <AISectionGenerator
                      section="monthlyRevenue"
                      planContext={{
                        title: formData.title,
                        skillName: data.skill?.name,
                        existingSections: getExistingSections(),
                      }}
                      onGenerated={(content) =>
                        handleAIContent("monthlyRevenue", content)
                      }
                      label="Estimate Revenue"
                      variant="outline"
                    />
                  </div>

                  {/* Financial Summary */}
                  {formData.startupCostEstimate > 0 &&
                    formData.monthlyRevenueEstimate > 0 && (
                      <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
                        <h4 className="text-sm font-semibold text-green-800 mb-2">
                          📊 Quick Financial Summary
                        </h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-gray-500 text-xs">
                              Startup Cost
                            </p>
                            <p className="font-bold text-gray-900">
                              {formData.startupCostEstimate.toLocaleString()}{" "}
                              XAF
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">
                              Monthly Revenue
                            </p>
                            <p className="font-bold text-green-700">
                              {formData.monthlyRevenueEstimate.toLocaleString()}{" "}
                              XAF
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">
                              Payback Period
                            </p>
                            <p className="font-bold text-gray-900">
                              ~
                              {Math.ceil(
                                formData.startupCostEstimate /
                                  formData.monthlyRevenueEstimate
                              )}{" "}
                              months
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">
                              Annual Revenue
                            </p>
                            <p className="font-bold text-green-700">
                              {(
                                formData.monthlyRevenueEstimate * 12
                              ).toLocaleString()}{" "}
                              XAF
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Lists Sections */}
          <ListSection
            title="Key Activities"
            icon={<ListChecks className="w-5 h-5 text-blue-500" />}
            items={formData.keyActivities}
            onChange={(items) => updateField("keyActivities", items)}
            placeholder="e.g., Collect organic waste from restaurants"
            helpText="Daily, weekly, and monthly activities to run your business"
            aiSection="keyActivities"
            planContext={{
              title: formData.title,
              skillName: data.skill?.name,
              existingSections: getExistingSections(),
            }}
            onAIGenerated={(content) =>
              handleAIContent("keyActivities", content)
            }
            expanded={expandedSection === "keyActivities"}
            onToggle={() =>
              setExpandedSection(
                expandedSection === "keyActivities"
                  ? null
                  : "keyActivities"
              )
            }
          />

          <ListSection
            title="Resources Needed"
            icon={<Wrench className="w-5 h-5 text-amber-600" />}
            items={formData.resourcesNeeded}
            onChange={(items) => updateField("resourcesNeeded", items)}
            placeholder="e.g., Wheelbarrow (15,000 XAF)"
            helpText="Equipment, materials, and human resources needed"
            aiSection="resourcesNeeded"
            planContext={{
              title: formData.title,
              skillName: data.skill?.name,
              existingSections: getExistingSections(),
            }}
            onAIGenerated={(content) =>
              handleAIContent("resourcesNeeded", content)
            }
            expanded={expandedSection === "resourcesNeeded"}
            onToggle={() =>
              setExpandedSection(
                expandedSection === "resourcesNeeded"
                  ? null
                  : "resourcesNeeded"
              )
            }
          />

          <ListSection
            title="Challenges & Risks"
            icon={<AlertTriangle className="w-5 h-5 text-red-500" />}
            items={formData.challenges}
            onChange={(items) => updateField("challenges", items)}
            placeholder="e.g., Seasonal fluctuations in waste supply | Mitigation: diversify sources"
            helpText="Potential challenges and how you'll address them"
            aiSection="challenges"
            planContext={{
              title: formData.title,
              skillName: data.skill?.name,
              existingSections: getExistingSections(),
            }}
            onAIGenerated={(content) =>
              handleAIContent("challenges", content)
            }
            expanded={expandedSection === "challenges"}
            onToggle={() =>
              setExpandedSection(
                expandedSection === "challenges" ? null : "challenges"
              )
            }
          />

          {/* Bottom Save */}
          <div className="flex items-center justify-between pt-4">
            <Button
              onClick={() => handleSave("completed")}
              disabled={isPending || completion < 50}
              className="bg-gold-500 hover:bg-gold-600 text-green-900"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <CheckCircle2 className="w-4 h-4 mr-2" />
              )}
              Mark as Complete
            </Button>
            <Button
              onClick={() => handleSave()}
              disabled={isPending}
              className="bg-green-800 hover:bg-green-700 text-white"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save Draft
            </Button>
          </div>
        </div>
      )}

      {/* ====== REVIEW VIEW ====== */}
      {activeView === "review" && (
        <PlanReview plan={formData} skillName={data.skill?.name} />
      )}

      {/* ====== CHAT VIEW ====== */}
      {activeView === "chat" && (
        <PlanChat planTitle={formData.title} skillName={data.skill?.name} />
      )}
    </div>
  );
}

// ============================================
// List Section Sub-Component
// ============================================
function ListSection({
  title,
  icon,
  items,
  onChange,
  placeholder,
  helpText,
  aiSection,
  planContext,
  onAIGenerated,
  expanded,
  onToggle,
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
  helpText: string;
  aiSection: string;
  planContext: {
    title: string;
    skillName?: string;
    existingSections: Record<string, string>;
  };
  onAIGenerated: (content: string) => void;
  expanded: boolean;
  onToggle: () => void;
}) {
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (!newItem.trim()) return;
    onChange([...items, newItem.trim()]);
    setNewItem("");
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <Card className={cn("border", items.length > 0 ? "border-green-200" : "border-gray-200")}>
      <CardContent className="p-0">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            {icon}
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
              <p className="text-xs text-muted-foreground">{helpText}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <Badge variant="outline" className="text-xs">
                {items.length}
              </Badge>
            )}
            {expanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </button>

        {expanded && (
          <div className="px-4 pb-4 border-t border-gray-100">
            {/* Existing Items */}
            {items.length > 0 && (
              <ul className="mt-3 space-y-2">
                {items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-gray-700 bg-gray-50 rounded-lg p-2.5 group"
                  >
                    <span className="w-5 h-5 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="flex-1">{item}</span>
                    <button
                      onClick={() => removeItem(index)}
                      className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Add New Item */}
            <div className="flex gap-2 mt-3">
              <Input
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder={placeholder}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addItem();
                  }
                }}
              />
              <Button
                onClick={addItem}
                size="sm"
                variant="outline"
                disabled={!newItem.trim()}
              >
                Add
              </Button>
            </div>

            {/* AI Generate */}
            <div className="mt-3">
              <AISectionGenerator
                section={aiSection}
                planContext={planContext}
                onGenerated={onAIGenerated}
                label={`Generate with AI`}
                variant="outline"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}