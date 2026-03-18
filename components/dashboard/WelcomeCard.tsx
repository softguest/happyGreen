// src/components/dashboard/WelcomeCard.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Globe } from "lucide-react";
import { CAMEROON_REGIONS } from "@/lib/constants";

interface Props {
  profile: {
    fullName: string;
    region: string | null;
    city: string | null;
    currentSituation: string | null;
    totalPoints: number;
  };
}

export function WelcomeCard({ profile }: Props) {
  const regionLabel = CAMEROON_REGIONS.find(
    (r) => r.value === profile.region
  )?.label;

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <Card className="bg-green-800  gradient-green border-0 text-white overflow-hidden relative">
      <CardContent className="p-6 md:p-8">
        <div className="relative z-10">
          <p className="text-green-200 text-sm">{greeting()},</p>
          <h1 className="text-2xl md:text-3xl font-heading font-bold mt-1">
            {profile.fullName.split(" ")[0]}! 🌱
          </h1>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            {regionLabel && (
              <Badge
                variant="secondary"
                className="bg-green-700/50 text-green-100 border-green-600"
              >
                <MapPin className="w-3 h-3 mr-1" />
                {profile.city || regionLabel}
              </Badge>
            )}
            <Badge
              variant="secondary"
              className="bg-gold-500/20 text-gold-300 border-gold-500/30"
            >
              ⭐ {profile.totalPoints} points
            </Badge>
          </div>

          <p className="text-green-200 text-sm mt-4 max-w-lg">
            Ready to build your green skills? Start by exploring AI-recommended
            skills or continue your learning pathways.
          </p>
        </div>

        {/* Decorative element */}
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-green-700/30 rounded-full" />
        <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-green-700/20 rounded-full" />
      </CardContent>
    </Card>
  );
}