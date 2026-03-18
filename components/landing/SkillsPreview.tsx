// src/components/landing/SkillsPreview.tsx
import { Badge } from "@/components/ui/badge";
import {
  Sprout,
  Recycle,
  Sun,
  Droplets,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SKILL_CATEGORIES = [
  {
    icon: Sprout,
    title: "Sustainable Agriculture",
    color: "text-green-700",
    bg: "bg-green-100",
    border: "border-green-200",
    skills: [
      "Composting & Organic Fertilizer",
      "Climate-Smart Farming",
      "Drip Irrigation",
      "Urban Farming",
      "Agroforestry",
    ],
    income: "15K - 200K XAF/month",
  },
  {
    icon: Recycle,
    title: "Waste Management",
    color: "text-amber-700",
    bg: "bg-amber-100",
    border: "border-amber-200",
    skills: [
      "Plastic Recycling & Upcycling",
      "Community Waste Collection",
      "Biogas Production",
    ],
    income: "20K - 150K XAF/month",
  },
  {
    icon: Sun,
    title: "Renewable Energy",
    color: "text-yellow-700",
    bg: "bg-yellow-100",
    border: "border-yellow-200",
    skills: [
      "Solar Panel Installation",
      "Efficient Cookstove Production",
      "Biomass Briquettes",
    ],
    income: "30K - 300K XAF/month",
  },
  {
    icon: Droplets,
    title: "Water Conservation",
    color: "text-blue-700",
    bg: "bg-blue-100",
    border: "border-blue-200",
    skills: [
      "Rainwater Harvesting",
      "Water Purification",
    ],
    income: "10K - 100K XAF/month",
  },
];

export function SkillsPreview() {
  return (
    <section id="skills" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
            Explore <span className="text-green-700">Green Skills</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover income-generating skills that also protect the environment.
            All tailored to Cameroon&apos;s economy and climate.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((category, i) => {
            const Icon = category.icon;
            return (
              <div
                key={i}
                className={`rounded-2xl border ${category.border} p-6 md:p-8 hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 ${category.bg} rounded-xl flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-heading font-bold text-gray-900">
                      {category.title}
                    </h3>
                    <div className="mt-3 space-y-1.5">
                      {category.skills.map((skill, j) => (
                        <div
                          key={j}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0" />
                          {skill}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-semibold text-green-700">
                        {category.income}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link href="/sign-up">
            <Button className="bg-green-800 hover:bg-green-700 text-white px-8 py-3 h-auto rounded-xl">
              Discover Your Ideal Skills
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}