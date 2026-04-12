// src/components/admin/AdminTopBar.tsx
"use client";


import { useState} from "react";
import { UserButton } from "@clerk/nextjs";
import { DASHBOARD_NAV_ITEMS } from "@/lib/dashboard";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import LanguageSwitcher from "../LanguageSwitcher";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation"; // ✅ IMPORTANT (NOT next/link)
import { cn } from "@/lib/utils";
import { Leaf, Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

interface Props {
  adminName: string;
  adminEmail: string;
}

import {
  LayoutDashboard,
  User,
  Users,
  Brain,
  BookOpen,
  Lightbulb,
  BarChart3,
  Trophy,
  Settings,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  User,
  Users,
  Brain,
  BookOpen,
  Lightbulb,
  BarChart3,
  Trophy,
  Settings,
};

export function AdminTopBar({ adminName, adminEmail }: Props) {
  const t = useTranslations("nav"); // ✅ hook
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between px-4 md:px-8 py-4 bg-white border-b border-gray-200">
      <div className="flex items-center gap-3">
        {/* SideBar Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <div className="flex items-center gap-2">
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "md:hidden font-bold",
                  scrolled ? "text-gray-700" : "text-white"
                )}
              >
                <Menu className="w-6 h-6 text-black" />
              </Button>
            </SheetTrigger>
          </div>
          

          <SheetContent side="right" className="w-72 bg-white p-0">
            <div className="flex items-center gap-2.5 px-6 py-5 border-b">
              <div className="w-9 h-9 bg-green-800 rounded-xl flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-green-800">
                Side Bar Menu
              </span>
            </div>

            
            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1">
              {DASHBOARD_NAV_ITEMS.map((item) => {
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
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                      isActive
                        ? "bg-black-800 text-black"
                        : "text-black-400 hover:bg-gray-900/50 hover:text-white"
                    )}
                  >
                    {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="px-4 py-4 border-t space-y-2">
            <SignOutButton redirectUrl={`/${locale}/sign-in`}>
              <Button
                variant="outline"
                className="w-full cursor-pointer"
                onClick={() => setMobileOpen(false)}
              >
                {t("signOut")}
              </Button>
            </SignOutButton>

            </div>
          </SheetContent>
        </Sheet>
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-gray-800">{adminName}</p>
          <p className="text-xs text-muted-foreground">{adminEmail}</p>
        </div>
      </div>
      <div className="flex gap-4">
        <UserButton afterSignOutUrl="/" />
        <LanguageSwitcher />
      </div>
    </header>
  );
}