// src/components/skills/SkillCatalog.tsx
"use client";

import { useState, useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SKILL_CATEGORIES } from "@/lib/constants";
import { saveSkillToProfile } from "@/actions/skills";
import { cn } from "@/lib/utils";
import {
  Search,
  Bookmark,
  BookmarkCheck,
  Clock,
  TrendingUp,
  Leaf,
  Loader2,
  Filter,
} from "lucide-react";
import { BusinessIdeasModal } from "./BusinessIdeasModal";

interface Skill {
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
}

interface Props {
  skills: Skill[];
  savedSkillNames: string[];
}

export function SkillCatalog({ skills, savedSkillNames }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [savedSkills, setSavedSkills] = useState(savedSkillNames);
  const [savingSkill, setSavingSkill] = useState<string | null>(null);

  const filteredSkills = skills.filter((skill) => {
    const matchesSearch =
      !searchQuery ||
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !activeCategory || skill.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSave = async (skill: Skill) => {
    if (savedSkills.includes(skill.name)) return;
    setSavingSkill(skill.id);

    const result = await saveSkillToProfile({
      skillName: skill.name,
      category: skill.category,
      aiReason: skill.shortDescription || skill.description,
    });

    if (result.success) {
      setSavedSkills((prev) => [...prev, skill.name]);
    }
    setSavingSkill(null);
  };

  const getCategoryInfo = (category: string) =>
    SKILL_CATEGORIES.find((c) => c.value === category);

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
      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills..."
            className="pl-9"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setActiveCategory(null)}
          className={cn(
            "rounded-full",
            !activeCategory && "bg-green-800 text-white hover:bg-green-700"
          )}
        >
          <Filter className="w-3.5 h-3.5 mr-1" />
          All ({skills.length})
        </Button>
        {SKILL_CATEGORIES.map((cat) => {
          const count = skills.filter((s) => s.category === cat.value).length;
          return (
            <Button
              key={cat.value}
              variant="outline"
              size="sm"
              onClick={() =>
                setActiveCategory(
                  activeCategory === cat.value ? null : cat.value
                )
              }
              className={cn(
                "rounded-full",
                activeCategory === cat.value &&
                  "bg-green-800 text-white hover:bg-green-700"
              )}
            >
              {cat.label} ({count})
            </Button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSkills.map((skill) => {
          const catInfo = getCategoryInfo(skill.category);
          const isSaved = savedSkills.includes(skill.name);
          const isSaving = savingSkill === skill.id;

          return (
            <Card key={skill.id} className="border border-gray-100 card-hover">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
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
                    className={cn(
                      "text-xs",
                      getDifficultyColor(skill.difficulty)
                    )}
                  >
                    {skill.difficulty}
                  </Badge>
                </div>

                <h3 className="font-heading font-semibold text-gray-900">
                  {skill.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2">
                  {skill.shortDescription || skill.description}
                </p>

                <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                  {skill.estimatedDuration && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {skill.estimatedDuration}
                    </span>
                  )}
                  {skill.marketPotential && (
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {skill.marketPotential} market
                    </span>
                  )}
                  {skill.climateBenefit && (
                    <span className="flex items-center gap-1">
                      <Leaf className="w-3 h-3" />
                      Climate+
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100">
                  <Button
                    size="sm"
                    onClick={() => handleSave(skill)}
                    disabled={isSaved || isSaving}
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
                    {isSaved ? "Saved" : "Save"}
                  </Button>
                  <BusinessIdeasModal skillName={skill.name} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredSkills.length === 0 && (
        <Card className="border-dashed border-2 border-gray-200">
          <CardContent className="p-8 text-center">
            <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-muted-foreground">
              No skills match your search. Try different keywords.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}