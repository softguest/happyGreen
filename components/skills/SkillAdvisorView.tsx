// Update src/components/skills/SkillAdvisorView.tsx
// Add a 4th tab for Browse/Catalog

"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, BookmarkCheck, MessageCircle, Search } from "lucide-react";
import { SkillRecommendations } from "./SkillRecommendations";
import { SavedSkills } from "./SavedSkills";
import { AdvisorChat } from "./AdvisorChat";
import { SkillCatalog } from "./SkillCatalog";

interface Props {
  profile: {
    id: string;
    fullName: string;
    region: string | null;
    city: string | null;
    currentSituation: string | null;
    interests: unknown;
    availableResources: unknown;
  };
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
  allSkills: Array<{
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
  }>;
}

export function SkillAdvisorView({ profile, savedSkills, allSkills }: Props) {
  const [activeTab, setActiveTab] = useState("recommend");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-gray-900">
          AI Skill Advisor
        </h1>
        <p className="text-muted-foreground mt-1">
          Get personalized green skill recommendations or browse our full
          catalog of climate-smart skills.
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 bg-mist">
          <TabsTrigger
            value="recommend"
            className="data-[state=active]:bg-green-800 data-[state=active]:text-white text-xs sm:text-sm"
          >
            <Brain className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">AI</span>
          </TabsTrigger>
          <TabsTrigger
            value="browse"
            className="data-[state=active]:bg-green-800 data-[state=active]:text-white text-xs sm:text-sm"
          >
            <Search className="w-4 h-4 mr-1 sm:mr-2" />
            Browse
          </TabsTrigger>
          <TabsTrigger
            value="saved"
            className="data-[state=active]:bg-green-800 data-[state=active]:text-white text-xs sm:text-sm"
          >
            <BookmarkCheck className="w-4 h-4 mr-1 sm:mr-2" />
            My Skills
            {savedSkills.length > 0 && (
              <span className="ml-1 bg-gold-500 text-green-900 text-xs font-bold px-1.5 py-0.5 rounded-full">
                {savedSkills.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="chat"
            className="data-[state=active]:bg-green-800 data-[state=active]:text-white text-xs sm:text-sm"
          >
            <MessageCircle className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Ask</span> Chat
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recommend" className="mt-6">
          <SkillRecommendations
            profile={profile}
            savedSkillNames={savedSkills.map((s) => s.skill.name)}
          />
        </TabsContent>

        <TabsContent value="browse" className="mt-6">
          <SkillCatalog
            skills={allSkills}
            savedSkillNames={savedSkills.map((s) => s.skill.name)}
          />
        </TabsContent>

        <TabsContent value="saved" className="mt-6">
          <SavedSkills savedSkills={savedSkills} />
        </TabsContent>

        <TabsContent value="chat" className="mt-6">
          <AdvisorChat />
        </TabsContent>
      </Tabs>
    </div>
  );
}