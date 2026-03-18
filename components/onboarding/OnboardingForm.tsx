// src/components/onboarding/OnboardingForm.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "@/actions/profile";
import {
  CAMEROON_REGIONS,
  SKILL_CATEGORIES,
  USER_SITUATIONS,
  AVAILABLE_RESOURCES,
  LANGUAGES,
} from "@/lib/constants";
import type { OnboardingFormData, SkillCategory } from "@/types";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  Sprout,
  Recycle,
  Sun,
  Droplets,
  GraduationCap,
  Search,
  Briefcase,
  Rocket,
  Map,
  Wallet,
  Banknote,
  Wrench,
  Smartphone,
  Laptop,
  Truck,
  Users,
  Warehouse,
} from "lucide-react";

// Map icon names to components
const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  Sprout, Recycle, Sun, Droplets,
  GraduationCap, Search, Briefcase, Rocket,
  Map, Wallet, Banknote, Wrench, Smartphone,
  Laptop, Truck, Users, Warehouse,
};

const TOTAL_STEPS = 4;

interface Props {
  defaultName: string;
}

export function OnboardingForm({ defaultName }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<OnboardingFormData>({
    fullName: defaultName,
    preferredLanguage: "en",
    region: "",
    city: "",
    currentSituation: "" as any,
    interests: [],
    availableResources: [],
  });

  const updateField = <K extends keyof OnboardingFormData>(
    key: K,
    value: OnboardingFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setError("");
  };

  const toggleArrayItem = <K extends "interests" | "availableResources">(
    key: K,
    item: K extends "interests" ? SkillCategory : string
  ) => {
    setFormData((prev) => {
      const current = prev[key] as unknown as Array<
        K extends "interests" ? SkillCategory : string
      >;

      const updated = current.includes(item as any)
        ? current.filter((i) => i !== (item as any))
        : [...current, item as any];

      return { ...prev, [key]: updated as OnboardingFormData[K] };
    });
  };

  const validateStep = (): boolean => {
    switch (currentStep) {
      case 1:
        if (!formData.fullName.trim()) {
          setError("Please enter your name");
          return false;
        }
        return true;
      case 2:
        if (!formData.region) {
          setError("Please select your region");
          return false;
        }
        return true;
      case 3:
        if (!formData.currentSituation) {
          setError("Please select your current situation");
          return false;
        }
        if (formData.interests.length === 0) {
          setError("Please select at least one interest");
          return false;
        }
        return true;
      case 4:
        return true; // Resources are optional
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS));
    }
  };

  const prevStep = () => {
    setCurrentStep((s) => Math.max(s - 1, 1));
    setError("");
  };

  const handleSubmit = () => {
    if (!validateStep()) return;

    startTransition(async () => {
      const result = await completeOnboarding(formData);
      if (result.success) {
        router.push("/dashboard");
      } else {
        setError(result.error || "Something went wrong");
      }
    });
  };

  return (
    <div>
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div key={i} className="flex items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                i + 1 < currentStep
                  ? "bg-green-600 text-white"
                  : i + 1 === currentStep
                  ? "bg-green-800 text-white ring-4 ring-green-200"
                  : "bg-gray-200 text-gray-500"
              )}
            >
              {i + 1 < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                i + 1
              )}
            </div>
            {i < TOTAL_STEPS - 1 && (
              <div
                className={cn(
                  "w-12 h-1 mx-1 rounded-full transition-all",
                  i + 1 < currentStep ? "bg-green-600" : "bg-gray-200"
                )}
              />
            )}
          </div>
        ))}
      </div>

      <Card className="shadow-lg border-0">
        <CardContent className="p-6 md:p-8">
          {/* ============ STEP 1: Basic Info ============ */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-heading font-bold text-green-800">
                  Tell us about yourself
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Basic information to personalize your experience
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    placeholder="Enter your full name"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="language">Preferred Language *</Label>
                  <Select
                    value={formData.preferredLanguage}
                    onValueChange={(v) =>
                      updateField("preferredLanguage", v as "en" | "fr")
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGES.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* ============ STEP 2: Location ============ */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-heading font-bold text-green-800">
                  Where are you located?
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  This helps us recommend skills relevant to your local climate
                  and economy
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="region">Region *</Label>
                  <Select
                    value={formData.region}
                    onValueChange={(v) => updateField("region", v)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select your region" />
                    </SelectTrigger>
                    <SelectContent>
                      {CAMEROON_REGIONS.map((region) => (
                        <SelectItem key={region.value} value={region.value}>
                          {region.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="city">City / Town</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    placeholder="e.g., Yaoundé, Douala, Bamenda"
                    className="mt-1"
                  />
                </div>

                {formData.region && (
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-800">
                      🌍 Climate zone:{" "}
                      <strong>
                        {
                          CAMEROON_REGIONS.find(
                            (r) => r.value === formData.region
                          )?.climateZone
                        }
                      </strong>
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      Our AI will use this to suggest the most suitable green
                      skills for your area.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ============ STEP 3: Situation & Interests ============ */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-heading font-bold text-green-800">
                  Your situation & interests
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Help us understand your goals so we can guide you better
                </p>
              </div>

              {/* Current Situation */}
              <div>
                <Label className="text-base font-semibold">
                  Current Situation *
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  {USER_SITUATIONS.map((situation) => {
                    const Icon = iconComponents[situation.icon];
                    const isSelected =
                      formData.currentSituation === situation.value;
                    return (
                      <button
                        key={situation.value}
                        type="button"
                        onClick={() =>
                          updateField("currentSituation", situation.value as any)
                        }
                        className={cn(
                          "flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all",
                          isSelected
                            ? "border-green-600 bg-green-50 shadow-sm"
                            : "border-gray-200 hover:border-green-300 hover:bg-green-50/50"
                        )}
                      >
                        {Icon && (
                          <Icon
                            className={cn(
                              "w-5 h-5 mt-0.5 flex-shrink-0",
                              isSelected
                                ? "text-green-700"
                                : "text-gray-400"
                            )}
                          />
                        )}
                        <div>
                          <p
                            className={cn(
                              "font-medium text-sm",
                              isSelected
                                ? "text-green-800"
                                : "text-gray-700"
                            )}
                          >
                            {situation.label}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {situation.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Interests */}
              <div>
                <Label className="text-base font-semibold">
                  Green Skill Interests * (select one or more)
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  {SKILL_CATEGORIES.map((cat) => {
                    const Icon = iconComponents[cat.icon];
                    const isSelected = formData.interests.includes(
                      cat.value as SkillCategory
                    );
                    return (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() =>
                          toggleArrayItem("interests", cat.value)
                        }
                        className={cn(
                          "flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all",
                          isSelected
                            ? "border-green-600 bg-green-50 shadow-sm"
                            : "border-gray-200 hover:border-green-300"
                        )}
                      >
                        <div
                          className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                            isSelected ? cat.bgColor : "bg-gray-100"
                          )}
                        >
                          {Icon && (
                            <Icon
                              className={cn(
                                "w-5 h-5",
                                isSelected ? cat.color : "text-gray-400"
                              )}
                            />
                          )}
                        </div>
                        <div>
                          <p
                            className={cn(
                              "font-medium text-sm",
                              isSelected
                                ? "text-green-800"
                                : "text-gray-700"
                            )}
                          >
                            {cat.label}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {cat.description}
                          </p>
                        </div>
                        {isSelected && (
                          <Check className="w-5 h-5 text-green-600 ml-auto flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ============ STEP 4: Available Resources ============ */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-heading font-bold text-green-800">
                  What resources do you have?
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  This helps the AI recommend skills you can realistically start
                  with (all optional)
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {AVAILABLE_RESOURCES.map((resource) => {
                  const Icon = iconComponents[resource.icon];
                  const isSelected = formData.availableResources.includes(
                    resource.value
                  );
                  return (
                    <button
                      key={resource.value}
                      type="button"
                      onClick={() =>
                        toggleArrayItem("availableResources", resource.value)
                      }
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all",
                        isSelected
                          ? "border-green-600 bg-green-50"
                          : "border-gray-200 hover:border-green-300"
                      )}
                    >
                      {Icon && (
                        <Icon
                          className={cn(
                            "w-5 h-5 flex-shrink-0",
                            isSelected ? "text-green-700" : "text-gray-400"
                          )}
                        />
                      )}
                      <span
                        className={cn(
                          "text-sm font-medium",
                          isSelected ? "text-green-800" : "text-gray-700"
                        )}
                      >
                        {resource.label}
                      </span>
                      {isSelected && (
                        <Check className="w-4 h-4 text-green-600 ml-auto" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="p-4 ai-bubble">
                <p className="text-sm text-blue-800 font-medium">
                  🤖 How we use this info
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  Our AI advisor considers your location, interests, and
                  available resources to suggest green skills you can start with
                  minimal barriers. You can update this anytime.
                </p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <p className="text-sm text-red-600 mt-4 bg-red-50 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={cn(currentStep === 1 && "invisible")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            {currentStep < TOTAL_STEPS ? (
              <Button
                type="button"
                onClick={nextStep}
                className="bg-green-800 hover:bg-green-700"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isPending}
                className="bg-gold-500 hover:bg-gold-600 text-green-900 font-bold"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Setting up...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Complete Setup
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Step label */}
      <p className="text-center text-xs text-muted-foreground mt-4">
        Step {currentStep} of {TOTAL_STEPS}
      </p>
    </div>
  );
}