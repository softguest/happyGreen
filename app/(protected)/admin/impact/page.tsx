// src/app/admin/impact/page.tsx
import { getAdminImpactReport } from "@/actions/admin";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, MapPin } from "lucide-react";
import { CAMEROON_REGIONS } from "@/lib/constants";

export const metadata = { title: "Impact Report | Admin" };

export default async function AdminImpactPage() {
  const report = await getAdminImpactReport();

  return (
    <div className="space-y-6 p-2 md:p-8">
      <h1 className="text-2xl font-heading font-bold text-gray-900">
        Impact Report
      </h1>

      {/* By Category */}
      <Card className="border border-gray-100">
        <CardContent className="p-5">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Impact by Category
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 text-gray-500">Category</th>
                  <th className="text-right py-2 text-gray-500">Total</th>
                  <th className="text-right py-2 text-gray-500">Logs</th>
                  <th className="text-right py-2 text-gray-500">Users</th>
                </tr>
              </thead>
              <tbody>
                {report.byCategory.map((c) => (
                  <tr key={c.category} className="border-b border-gray-50">
                    <td className="py-2.5 capitalize font-medium">{c.category}</td>
                    <td className="py-2.5 text-right">
                      {Number(c.totalQuantity).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </td>
                    <td className="py-2.5 text-right">{c.logCount}</td>
                    <td className="py-2.5 text-right">{c.uniqueUsers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* By Region */}
      <Card className="border border-gray-100">
        <CardContent className="p-5">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Impact by Region
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 text-gray-500">Region</th>
                  <th className="text-right py-2 text-gray-500">Total</th>
                  <th className="text-right py-2 text-gray-500">Logs</th>
                  <th className="text-right py-2 text-gray-500">Users</th>
                </tr>
              </thead>
              <tbody>
                {report.byRegion.map((r) => {
                  const regionLabel = CAMEROON_REGIONS.find(
                    (cr) => cr.value === r.region
                  )?.label;
                  return (
                    <tr key={r.region || "unknown"} className="border-b border-gray-50">
                      <td className="py-2.5 font-medium">
                        {regionLabel || r.region || "Unknown"}
                      </td>
                      <td className="py-2.5 text-right">
                        {Number(r.totalQuantity).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </td>
                      <td className="py-2.5 text-right">{r.logCount}</td>
                      <td className="py-2.5 text-right">{r.uniqueUsers}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Top Contributors */}
      <Card className="border border-gray-100">
        <CardContent className="p-5">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Top Contributors
          </h2>
          <div className="space-y-2">
            {report.topContributors.map((c, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{c.fullName}</p>
                    <p className="text-[10px] text-muted-foreground">{c.region || "—"}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {c.logCount} logs
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}