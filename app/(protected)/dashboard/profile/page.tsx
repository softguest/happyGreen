// src/app/dashboard/profile/page.tsx
import { getFullProfileData } from "@/actions/profile-page";
import { redirect } from "next/navigation";
import { ProfileView } from "@/components/profile/ProfileView";

export const metadata = {
  title: "My Profile | GreenSkill Hub",
};

export default async function ProfilePage() {
  const data = await getFullProfileData();

  if (!data) redirect("/onboarding");

  return <ProfileView data={data} />;
}