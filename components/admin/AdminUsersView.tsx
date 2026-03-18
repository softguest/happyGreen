// src/components/admin/AdminUsersView.tsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CAMEROON_REGIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  Search,
  Users,
  ChevronLeft,
  ChevronRight,
  Brain,
  BookOpen,
  Lightbulb,
  BarChart3,
  Trophy,
  MapPin,
  Star,
  Calendar,
  Filter,
  X,
} from "lucide-react";
import { format } from "date-fns";

interface UserWithStats {
  id: string;
  clerkId: string;
  fullName: string;
  email: string | null;
  phone: string | null;
  region: string | null;
  city: string | null;
  preferredLanguage: string;
  currentSituation: string | null;
  interests: unknown;
  availableResources: unknown;
  onboardingCompleted: boolean;
  totalPoints: number;
  createdAt: Date;
  updatedAt: Date;
  stats: {
    skills: number;
    modules: number;
    plans: number;
    impacts: number;
    badges: number;
  };
}

interface Props {
  data: {
    users: UserWithStats[];
    total: number;
    page: number;
    totalPages: number;
  };
  currentSearch: string;
  currentRegion: string;
}

export function AdminUsersView({ data, currentSearch, currentRegion }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState(currentSearch);

  const updateFilters = (params: Record<string, string>) => {
    const url = new URL(window.location.href);
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value);
      } else {
        url.searchParams.delete(key);
      }
    });
    url.searchParams.set("page", "1");
    router.push(url.pathname + url.search);
  };

  const handleSearch = () => {
    updateFilters({ search });
  };

  const clearFilters = () => {
    setSearch("");
    router.push("/admin/users");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">
            User Management
          </h1>
          <p className="text-muted-foreground mt-1">
            {data.total} total users on the platform
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card className="border border-gray-100">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search by name, email, or city..."
                className="pl-9"
              />
            </div>
            <Select
              value={currentRegion || "all"}
              onValueChange={(v) =>
                updateFilters({ region: v === "all" ? "" : v })
              }
            >
              <SelectTrigger className="w-48">
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
            <Button onClick={handleSearch} className="bg-gray-900 text-white">
              <Filter className="w-4 h-4 mr-1.5" />
              Filter
            </Button>
            {(currentSearch || currentRegion) && (
              <Button variant="ghost" onClick={clearFilters} className="text-gray-500">
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="border border-gray-100">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">User</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Location</th>
                  <th className="text-center px-4 py-3 text-gray-600 font-medium">
                    <Brain className="w-4 h-4 inline" />
                  </th>
                  <th className="text-center px-4 py-3 text-gray-600 font-medium">
                    <BookOpen className="w-4 h-4 inline" />
                  </th>
                  <th className="text-center px-4 py-3 text-gray-600 font-medium">
                    <Lightbulb className="w-4 h-4 inline" />
                  </th>
                  <th className="text-center px-4 py-3 text-gray-600 font-medium">
                    <BarChart3 className="w-4 h-4 inline" />
                  </th>
                  <th className="text-center px-4 py-3 text-gray-600 font-medium">
                    <Star className="w-4 h-4 inline" />
                  </th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody>
                {data.users.map((user) => {
                  const regionLabel = CAMEROON_REGIONS.find(
                    (r) => r.value === user.region
                  )?.label;

                  return (
                    <tr
                      key={user.id}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.fullName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {user.email || user.phone || "—"}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {regionLabel ? (
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <MapPin className="w-3 h-3" />
                            {user.city || regionLabel.split(" ")[0]}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-sm font-medium">{user.stats.skills}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-sm font-medium">{user.stats.modules}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-sm font-medium">{user.stats.plans}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-sm font-medium">{user.stats.impacts}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge variant="outline" className="text-[10px] text-gold-700 border-gold-200">
                          {user.totalPoints}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-gray-500">
                          {format(new Date(user.createdAt), "dd MMM yy")}
                        </span>
                      </td>
                    </tr>
                  );
                })}

                {data.users.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-muted-foreground">
                      No users found matching your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {data.totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
              <p className="text-xs text-muted-foreground">
                Page {data.page} of {data.totalPages} · {data.total} users
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={data.page <= 1}
                  onClick={() =>
                    updateFilters({
                      page: String(data.page - 1),
                      search: currentSearch,
                      region: currentRegion,
                    })
                  }
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={data.page >= data.totalPages}
                  onClick={() =>
                    updateFilters({
                      page: String(data.page + 1),
                      search: currentSearch,
                      region: currentRegion,
                    })
                  }
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}