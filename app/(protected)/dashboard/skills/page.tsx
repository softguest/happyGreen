// src/app/dashboard/skills/page.tsx
import { getUserWithSkills, getAllGreenSkills } from "@/actions/skills";
import { redirect } from "next/navigation";
import { SkillAdvisorView } from "@/components/skills/SkillAdvisorView";

export const metadata = {
  title: "AI Skill Advisor | Greener Base",
};

export default async function SkillsPage() {
  const data = await getUserWithSkills();
  const allSkills = await getAllGreenSkills();

  if (!data) redirect("/onboarding");

  return (
    <div className="space-y-6 p-8">
        <SkillAdvisorView
        profile={data.profile}
        savedSkills={data.savedSkills}
        allSkills={allSkills}
        />
    </div>
  );
}