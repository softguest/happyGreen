// src/components/business/NewPlanWizard.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { createBusinessPlan } from "@/actions/business";
import { SKILL_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  Sparkles,
  Loader2,
  CheckCircle2,
  Leaf,
} from "lucide-react";

interface UserSkill {
  userSkill: { id: string; skillId: string; status: string };
  skill: { id: string; name: string; category: string };
}

interface Props {
  userSkills: UserSkill[];
}

export function NewPlanWizard({ userSkills }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState(1);
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState("");

  const getCategoryInfo = (category: string) =>
    SKILL_CATEGORIES.find((c) => c.value === category);

  const handleCreate = () => {
    if (!businessName.trim()) return;

    startTransition(async () => {
      const result = await createBusinessPlan({
        title: businessName.trim(),
        skillId: selectedSkillId || undefined,
      });

      if (result.success && result.planId) {
        router.push(`/dashboard/business/${result.planId}`);
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link href="/dashboard/business">
        <Button variant="ghost" size="sm" className="text-gray-600">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Plans
        </Button>
      </Link>

      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gold-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Lightbulb className="w-8 h-8 text-gold-600" />
        </div>
        <h1 className="text-2xl font-heading font-bold text-gray-900">
          Start a New Green Business Plan
        </h1>
        <p className="text-muted-foreground mt-2">
          Our AI will guide you through creating a practical business plan
        </p>
      </div>

      {/* Step 1: Choose Skill */}
      {step === 1 && (
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <h2 className="font-heading font-semibold text-gray-900 mb-1">
              Step 1: Choose a skill (optional)
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Link your plan to a green skill for more specific AI guidance
            </p>

            <div className="space-y-2">
              {/* No skill option */}
              <button
                onClick={() => setSelectedSkillId(null)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all",
                  selectedSkillId === null
                    ? "border-green-600 bg-green-50"
                    : "border-gray-200 hover:border-green-300"
                )}
              >
                <Sparkles
                  className={cn(
                    "w-5 h-5",
                    selectedSkillId === null
                      ? "text-green-700"
                      : "text-gray-400"
                  )}
                />
                <div>
                  <p className="font-medium text-sm">
                    General green business idea
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Not linked to a specific skill
                  </p>
                </div>
                {selectedSkillId === null && (
                  <CheckCircle2 className="w-5 h-5 text-green-600 ml-auto" />
                )}
              </button>

              {/* User's skills */}
              {userSkills.map(({ skill }) => {
                const catInfo = getCategoryInfo(skill.category);
                const isSelected = selectedSkillId === skill.id;

                return (
                  <button
                    key={skill.id}
                    onClick={() => setSelectedSkillId(skill.id)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all",
                      isSelected
                        ? "border-green-600 bg-green-50"
                        : "border-gray-200 hover:border-green-300"
                    )}
                  >
                    <Leaf
                      className={cn(
                        "w-5 h-5",
                        isSelected ? "text-green-700" : "text-gray-400"
                      )}
                    />
                    <div>
                      <p className="font-medium text-sm">{skill.name}</p>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[10px] mt-1",
                          catInfo?.bgColor,
                          catInfo?.color
                        )}
                      >
                        {catInfo?.label}
                      </Badge>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-green-600 ml-auto" />
                    )}
                  </button>
                );
              })}
            </div>

            <Button
              onClick={() => setStep(2)}
              className="w-full mt-6 bg-green-800 hover:bg-green-700 text-white"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Name */}
      {step === 2 && (
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <h2 className="font-heading font-semibold text-gray-900 mb-1">
              Step 2: Name your business
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Give your green business idea a name
            </p>

            <div>
              <Label htmlFor="name">Business Name *</Label>
              <Input
                id="name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g., Eco-Compost Douala, Green Clean Solutions..."
                className="mt-1 text-lg"
                autoFocus
              />
              <p className="text-xs text-muted-foreground mt-2">
                Don&apos;t worry, you can change this later
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleCreate}
                disabled={!businessName.trim() || isPending}
                className="flex-1 bg-gold-500 hover:bg-gold-600 text-green-900 font-bold"
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 mr-2" />
                )}
                Create & Start Planning
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}