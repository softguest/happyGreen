// src/components/impact/CommunityImpact.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Users,
  Globe,
  MapPin,
  Trophy,
  TreePine,
  Trash2,
  Zap,
  Droplets,
  TrendingUp,
  Crown,
  Leaf,
} from "lucide-react";
import { CAMEROON_REGIONS } from "@/lib/constants";

interface CommunityData {
  communityTotals: Array<{
    category: string;
    totalQuantity: number;
    uniqueUsers: number;
    logCount: number;
  }>;
  regionalTotals: Array<{
    category: string;
    totalQuantity: number;
    uniqueUsers: number;
    logCount: number;
  }>;
  topContributors: Array<{
    userId: string;
    fullName: string;
    region: string | null;
    totalLogs: number;
    totalQuantity: number;
  }>;
  totalActiveUsers: number;
  userRegion: string | null;
}

interface Props {
  data: CommunityData | null;
  userName: string;
}

const CATEGORY_CONFIG: Record<
  string,
  {
    label: string;
    unit: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bg: string;
  }
> = {
  waste: {
    label: "Waste Reduced",
    unit: "kg",
    icon: Trash2,
    color: "text-amber-700",
    bg: "bg-amber-100",
  },
  agriculture: {
    label: "Crops & Trees",
    unit: "planted",
    icon: TreePine,
    color: "text-green-700",
    bg: "bg-green-100",
  },
  energy: {
    label: "Energy Saved",
    unit: "kWh",
    icon: Zap,
    color: "text-yellow-700",
    bg: "bg-yellow-100",
  },
  water: {
    label: "Water Conserved",
    unit: "liters",
    icon: Droplets,
    color: "text-blue-700",
    bg: "bg-blue-100",
  },
  income: {
    label: "Income Generated",
    unit: "XAF",
    icon: TrendingUp,
    color: "text-emerald-700",
    bg: "bg-emerald-100",
  },
};

export function CommunityImpact({ data, userName }: Props) {
  if (!data) {
    return (
      <Card className="border-2 border-dashed border-gray-200">
        <CardContent className="p-8 text-center">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-gray-600">
            Community data unavailable
          </h3>
        </CardContent>
      </Card>
    );
  }

  const regionLabel = CAMEROON_REGIONS.find(
    (r) => r.value === data.userRegion
  )?.label;

  return (
    <div className="space-y-6">
      {/* Community Header */}
      <Card className="gradient-green bg-green-800 border-0 text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-bold">
                Community Impact
              </h2>
              <p className="text-green-200 text-sm">
                GreenSkill Up collective achievements
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold">{data.totalActiveUsers}</p>
              <p className="text-xs text-green-200">Active Contributors</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold">
                {data.communityTotals.reduce(
                  (acc, c) => acc + c.logCount,
                  0
                )}
              </p>
              <p className="text-xs text-green-200">Total Activities</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center sm:col-span-1 col-span-2">
              <p className="text-2xl font-bold">
                {data.communityTotals.length}
              </p>
              <p className="text-xs text-green-200">Impact Categories</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Global Impact by Category */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Globe className="w-5 h-5 text-green-700" />
          Platform-Wide Impact
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.communityTotals.map((item) => {
            const config = CATEGORY_CONFIG[item.category];
            if (!config) return null;
            const Icon = config.icon;

            return (
              <Card key={item.category} className="border border-gray-100">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center",
                        config.bg
                      )}
                    >
                      <Icon className={cn("w-5 h-5", config.color)} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {config.label}
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        {item.category === "income"
                          ? Number(item.totalQuantity).toLocaleString()
                          : Number(item.totalQuantity).toLocaleString(undefined, {
                              maximumFractionDigits: 0,
                            })}{" "}
                        <span className="text-xs font-normal text-gray-500">
                          {config.unit}
                        </span>
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        by {item.uniqueUsers}{" "}
                        {item.uniqueUsers === 1 ? "user" : "users"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Regional Impact */}
      {data.regionalTotals.length > 0 && regionLabel && (
        <div>
          <h3 className="text-lg font-heading font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            Impact in {regionLabel}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.regionalTotals.map((item) => {
              const config = CATEGORY_CONFIG[item.category];
              if (!config) return null;
              const Icon = config.icon;

              return (
                <Card
                  key={item.category}
                  className="border border-blue-100 bg-blue-50/30"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center",
                          config.bg
                        )}
                      >
                        <Icon className={cn("w-5 h-5", config.color)} />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {config.label}
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          {Number(item.totalQuantity).toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}{" "}
                          <span className="text-xs font-normal text-gray-500">
                            {config.unit}
                          </span>
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {item.uniqueUsers} contributors in your region
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Leaderboard */}
      {data.topContributors.length > 0 && (
        <div>
          <h3 className="text-lg font-heading font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-gold-500" />
            Top Contributors This Month
          </h3>
          <Card className="border border-gray-100">
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {data.topContributors.map((contributor, index) => {
                  const isCurrentUser =
                    contributor.fullName === userName;
                  const regionName = CAMEROON_REGIONS.find(
                    (r) => r.value === contributor.region
                  )?.label;

                  return (
                    <div
                      key={contributor.userId}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3",
                        isCurrentUser && "bg-green-50"
                      )}
                    >
                      {/* Rank */}
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0",
                          index === 0
                            ? "bg-gold-100 text-gold-700"
                            : index === 1
                            ? "bg-gray-200 text-gray-600"
                            : index === 2
                            ? "bg-amber-100 text-amber-700"
                            : "bg-gray-100 text-gray-500"
                        )}
                      >
                        {index === 0 ? (
                          <Crown className="w-4 h-4" />
                        ) : (
                          index + 1
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p
                          className={cn(
                            "text-sm font-medium",
                            isCurrentUser
                              ? "text-green-800"
                              : "text-gray-800"
                          )}
                        >
                          {contributor.fullName}
                          {isCurrentUser && (
                            <Badge className="ml-2 text-[10px] bg-green-100 text-green-700">
                              You
                            </Badge>
                          )}
                        </p>
                        {regionName && (
                          <p className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                            <MapPin className="w-3 h-3" />
                            {regionName}
                          </p>
                        )}
                      </div>

                      {/* Stats */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-bold text-gray-900">
                          {contributor.totalLogs}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          activities
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Share Impact */}
      <Card className="border border-green-200 bg-green-50/50">
        <CardContent className="p-5 text-center">
          <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <h3 className="font-heading font-semibold text-gray-900">
            Share Your Impact
          </h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
            Inspire others by sharing your green impact achievements on social
            media.
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <ShareButton
              platform="whatsapp"
              text={`🌱 I'm making a difference with GreenSkill Up!\n\nJoin me in building green skills and tracking environmental impact in Cameroon.\n\n#GreenSkillUp #ClimateAction`}
            />
            <ShareButton
              platform="twitter"
              text={`🌱 Making a difference with @GreenSkillUp! Building green skills and tracking my environmental impact in Cameroon. #GreenSkillUp #ClimateAction #Cameroon`}
            />
            <ShareButton
              platform="facebook"
              text={`I'm using GreenSkill Up to build green skills and track my environmental impact in Cameroon! 🌱🌍`}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================
// Share Button
// ============================================
function ShareButton({
  platform,
  text,
}: {
  platform: "whatsapp" | "twitter" | "facebook";
  text: string;
}) {
  const encodedText = encodeURIComponent(text);
  const url = encodeURIComponent("https://greenskillup.com");

  const links: Record<string, { href: string; label: string; color: string; emoji: string }> = {
    whatsapp: {
      href: `https://wa.me/?text=${encodedText}%20${url}`,
      label: "WhatsApp",
      color: "bg-green-600 hover:bg-green-700 text-white",
      emoji: "💬",
    },
    twitter: {
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${url}`,
      label: "X / Twitter",
      color: "bg-gray-800 hover:bg-gray-900 text-white",
      emoji: "🐦",
    },
    facebook: {
      href: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodedText}`,
      label: "Facebook",
      color: "bg-blue-600 hover:bg-blue-700 text-white",
      emoji: "📘",
    },
  };

  const config = links[platform];

  return (
    <a
      href={config.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors",
        config.color
      )}
    >
      <span>{config.emoji}</span>
      {config.label}
    </a>
  );
}