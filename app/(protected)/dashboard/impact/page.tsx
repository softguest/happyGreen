// src/app/dashboard/impact/page.tsx
import { getImpactSummary, getCommunityImpact } from "@/actions/impact";
import { redirect } from "next/navigation";
import { ImpactDashboardView } from "@/components/impact/ImpactDashboardView";

export const metadata = {
  title: "My Impact | Greener Base",
};

export default async function ImpactPage() {
  const summary = await getImpactSummary();
  const community = await getCommunityImpact();

  if (!summary) redirect("/onboarding");

  return (
    <div className="space-y-6 p-8">
        <ImpactDashboardView
        summary={summary}
        community={community}
        />
    </div>
  );
}