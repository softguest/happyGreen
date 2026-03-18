// src/components/layout/MobileNav.tsx
"use client";

import { useState } from "react";
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
  Menu,
  X,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-green-800 text-white">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center">
            <Leaf className="w-5 h-5 text-green-900" />
          </div>
          <span className="font-heading font-bold">GreenSkill Hub</span>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-green-700"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-green-800 text-white border-green-700 p-0 w-72">
            <div className="px-6 py-5 border-b border-green-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold-500 rounded-xl flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-green-900" />
                </div>
                <div>
                  <h1 className="text-lg font-heading font-bold">GreenSkill</h1>
                  <p className="text-xs text-green-300">Hub</p>
                </div>
              </div>
            </div>
            <nav className="px-3 py-4 space-y-1">
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
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                      isActive
                        ? "bg-green-700 text-white"
                        : "text-green-200 hover:bg-green-700/50"
                    )}
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}