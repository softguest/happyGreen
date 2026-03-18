// src/types/index.ts

export type Region = typeof import("@/lib/constants").CAMEROON_REGIONS[number]["value"];
export type SkillCategory = "agriculture" | "waste_management" | "renewable_energy" | "water_conservation";
export type UserSituation = "student" | "unemployed" | "employed" | "entrepreneur";
export type Language = "en" | "fr";
export type Difficulty = "beginner" | "intermediate" | "advanced";
export type SkillStatus = "interested" | "learning" | "completed";
export type ModuleStatus = "not_started" | "in_progress" | "completed";
export type PlanStatus = "draft" | "in_progress" | "completed";
export type ImpactCategory = "waste" | "agriculture" | "energy" | "water" | "income";

export interface OnboardingFormData {
  fullName: string;
  preferredLanguage: Language;
  region: string;
  city: string;
  currentSituation: UserSituation;
  interests: SkillCategory[];
  availableResources: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}