// src/components/admin/AdminOverview.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CAMEROON_REGIONS, SKILL_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  Users,
  Brain,
  BookOpen,
  Lightbulb,
  BarChart3,
  Trophy,
  TrendingUp,
  MapPin,
  Calendar,
  Sparkles,
  Activity,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { format, parse } from "date-fns";

interface DashboardData {
  users: {
    total: number;
    thisMonth: number;
    thisWeek: number;
    byRegion: Array<{ region: string | null; count: number }>;
    growth: Array<{ month: string; count: number }>;
    recent: Array<{
      id: string;
      fullName: string;
      email: string | null;
      region: string | null;
      createdAt: Date;
    }>;
  };
  skills: {
    totalCatalog: number;
    totalSaved: number;
    byStatus: Array<{ status: string; count: number }>;
    topSkills: Array<{ skillName: string; category: string; saveCount: number }>;
  };
  learning: {
    totalPathways: number;
    publishedPathways: number;
    totalModules: number;
    completedModules: number;
  };
  business: {
    totalPlans: number;
    byStatus: Array<{ status: string; count: number }>;
  };
  impact: {
    totalLogs: number;
    byCategory: Array<{
      category: string;
      totalQuantity: number;
      logCount: number;
      uniqueUsers: number;
    }>;
    growth: Array<{ month: string; count: number; totalQuantity: number }>;
  };
  badges: {
    totalAwarded: number;
  };
}

interface Props {
  data: DashboardData;
}

const REGION_COLORS = [
  "#2E7D32", "#43A047", "#66BB6A", "#81C784", "#A5D6A7",
  "#F9A825", "#FFB300", "#FF8F00", "#E65100", "#BF360C",
];

export function AdminOverview({ data }: Props) {
  const userGrowthChart = data.users.growth.map((g) => {
    let label: string;
    try {
      label = format(parse(g.month, "yyyy-MM", new Date()), "MMM yy");
    } catch {
      label = g.month;
    }
    return { month: label, users: g.count };
  });

  const impactGrowthChart = data.impact.growth.map((g) => {
    let label: string;
    try {
      label = format(parse(g.month, "yyyy-MM", new Date()), "MMM yy");
    } catch {
      label = g.month;
    }
    return { month: label, logs: g.count };
  });

  const regionPieData = data.users.byRegion
    .filter((r) => r.region)
    .map((r) => ({
      name:
        CAMEROON_REGIONS.find((cr) => cr.value === r.region)?.label?.split(
          " "
        )[0] || r.region,
      value: r.count,
    }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Platform overview and analytics
        </p>
      </div>

      {/* ====== TOP STAT CARDS ====== */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard
          icon={<Users className="w-5 h-5 text-blue-600" />}
          label="Total Users"
          value={data.users.total}
          sub={`+${data.users.thisWeek} this week`}
          color="bg-blue-50 border-blue-200"
        />
        <StatCard
          icon={<Brain className="w-5 h-5 text-green-600" />}
          label="Skills in Catalog"
          value={data.skills.totalCatalog}
          sub={`${data.skills.totalSaved} saved`}
          color="bg-green-50 border-green-200"
        />
        <StatCard
          icon={<BookOpen className="w-5 h-5 text-purple-600" />}
          label="Pathways"
          value={data.learning.publishedPathways}
          sub={`${data.learning.totalModules} modules`}
          color="bg-purple-50 border-purple-200"
        />
        <StatCard
          icon={<Lightbulb className="w-5 h-5 text-amber-600" />}
          label="Business Plans"
          value={data.business.totalPlans}
          sub={`${data.business.byStatus.find((s) => s.status === "completed")?.count || 0} completed`}
          color="bg-amber-50 border-amber-200"
        />
        <StatCard
          icon={<BarChart3 className="w-5 h-5 text-orange-600" />}
          label="Impact Logs"
          value={data.impact.totalLogs}
          sub={`${data.impact.byCategory.length} categories`}
          color="bg-orange-50 border-orange-200"
        />
        <StatCard
          icon={<Trophy className="w-5 h-5 text-gold-600" />}
          label="Badges Awarded"
          value={data.badges.totalAwarded}
          sub="across all users"
          color="bg-gold-50 border-gold-200"
        />
      </div>

      {/* ====== CHARTS ROW ====== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        {userGrowthChart.length > 0 && (
          <Card className="border border-gray-100">
            <CardContent className="p-5">
              <h3 className="font-semibold text-gray-900 text-sm mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                User Growth (Last 6 Months)
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={userGrowthChart}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar
                    dataKey="users"
                    fill="#2E7D32"
                    radius={[4, 4, 0, 0]}
                    name="New Users"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Impact Growth */}
        {impactGrowthChart.length > 0 && (
          <Card className="border border-gray-100">
            <CardContent className="p-5">
              <h3 className="font-semibold text-gray-900 text-sm mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-orange-600" />
                Impact Activity (Last 6 Months)
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={impactGrowthChart}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="logs"
                    stroke="#EA580C"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Logs"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Users by Region */}
        {regionPieData.length > 0 && (
          <Card className="border border-gray-100">
            <CardContent className="p-5">
              <h3 className="font-semibold text-gray-900 text-sm mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-600" />
                Users by Region
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={regionPieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={45}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {regionPieData.map((_, i) => (
                      <Cell
                        key={i}
                        fill={REGION_COLORS[i % REGION_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Top Skills */}
        <Card className="border border-gray-100">
          <CardContent className="p-5">
            <h3 className="font-semibold text-gray-900 text-sm mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-green-600" />
              Most Popular Skills
            </h3>
            <div className="space-y-3">
              {data.skills.topSkills.map((skill, index) => {
                const catInfo = SKILL_CATEGORIES.find(
                  (c) => c.value === skill.category
                );
                const maxCount = data.skills.topSkills[0]?.saveCount || 1;

                return (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-800 font-medium line-clamp-1 flex-1">
                        {skill.skillName}
                      </span>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[10px] ml-2",
                          catInfo?.bgColor,
                          catInfo?.color
                        )}
                      >
                        {catInfo?.label?.split(" ")[0]}
                      </Badge>
                      <span className="text-xs text-muted-foreground ml-2">
                        {skill.saveCount}
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{
                          width: `${(skill.saveCount / maxCount) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
              {data.skills.topSkills.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No skills saved yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ====== IMPACT BY CATEGORY ====== */}
      {data.impact.byCategory.length > 0 && (
        <Card className="border border-gray-100">
          <CardContent className="p-5">
            <h3 className="font-semibold text-gray-900 text-sm mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-orange-600" />
              Impact by Category
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2 text-gray-500 font-medium">
                      Category
                    </th>
                    <th className="text-right py-2 text-gray-500 font-medium">
                      Total
                    </th>
                    <th className="text-right py-2 text-gray-500 font-medium">
                      Logs
                    </th>
                    <th className="text-right py-2 text-gray-500 font-medium">
                      Users
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.impact.byCategory.map((cat) => (
                    <tr
                      key={cat.category}
                      className="border-b border-gray-50"
                    >
                      <td className="py-2.5 font-medium text-gray-800 capitalize">
                        {cat.category}
                      </td>
                      <td className="py-2.5 text-right text-gray-700">
                        {Number(cat.totalQuantity).toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                        })}
                      </td>
                      <td className="py-2.5 text-right text-gray-600">
                        {cat.logCount}
                      </td>
                      <td className="py-2.5 text-right text-gray-600">
                        {cat.uniqueUsers}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ====== RECENT USERS ====== */}
      <Card className="border border-gray-100">
        <CardContent className="p-5">
          <h3 className="font-semibold text-gray-900 text-sm mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            Recent Registrations
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 text-gray-500 font-medium">
                    Name
                  </th>
                  <th className="text-left py-2 text-gray-500 font-medium">
                    Email
                  </th>
                  <th className="text-left py-2 text-gray-500 font-medium">
                    Region
                  </th>
                  <th className="text-left py-2 text-gray-500 font-medium">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.users.recent.map((user) => {
                  const regionLabel = CAMEROON_REGIONS.find(
                    (r) => r.value === user.region
                  )?.label;
                  return (
                    <tr
                      key={user.id}
                      className="border-b border-gray-50"
                    >
                      <td className="py-2.5 font-medium text-gray-800">
                        {user.fullName}
                      </td>
                      <td className="py-2.5 text-gray-600 text-xs">
                        {user.email || "—"}
                      </td>
                      <td className="py-2.5">
                        {regionLabel ? (
                          <Badge
                            variant="outline"
                            className="text-[10px]"
                          >
                            {regionLabel.split(" ")[0]}
                          </Badge>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="py-2.5 text-xs text-gray-500">
                        {format(
                          new Date(user.createdAt),
                          "dd MMM yyyy"
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  sub: string;
  color: string;
}) {
  return (
    <Card className={cn("border", color)}>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">{icon}</div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-700 font-medium">{label}</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>
      </CardContent>
    </Card>
  );
}