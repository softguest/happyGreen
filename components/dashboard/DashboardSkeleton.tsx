import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <Skeleton className="h-20 w-full" />

      {/* Quick Actions */}
      <div className="flex gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-40 flex-shrink-0" />
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>

      {/* Impact */}
      <Skeleton className="h-32 w-full" />
    </div>
  );
}
