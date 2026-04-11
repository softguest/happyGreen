// src/app/dashboard/business/page.tsx
import { getUserBusinessPlans, getUserSkillsForPlanning } from "@/actions/business";
import { BusinessPlansView } from "@/components/business/BusinessPlansView";

export const metadata = {
  title: "Business Planner | GreenSkill Up",
};

export default async function BusinessPage() {
  const plans = await getUserBusinessPlans();
  const skills = await getUserSkillsForPlanning();

  return (
    <BusinessPlansView
      plans={plans}
      userSkills={skills}
    />
  );
}