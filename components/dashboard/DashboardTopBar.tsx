// src/components/admin/AdminTopBar.tsx
"use client";

import { UserButton } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

interface Props {
  adminName: string;
  adminEmail: string;
}

export function DashboardTopBar({ adminName, adminEmail }: Props) {
  return (
    <header className="flex items-center justify-between px-4 md:px-8 py-4 bg-white border-b border-gray-200">
      <div className="flex items-center gap-3">
        <Badge className="bg-red-100 text-green-700 text-xs">
          <Shield className="w-3 h-3 mr-1" />
            {/* Dashboard */}
        </Badge>
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-gray-800">{adminName}</p>
          <p className="text-xs text-muted-foreground">{adminEmail}</p>
        </div>
      </div>
      <UserButton afterSignOutUrl="/" />
    </header>
  );
}