// src/components/community/Leaderboard.tsx
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CAMEROON_REGIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  Trophy,
  Crown,
  Medal,
  MapPin,
  Star,
  Flame,
  Globe,
  Users,
} from "lucide-react";

interface Leader {
  id: string;
  fullName: string;
  region: string | null;
  city: string | null;
  totalPoints: number;
  badges: number;
  impacts: number;
  isCurrentUser: boolean;
}

interface Props {
  data: {
    global: Leader[];
    regional: Leader[];
    userRegion: string | null;
    currentUserId: string;
    userRank: number;
    userPoints: number;
  } | null;
}

export function Leaderboard({ data }: Props) {
  const [view, setView] = useState<"global" | "regional">("global");

  if (!data) {
    return (
      <Card className="border-dashed border-2 border-gray-200">
        <CardContent className="p-8 text-center">
          <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-muted-foreground">Leaderboard unavailable</p>
        </CardContent>
      </Card>
    );
  }

  const regionLabel = CAMEROON_REGIONS.find(
    (r) => r.value === data.userRegion
  )?.label;
  const leaders = view === "global" ? data.global : data.regional;

  return (
    <div className="space-y-4">
      {/* User's Rank Card */}
      <Card className="gradient-green border-0 text-white">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-200 text-xs">Your Global Rank</p>
              <p className="text-3xl font-bold mt-1">
                #{data.userRank}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1.5 text-gold-300">
                <Star className="w-5 h-5" />
                <span className="text-2xl font-bold">{data.userPoints}</span>
              </div>
              <p className="text-green-200 text-xs mt-0.5">Total Points</p>
            </div>
          </div>
          <p className="text-green-200 text-xs mt-3">
            Earn points by learning modules, logging impact, and helping the community!
          </p>
        </CardContent>
      </Card>

      {/* View Toggle */}
      <div className="flex gap-2">
        <Button
          variant={view === "global" ? "default" : "outline"}
          size="sm"
          onClick={() => setView("global")}
          className={
            view === "global"
              ? "bg-green-800 hover:bg-green-700 text-white"
              : ""
          }
        >
          <Globe className="w-4 h-4 mr-1.5" />
          Global
        </Button>
        {data.regional.length > 0 && (
          <Button
            variant={view === "regional" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("regional")}
            className={
              view === "regional"
                ? "bg-green-800 hover:bg-green-700 text-white"
                : ""
            }
          >
            <MapPin className="w-4 h-4 mr-1.5" />
            {regionLabel?.split(" ")[0] || "Regional"}
          </Button>
        )}
      </div>

      {/* Top 3 Podium */}
      {leaders.length >= 3 && (
        <div className="grid grid-cols-3 gap-3">
          {[leaders[1], leaders[0], leaders[2]].map((leader, podiumIndex) => {
            const rank = podiumIndex === 0 ? 2 : podiumIndex === 1 ? 1 : 3;
            const rLabel = CAMEROON_REGIONS.find(
              (r) => r.value === leader.region
            )?.label;

            return (
              <Card
                key={leader.id}
                className={cn(
                  "border text-center",
                  rank === 1
                    ? "border-gold-300 bg-gold-50 -mt-4 shadow-lg"
                    : "border-gray-200",
                  leader.isCurrentUser && "ring-2 ring-green-400"
                )}
              >
                <CardContent className="p-3 pt-4">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold",
                      rank === 1
                        ? "bg-gold-200 text-gold-800"
                        : rank === 2
                        ? "bg-gray-200 text-gray-700"
                        : "bg-amber-100 text-amber-700"
                    )}
                  >
                    {rank === 1 ? (
                      <Crown className="w-5 h-5" />
                    ) : (
                      <Medal className="w-5 h-5" />
                    )}
                  </div>
                  <p className="font-semibold text-gray-900 text-sm line-clamp-1">
                    {leader.fullName}
                  </p>
                  {rLabel && (
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {leader.city || rLabel.split(" ")[0]}
                    </p>
                  )}
                  <p className="text-lg font-bold text-gold-600 mt-1">
                    {leader.totalPoints}
                  </p>
                  <p className="text-[10px] text-muted-foreground">points</p>
                  <div className="flex items-center justify-center gap-2 mt-2 text-[10px] text-gray-500">
                    <span>🏅 {leader.badges}</span>
                    <span>🌍 {leader.impacts}</span>
                  </div>
                  {leader.isCurrentUser && (
                    <Badge className="text-[10px] bg-green-100 text-green-700 mt-2">
                      You
                    </Badge>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Full List */}
      <Card className="border border-gray-100">
        <CardContent className="p-0">
          <div className="divide-y divide-gray-50">
            {leaders.map((leader, index) => {
              const rLabel = CAMEROON_REGIONS.find(
                (r) => r.value === leader.region
              )?.label;

              return (
                <div
                  key={leader.id}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3",
                    leader.isCurrentUser && "bg-green-50"
                  )}
                >
                  <div
                    className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                      index === 0
                        ? "bg-gold-200 text-gold-800"
                        : index === 1
                        ? "bg-gray-200 text-gray-700"
                        : index === 2
                        ? "bg-amber-100 text-amber-700"
                        : "bg-gray-100 text-gray-500"
                    )}
                  >
                    {index + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">
                      {leader.fullName}
                      {leader.isCurrentUser && (
                        <Badge className="text-[10px] bg-green-100 text-green-700 ml-2">
                          You
                        </Badge>
                      )}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      {rLabel && (
                        <span className="flex items-center gap-0.5">
                          <MapPin className="w-3 h-3" />
                          {leader.city || rLabel.split(" ")[0]}
                        </span>
                      )}
                      <span>🏅 {leader.badges} badges</span>
                      <span>🌍 {leader.impacts} impacts</span>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-gray-900">
                      {leader.totalPoints}
                    </p>
                    <p className="text-[10px] text-muted-foreground">pts</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}