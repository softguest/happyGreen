// src/app/admin/badges/page.tsx
import { db } from "@/config/db";
import { badges, userBadges } from "@/config/schema";
import { count, eq } from "drizzle-orm";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Badges | Admin" };

export default async function AdminBadgesPage() {
  const allBadges = await db.select().from(badges);

  const badgesWithCounts = await Promise.all(
    allBadges.map(async (badge) => {
      const [awarded] = await db
        .select({ count: count() })
        .from(userBadges)
        .where(eq(userBadges.badgeId, badge.id));
      return { ...badge, awardedCount: awarded?.count || 0 };
    })
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-gray-900">
        Badges Management
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {badgesWithCounts.map((badge) => (
          <Card key={badge.id} className="border border-gray-100">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{badge.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{badge.name}</p>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-[10px]">
                      +{badge.pointsAwarded} pts
                    </Badge>
                    <Badge variant="outline" className="text-[10px] capitalize">
                      {badge.category}
                    </Badge>
                    <Badge className="text-[10px] bg-blue-100 text-blue-700">
                      {badge.awardedCount} awarded
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}