// src/components/skills/SkillRecommendations.tsx
"use client";

import { useState, useEffect, useRef} from "react";
// import { useCompletion } from "ai/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { saveSkillToProfile } from "@/actions/skills";
import { CAMEROON_REGIONS, SKILL_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  Loader2,
  RefreshCw,
  Bookmark,
  BookmarkCheck,
  MapPin,
  TrendingUp,
  Clock,
  Zap,
  Leaf,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react";

interface Recommendation {
  skillName: string;
  category: string;
  whySuitable: string;
  requirements: string[];
  startupCost: string;
  monthlyIncome: string;
  environmentalImpact: string;
  difficulty: string;
  timeToLearn: string;
  quickWin: string;
  relevanceScore: number;
}

interface ParsedResponse {
  recommendations: Recommendation[];
  personalNote: string;
}

interface Props {
  profile: {
    fullName: string;
    region: string | null;
    city: string | null;
    currentSituation: string | null;
    interests: unknown;
    availableResources: unknown;
  };
  savedSkillNames: string[];
}

export function SkillRecommendations({ profile, savedSkillNames }: Props) {
  const [recommendations, setRecommendations] = useState<ParsedResponse | null>(
    null
  );
  const [savingSkill, setSavingSkill] = useState<string | null>(null);
  const [savedSkills, setSavedSkills] = useState<string[]>(savedSkillNames);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const regionInfo = CAMEROON_REGIONS.find((r) => r.value === profile.region);

  useEffect(() => {
  const cached = localStorage.getItem("skill_recommendations");
  if (cached) {
    try {
      setRecommendations(JSON.parse(cached));
    } catch {}
  }
}, []);

  const getRecommendations = async () => {
  if (abortRef.current) {
    abortRef.current.abort();
  }

  const controller = new AbortController();
  abortRef.current = controller;

  setIsLoading(true);
  setError(null);

  try {
    // const response = await fetch("/api/ai/recommend", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   signal: controller.signal,
    //   body: JSON.stringify({
    //     mode: "recommend",
    //     profile, // ✅ send profile explicitly
    //   }),
    // });

    // if (!response.ok) throw new Error("Failed to get recommendations");

    // const data = await response.json(); // ✅ no streaming parsing

    // setRecommendations(data);
    const response = await fetch("../../api/ai/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        mode: "recommend",
        profile,
      }),
    });

    const data = await response.json(); // 👈 move this up

    if (!response.ok) {
      console.error("API Error:", data); // 👈 log real backend error
      throw new Error(data?.error || "Failed to get recommendations");
    }

    setRecommendations(data);

    // ✅ Cache result
    localStorage.setItem(
      "skill_recommendations",
      JSON.stringify(data)
    );
  } catch (err: any) {
    if (err.name !== "AbortError") {
      console.error(err);
      setError("Failed to get recommendations. Try again.");
    }
  } finally {
    setIsLoading(false);
  }
};

  const handleSaveSkill = async (rec: Recommendation) => {
    if (savedSkills.includes(rec.skillName)) return;
    setSavingSkill(rec.skillName);

    const result = await saveSkillToProfile({
      skillName: rec.skillName,
      category: rec.category,
      aiReason: rec.whySuitable,
    });

    if (result.success) {
      setSavedSkills((prev) => [...prev, rec.skillName]);
    }
    setSavingSkill(null);
  };

  const getCategoryInfo = (category: string) => {
    return SKILL_CATEGORIES.find((c) => c.value === category);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-700";
      case "intermediate":
        return "bg-amber-100 text-amber-700";
      case "advanced":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  

  return (
    <div className="space-y-6">
      {/* Context Card */}
      <Card className="border-green-200 bg-green-50/50">
        <CardContent className="p-5">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-green-800">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">
                {profile.city || regionInfo?.label || "Cameroon"}
              </span>
            </div>
            <Badge variant="outline" className="border-green-300 text-green-700">
              {regionInfo?.climateZone || "equatorial"} zone
            </Badge>
            {(Array.isArray(profile.interests) ? profile.interests : [])?.map((interest) => {
              const cat = getCategoryInfo(interest);
              return (
                <Badge
                  key={interest}
                  variant="outline"
                  className="border-green-300 text-green-700"
                >
                  {cat?.label || interest}
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Generate Button */}
      {!recommendations && !isLoading && (
        <Card className="border-2 border-dashed border-green-300 bg-white">
          <CardContent className="p-8 md:p-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-green-700" />
            </div>
            <h3 className="text-xl font-heading font-bold text-gray-900">
              Get Your Personalized Recommendations
            </h3>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              Our AI will analyze your location ({profile.city || regionInfo?.label}),
              interests, and resources to suggest the best green skills for you.
            </p>
            <Button
              onClick={getRecommendations}
              className="mt-6 bg-green-800 hover:bg-green-700 text-white px-8 py-3 h-auto"
              size="lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Generate AI Recommendations
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {isLoading && (
        <Card className="border-green-200">
          <CardContent className="p-8 md:p-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Sparkles className="w-8 h-8 text-green-700" />
            </div>
            <h3 className="text-lg font-heading font-semibold text-gray-900">
              Analyzing your profile...
            </h3>
            <p className="text-muted-foreground mt-2 text-sm">
              Our AI is considering your location, climate zone, interests, and
              resources to find the perfect green skills for you.
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Loader2 className="w-5 h-5 animate-spin text-green-700" />
              <span className="text-sm text-green-700 font-medium">
                This takes about 10-15 seconds...
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6 text-center">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-red-700 font-medium">{error}</p>
            <Button
              onClick={getRecommendations}
              variant="outline"
              className="mt-4 border-red-300 text-red-700 hover:bg-red-100"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      {recommendations && (
        <div className="space-y-6">
          {/* Personal Note */}
          {recommendations.personalNote && (
            <div className="ai-bubble">
              <p className="text-sm text-blue-800 font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                AI Advisor Note
              </p>
              <p className="text-sm text-blue-700 mt-1">
                {recommendations.personalNote}
              </p>
            </div>
          )}

          {/* Recommendation Cards */}
          <div className="space-y-4">
            {recommendations.recommendations.map((rec, index) => {
              const catInfo = getCategoryInfo(rec.category);
              const isSaved = savedSkills.includes(rec.skillName);
              const isExpanded = expandedCard === index;
              const isSaving = savingSkill === rec.skillName;

              return (
                <Card
                  key={index}
                  className={cn(
                    "border transition-all duration-200 overflow-hidden",
                    isSaved
                      ? "border-green-300 bg-green-50/30"
                      : "border-gray-200 hover:border-green-200"
                  )}
                >
                  <CardContent className="p-0">
                    {/* Main Section */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          {/* Rank + Category */}
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-7 h-7 bg-green-800 text-white rounded-full flex items-center justify-center text-xs font-bold">
                              {index + 1}
                            </span>
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-xs",
                                catInfo?.bgColor,
                                catInfo?.color
                              )}
                            >
                              {catInfo?.label || rec.category}
                            </Badge>
                            <Badge
                              className={cn(
                                "text-xs",
                                getDifficultyColor(rec.difficulty)
                              )}
                            >
                              {rec.difficulty}
                            </Badge>
                          </div>

                          {/* Skill Name */}
                          <h3 className="text-lg font-heading font-bold text-gray-900">
                            {rec.skillName}
                          </h3>

                          {/* Why Suitable */}
                          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                            {rec.whySuitable}
                          </p>

                          {/* Quick Stats */}
                          <div className="flex flex-wrap gap-3 mt-4">
                            <div className="flex items-center gap-1.5 text-xs text-gray-600">
                              <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                              <span>{rec.monthlyIncome}/mo</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-600">
                              <Zap className="w-3.5 h-3.5 text-amber-500" />
                              <span>Start: {rec.startupCost}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-600">
                              <Clock className="w-3.5 h-3.5 text-blue-500" />
                              <span>{rec.timeToLearn}</span>
                            </div>
                          </div>
                        </div>

                        {/* Relevance Score */}
                        <div className="hidden sm:flex flex-col items-center">
                          <div
                            className={cn(
                              "w-14 h-14 rounded-xl flex flex-col items-center justify-center",
                              rec.relevanceScore >= 90
                                ? "bg-green-100 text-green-700"
                                : rec.relevanceScore >= 75
                                ? "bg-amber-100 text-amber-700"
                                : "bg-gray-100 text-gray-700"
                            )}
                          >
                            <span className="text-lg font-bold">
                              {rec.relevanceScore}
                            </span>
                            <span className="text-[10px]">match</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                        <Button
                          onClick={() => handleSaveSkill(rec)}
                          disabled={isSaved || isSaving}
                          size="sm"
                          className={cn(
                            isSaved
                              ? "bg-green-100 text-green-700 hover:bg-green-100"
                              : "bg-green-800 hover:bg-green-700 text-white"
                          )}
                        >
                          {isSaving ? (
                            <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                          ) : isSaved ? (
                            <BookmarkCheck className="w-4 h-4 mr-1.5" />
                          ) : (
                            <Bookmark className="w-4 h-4 mr-1.5" />
                          )}
                          {isSaved ? "Saved" : "Save Skill"}
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setExpandedCard(isExpanded ? null : index)
                          }
                          className="text-gray-600"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="w-4 h-4 mr-1.5" />
                              Less Details
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4 mr-1.5" />
                              More Details
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-gray-100 bg-mist/50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                          {/* Requirements */}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-800 mb-2">
                              📋 What You Need
                            </h4>
                            <ul className="space-y-1">
                              {rec.requirements.map((req, i) => (
                                <li
                                  key={i}
                                  className="text-sm text-gray-600 flex items-center gap-2"
                                >
                                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Environmental Impact */}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-800 mb-2">
                              🌍 Environmental Impact
                            </h4>
                            <p className="text-sm text-gray-600">
                              {rec.environmentalImpact}
                            </p>
                          </div>

                          {/* Quick Win */}
                          <div className="md:col-span-2">
                            <div className="bg-gold-50 border border-gold-200 rounded-lg p-4">
                              <h4 className="text-sm font-semibold text-gold-800 mb-1">
                                ⚡ Quick Win — Start This Week
                              </h4>
                              <p className="text-sm text-gold-700">
                                {rec.quickWin}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Refresh Button */}
          <div className="text-center pt-4">
            <Button
              onClick={getRecommendations}
              variant="outline"
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Get New Recommendations
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}