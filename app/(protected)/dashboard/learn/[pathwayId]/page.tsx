// src/app/dashboard/learn/[pathwayId]/page.tsx
import { getPathwayWithModules } from "@/actions/learning";
import { PathwayDetail } from "@/components/learning/PathwayDetail";
import { notFound } from "next/navigation";
// import { PathwayDetail } from "@/components/learning/PathwayDetail";

interface Props {
  params: Promise<{ pathwayId: string }>;
}

export default async function PathwayPage({ params }: Props) {
  const { pathwayId } = await params;
  const data = await getPathwayWithModules(pathwayId);

  if (!data) notFound();

  return <PathwayDetail data={data} />;
}