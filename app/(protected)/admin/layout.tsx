// src/app/admin/layout.tsx
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isAdminId, isAdminEmail } from "@/lib/admin";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopBar } from "@/components/admin/AdminTopBar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const email = user.emailAddresses[0]?.emailAddress || "";
  const isAdmin = isAdminId(userId) || isAdminEmail(email);

  if (!isAdmin) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
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