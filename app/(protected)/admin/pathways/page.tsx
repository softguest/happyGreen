// src/app/admin/pathways/page.tsx
import { getAdminPathways } from "@/actions/admin";
import { AdminPathwaysView } from "@/components/admin/AdminPathwaysView";

export const metadata = { title: "Pathways | Admin" };

export default async function AdminPathwaysPage() {
  const pathways = await getAdminPathways();
  return <AdminPathwaysView pathways={pathways} />;
}