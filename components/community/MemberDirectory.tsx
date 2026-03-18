// src/components/community/MemberDirectory.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CAMEROON_REGIONS, SKILL_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  Users,
  MapPin,
  Star,
  Brain,
  Trophy,
  Filter,
  Sparkles,
  UserCheck,
} from "lucide-react";

interface Member {
  id: string;
  fullName: string;
  region: string | null;
  city: string | null;
  currentSituation: string | null;
  interests: unknown;
  totalPoints: number;
  createdAt: Date;
  skills: number;
  badges: number;
  sharedInterests: string[];
}

interface Props {
  data: {
    members: Member[];
    currentUserInterests: string[];
    currentUserRegion: string | null;
  } | null;
}

export function MemberDirectory({ data }: Props) {
  const [interestFilter, setInterestFilter] = useState<string>("");
  const [regionFilter, setRegionFilter] = useState<string>("");

  if (!data) {
    return (
      <Card className="border-dashed border-2 border-gray-200">
        <CardContent className="p-8 text-center">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-muted-foreground">Members unavailable</p>
        </CardContent>
      </Card>
    );
  }

  let filteredMembers = data.members;

  if (interestFilter) {
    filteredMembers = filteredMembers.filter((m) => {
      const interests = (m.interests as string[]) || [];
      return interests.includes(interestFilter);
    });
  }

  if (regionFilter) {
    filteredMembers = filteredMembers.filter(
      (m) => m.region === regionFilter
    );
  }

  // Sort by shared interests count, then points
  filteredMembers.sort((a, b) => {
    if (b.sharedInterests.length !== a.sharedInterests.length) {
      return b.sharedInterests.length - a.sharedInterests.length;
    }
    return b.totalPoints - a.totalPoints;
  });

  const getCategoryLabel = (cat: string) =>
    SKILL_CATEGORIES.find((c) => c.value === cat)?.label || cat;

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card className="border border-gray-100">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Select
              value={interestFilter || "all"}
              onValueChange={(v) =>
                setInterestFilter(v === "all" ? "" : v)
              }
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="All Interests" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Interests</SelectItem>
                {SKILL_CATEGORIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={regionFilter || "all"}
              onValueChange={(v) =>
                setRegionFilter(v === "all" ? "" : v)
              }
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="All Regions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {CAMEROON_REGIONS.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <p className="text-sm text-muted-foreground">
        {filteredMembers.length} members found
      </p>

      {filteredMembers.length === 0 ? (
        <Card className="border-dashed border-2 border-gray-200">
          <CardContent className="p-8 text-center">
            <Users className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-muted-foreground">
              No members match your filters
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredMembers.map((member) => {
            const regionLabel = CAMEROON_REGIONS.find(
              (r) => r.value === member.region
            )?.label;
            const initials = member.fullName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);
            const interests = (member.interests as string[]) || [];
            const hasShared = member.sharedInterests.length > 0;

            return (
              <Card
                key={member.id}
                className={cn(
                  "border card-hover",
                  hasShared
                    ? "border-green-200 bg-green-50/20"
                    : "border-gray-100"
                )}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 bg-green-200 rounded-full flex items-center justify-center text-green-800 text-sm font-bold flex-shrink-0">
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm line-clamp-1">
                        {member.fullName}
                      </p>
                      {regionLabel && (
                        <p className="text-[10px] text-muted-foreground flex items-center gap-0.5 mt-0.5">
                          <MapPin className="w-3 h-3" />
                          {member.city || regionLabel.split(" ")[0]}
                        </p>
                      )}
                    </div>
                    <Badge
                      variant="outline"
                      className="text-[10px] border-gold-200 text-gold-700 flex-shrink-0"
                    >
                      <Star className="w-3 h-3 mr-0.5" />
                      {member.totalPoints}
                    </Badge>
                  </div>

                  {/* Shared Interests */}
                  {hasShared && (
                    <div className="mt-3 p-2 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-[10px] text-green-700 font-medium flex items-center gap-1">
                        <UserCheck className="w-3 h-3" />
                        Shared interests:
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {member.sharedInterests.map((interest) => (
                          <Badge
                            key={interest}
                            className="text-[10px] bg-green-100 text-green-700"
                          >
                            {getCategoryLabel(interest).split(" ")[0]}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* All Interests */}
                  {interests.length > 0 && !hasShared && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {interests.map((interest) => (
                        <Badge
                          key={interest}
                          variant="outline"
                          className="text-[10px]"
                        >
                          {getCategoryLabel(interest).split(" ")[0]}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center gap-3 mt-3 text-[10px] text-gray-500">
                    <span className="flex items-center gap-0.5">
                      <Brain className="w-3 h-3" />
                      {member.skills} skills
                    </span>
                    <span className="flex items-center gap-0.5">
                      <Trophy className="w-3 h-3" />
                      {member.badges} badges
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}