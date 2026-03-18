// src/components/impact/ImpactCharts.tsx
"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { format, parse } from "date-fns";
import { BarChart3, PieChartIcon, TrendingUp } from "lucide-react";

interface MonthlyData {
  month: string;
  category: string;
  totalQuantity: number;
  logCount: number;
}

interface WeeklyData {
  week: string;
  category: string;
  totalQuantity: number;
}

interface CategoryTotal {
  category: string;
  totalQuantity: number;
  logCount: number;
}

interface Props {
  monthlyData: MonthlyData[];
  weeklyData: WeeklyData[];
  categoryTotals: CategoryTotal[];
}

const COLORS: Record<string, string> = {
  waste: "#D97706",
  agriculture: "#15803D",
  energy: "#CA8A04",
  water: "#1D4ED8",
  income: "#059669",
};

const LABELS: Record<string, string> = {
  waste: "Waste",
  agriculture: "Agriculture",
  energy: "Energy",
  water: "Water",
  income: "Income",
};

export function ImpactCharts({
  monthlyData,
  weeklyData,
  categoryTotals,
}: Props) {
  // Transform monthly data for bar chart
  const barChartData = useMemo(() => {
    const months: Record<string, Record<string, number>> = {};

    monthlyData.forEach((d) => {
      if (!months[d.month]) months[d.month] = {};
      months[d.month][d.category] = Number(d.totalQuantity);
    });

    return Object.entries(months)
      .map(([month, categories]) => {
        let formattedMonth: string;
        try {
          const dateObj = parse(month, "yyyy-MM", new Date());
          formattedMonth = format(dateObj, "MMM yy");
        } catch {
          formattedMonth = month;
        }
        return {
          month: formattedMonth,
          ...categories,
        };
      })
      .slice(-6);
  }, [monthlyData]);

  // Pie chart data
  const pieChartData = useMemo(() => {
    return categoryTotals
      .filter((c) => Number(c.totalQuantity) > 0)
      .map((c) => ({
        name: LABELS[c.category] || c.category,
        value: c.logCount,
        color: COLORS[c.category] || "#6B7280",
      }));
  }, [categoryTotals]);

  // Activity trend (weekly)
  const trendData = useMemo(() => {
    const weeks: Record<string, number> = {};

    weeklyData.forEach((d) => {
      if (!weeks[d.week]) weeks[d.week] = 0;
      weeks[d.week] += Number(d.totalQuantity);
    });

    return Object.entries(weeks).map(([week, total], index) => ({
      week: `Week ${index + 1}`,
      activities: total,
    }));
  }, [weeklyData]);

  const hasData =
    monthlyData.length > 0 ||
    categoryTotals.some((c) => Number(c.totalQuantity) > 0);

  if (!hasData) {
    return (
      <Card className="border-2 border-dashed border-gray-200">
        <CardContent className="p-8 text-center">
          <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="font-heading font-semibold text-gray-600">
            No impact data yet
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Start logging activities to see your impact charts!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-heading font-semibold text-gray-800 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-green-700" />
        Impact Analytics
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Activity Bar Chart */}
        {barChartData.length > 0 && (
          <Card className="border border-gray-100">
            <CardContent className="p-5">
              <h3 className="font-semibold text-gray-900 text-sm mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-green-600" />
                Monthly Impact by Category
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: "#6B7280" }}
                  />
                  <YAxis tick={{ fontSize: 11, fill: "#6B7280" }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb",
                      fontSize: "12px",
                    }}
                  />
                  {Object.keys(COLORS).map((category) => (
                    <Bar
                      key={category}
                      dataKey={category}
                      name={LABELS[category]}
                      fill={COLORS[category]}
                      radius={[4, 4, 0, 0]}
                      stackId="stack"
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Distribution Pie Chart */}
        {pieChartData.length > 0 && (
          <Card className="border border-gray-100">
            <CardContent className="p-5">
              <h3 className="font-semibold text-gray-900 text-sm mb-4 flex items-center gap-2">
                <PieChartIcon className="w-4 h-4 text-blue-600" />
                Activity Distribution
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb",
                      fontSize: "12px",
                    }}
                    formatter={(value) => {
                        if (typeof value !== "number") return ["0 activities", ""];
                        return [`${value} activities`, ""];
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => (
                      <span className="text-xs text-gray-600">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Activity Trend */}
        {trendData.length > 1 && (
          <Card className="border border-gray-100 lg:col-span-2">
            <CardContent className="p-5">
              <h3 className="font-semibold text-gray-900 text-sm mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                Weekly Activity Trend (Last 4 Weeks)
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="week"
                    tick={{ fontSize: 11, fill: "#6B7280" }}
                  />
                  <YAxis tick={{ fontSize: 11, fill: "#6B7280" }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb",
                      fontSize: "12px",
                    }}
                  />
                  <defs>
                    <linearGradient
                      id="colorActivities"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#2E7D32"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="#2E7D32"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="activities"
                    stroke="#2E7D32"
                    strokeWidth={2}
                    fill="url(#colorActivities)"
                    name="Total Impact"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}