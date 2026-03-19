// src/app/dashboard/business/new/page.tsx
import { getUserSkillsForPlanning } from "@/actions/business";
import { NewPlanWizard } from "@/components/business/NewPlanWizard";

export const metadata = {
  title: "New Business Plan | Greener Base",
};

export default async function NewPlanPage() {
  const skills = await getUserSkillsForPlanning();

  return <NewPlanWizard userSkills={skills} />;
}