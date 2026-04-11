// src/app/admin/skills/page.tsx
import { getAdminSkills } from "@/actions/admin";
import { AdminSkillsView } from "@/components/admin/AdminSkillsView";

export const metadata = { title: "Skills | Admin" };

export default async function AdminSkillsPage() {
  const skills = await getAdminSkills();
  return <AdminSkillsView skills={skills} />;
}