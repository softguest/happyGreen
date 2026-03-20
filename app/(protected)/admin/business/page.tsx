// src/app/admin/business/page.tsx
import { getAdminDashboardData } from "@/actions/admin";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb } from "lucide-react";

export const metadata = { title: "Business Plans | Admin" };

export default async function AdminBusinessPage() {
  const data = await getAdminDashboardData();

  return (
    <div className="space-y-6 p-2 md:p-8">
      <h1 className="text-2xl font-heading font-bold text-gray-900">
        Business Plans Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {data.business.byStatus.map((s) => (
          <Card key={s.status} className="border border-gray-100">
            <CardContent className="p-5 text-center">
              <Lightbulb className="w-6 h-6 text-gold-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{s.count}</p>
              <Badge variant="outline" className="text-xs mt-1 capitalize">
                {s.status.replace("_", " ")}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        Total plans: {data.business.totalPlans}
      </p>
    </div>
  );
}