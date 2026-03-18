// src/app/admin/layout.tsx
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const email = user.emailAddresses[0]?.emailAddress || "";

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="md:pl-64">
        <AdminTopBar
          adminName={`${user.firstName || ""} ${user.lastName || ""}`.trim()}
          adminEmail={email}
        />
        <main className="px-4 md:px-8 py-6">{children}</main>
      </div>
    </div>
  );
}