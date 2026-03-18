// src/app/admin/users/page.tsx
import { getAdminUsers } from "@/actions/admin";
import { AdminUsersView } from "@/components/admin/AdminUsersView";

export const metadata = { title: "Users | Admin" };

interface Props {
  searchParams: Promise<{ page?: string; search?: string; region?: string }>;
}

export default async function AdminUsersPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const search = params.search || "";
  const region = params.region || "";

  const data = await getAdminUsers(page, search, region);

  return <AdminUsersView data={data} currentSearch={search} currentRegion={region} />;
}