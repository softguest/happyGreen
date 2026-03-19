// src/app/admin/settings/page.tsx
import { getAdminLogs } from "@/actions/admin";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Activity } from "lucide-react";
import { format } from "date-fns";

export const metadata = { title: "Settings | Admin" };

export default async function AdminSettingsPage() {
  const logs = await getAdminLogs(30);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-gray-900">
        Admin Settings
      </h1>

      {/* Platform Info */}
      <Card className="border border-gray-100">
        <CardContent className="p-5">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Platform Information
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Platform</p>
              <p className="font-medium">GreenSkill Up v1.0</p>
            </div>
            <div>
              <p className="text-gray-500">Framework</p>
              <p className="font-medium">Next.js 16 + Drizzle ORM</p>
            </div>
            <div>
              <p className="text-gray-500">Database</p>
              <p className="font-medium">Neon PostgreSQL</p>
            </div>
            <div>
              <p className="text-gray-500">AI Model</p>
              <p className="font-medium">Google Gemini 2.0 Flash</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Admin Activity Log */}
      <Card className="border border-gray-100">
        <CardContent className="p-5">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Admin Activity Log
          </h2>
          {logs.length > 0 ? (
            <div className="space-y-2">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg text-sm"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] capitalize">
                      {log.action}
                    </Badge>
                    <span className="text-gray-700">
                      {log.entity}
                      {log.entityId ? ` (${log.entityId.substring(0, 8)}...)` : ""}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(log.createdAt), "dd MMM yyyy HH:mm")}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No admin actions recorded yet
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}