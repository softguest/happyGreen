// src/app/dashboard/business/[planId]/page.tsx
import { getBusinessPlan, getProfileForAI } from "@/actions/business";
import { notFound } from "next/navigation";
import { PlanEditor } from "@/components/business/PlanEditor";

interface Props {
  params: Promise<{ planId: string }>;
}

export default async function PlanEditorPage({ params }: Props) {
  const { planId } = await params;
  const data = await getBusinessPlan(planId);
  const profileContext = await getProfileForAI();

  if (!data) notFound();

  return <PlanEditor data={data} profileContext={profileContext} />;
}