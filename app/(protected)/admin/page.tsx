// src/app/admin/page.tsx
import { getAdminDashboardData } from "@/actions/admin";
import { AdminOverview } from "@/components/admin/AdminOverview";

export const metadata = {
  title: "Admin Dashboard | Greener Base",
};

export default async function AdminDashboardPage() {
  const data = await getAdminDashboardData();

  return <AdminOverview data={data} />;
}