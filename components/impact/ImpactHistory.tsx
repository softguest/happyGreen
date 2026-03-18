// src/components/impact/ImpactHistory.tsx
"use client";

import { useTransition, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { deleteImpactLog } from "@/actions/impact";
import { cn } from "@/lib/utils";
import {
  Trash2,
  TreePine,
  Zap,
  Droplets,
  TrendingUp,
  Clock,
  Loader2,
  History,
  ChevronDown,
} from "lucide-react";
import { format } from "date-fns";

interface ImpactLog {
  id: string;
  userId: string;
  category: string;
  activityDescription: string;
  quantity: number;
  unit: string;
  dateLogged: Date;
  verified: boolean | null;
  createdAt: Date;
}

interface Props {
  logs: ImpactLog[];
}

const ICON_MAP: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; color: string; bg: string }
> = {
  waste: { icon: Trash2, color: "text-amber-600", bg: "bg-amber-100" },
  agriculture: { icon: TreePine, color: "text-green-600", bg: "bg-green-100" },
  energy: { icon: Zap, color: "text-yellow-600", bg: "bg-yellow-100" },
  water: { icon: Droplets, color: "text-blue-600", bg: "bg-blue-100" },
  income: { icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-100" },
};

export function ImpactHistory({ logs }: Props) {
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayLogs = showAll ? logs : logs.slice(0, 8);

  const handleDelete = (logId: string) => {
    setDeletingId(logId);
    startTransition(async () => {
      await deleteImpactLog(logId);
      setDeletingId(null);
    });
  };

  if (logs.length === 0) {
    return (
      <Card className="border-2 border-dashed border-gray-200">
        <CardContent className="p-8 text-center">
          <History className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <h3 className="font-heading font-semibold text-gray-600">
            No activities logged yet
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Start logging your green impact activities!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-heading font-semibold text-gray-800 flex items-center gap-2">
        <History className="w-5 h-5 text-gray-600" />
        Recent Activities
      </h2>

      <div className="space-y-2">
        {displayLogs.map((log) => {
          const iconConfig = ICON_MAP[log.category] || ICON_MAP.waste;
          const Icon = iconConfig.icon;
          const isDeleting = deletingId === log.id;

          return (
            <Card
              key={log.id}
              className="border border-gray-100 hover:border-gray-200 transition-all group"
            >
              <CardContent className="p-3 sm:p-4 flex items-center gap-3">
                {/* Icon */}
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                    iconConfig.bg
                  )}
                >
                  <Icon className={cn("w-5 h-5", iconConfig.color)} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 font-medium line-clamp-1">
                    {log.activityDescription}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <Badge
                      variant="outline"
                      className="text-[10px] font-bold"
                    >
                      {log.category === "income"
                        ? `${Number(log.quantity).toLocaleString()} ${log.unit}`
                        : `${Number(log.quantity)} ${log.unit}`}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                      <Clock className="w-3 h-3" />
                      {format(new Date(log.dateLogged), "dd MMM yyyy")}
                    </span>
                  </div>
                </div>

                {/* Delete */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(log.id)}
                  disabled={isDeleting}
                  className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all flex-shrink-0"
                >
                  {isDeleting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Show More */}
      {logs.length > 8 && !showAll && (
        <div className="text-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAll(true)}
            className="text-gray-600"
          >
            <ChevronDown className="w-4 h-4 mr-1" />
            Show all {logs.length} activities
          </Button>
        </div>
      )}
    </div>
  );
}