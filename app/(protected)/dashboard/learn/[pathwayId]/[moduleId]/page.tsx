// src/app/dashboard/learn/[pathwayId]/[moduleId]/page.tsx
import { getModuleWithProgress } from "@/actions/learning";
import { notFound } from "next/navigation";
import { ModuleViewer } from "@/components/learning/ModuleViewer";

interface Props {
  params: Promise<{ pathwayId: string; moduleId: string }>;
}

export default async function ModulePage({ params }: Props) {
  const { pathwayId, moduleId } = await params;
  const data = await getModuleWithProgress(pathwayId, moduleId);

  if (!data) notFound();

  return <ModuleViewer data={data} />;
}