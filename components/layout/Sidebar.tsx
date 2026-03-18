// src/components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";
import {
  LayoutDashboard,
  Brain,
  BookOpen,
  Lightbulb,
  BarChart3,
  Users,
  UserCircle,
  Leaf,
  LogOut,
} from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  Brain,
  BookOpen,
  Lightbulb,
  BarChart3,
  Users,
  UserCircle,
};

export function Sidebar() {
  const pathname = usePathname();
  const { signOut } = useClerk();

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-30">
      <div className="flex flex-col flex-grow bg-green-800 text-white overflow-y-auto">
        {/* Brand */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-green-700">
          <div className="w-10 h-10 bg-gold-500 rounded-xl flex items-center justify-center">
            <Leaf className="w-6 h-6 text-green-900" />
          </div>
          <div>
            <h1 className="text-lg font-heading font-bold">GreenSkill</h1>
            <p className="text-xs text-green-300">Hub</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-green-700 text-white shadow-sm"
                    : "text-green-200 hover:bg-green-700/50 hover:text-white"
                )}
              >
                {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-green-700">
          <Button
            variant="ghost"
            className="w-full justify-start text-green-300 hover:text-white hover:bg-green-700/50"
            onClick={() => signOut({ redirectUrl: "/" })}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>
    </aside>
  );
}