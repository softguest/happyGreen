"use client";

import { ReactNode } from "react";
import {
  Home,
  BookOpen,
  Trophy,
  Briefcase,
  Settings,
  LogOut,
  Leaf,
  ChevronLeft,
  Bell,
} from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink } from "../NavLink";

/* ---------------- NAV CONFIG ---------------- */

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "My Courses", url: "/dashboard/courses", icon: BookOpen },
  { title: "Achievements", url: "/dashboard/achievements", icon: Trophy },
  { title: "Opportunities", url: "/dashboard/opportunities", icon: Briefcase },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

function getPageTitle(pathname: string) {
  const item = navItems.find((nav) => nav.url === pathname);
  return item?.title ?? "Dashboard";
}

/* ---------------- SIDEBAR ---------------- */

function DashboardSidebar() {
  const { state, open, setOpen } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        />
      )}

      <Sidebar
        collapsible="icon"
        className="
          fixed inset-y-0 left-0 z-40
          w-[260px]
          bg-card border-r border-border
          transform transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0
          data-[state=closed]:-translate-x-full
        "
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          {!collapsed ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">HappiGreen</span>
            </div>
          ) : (
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <SidebarContent className="px-2 py-4">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      tooltip={item.title}
                      onClick={() => setOpen(false)} // close on mobile nav
                    >
                      <NavLink
                        href={item.url}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors"
                        activeClassName="bg-primary text-primary-foreground"
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* User Section */}
        <div className="mt-auto border-t border-border p-4">
          <div
            className={`flex items-center ${
              collapsed ? "justify-center" : "gap-3"
            }`}
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria" />
              <AvatarFallback>MO</AvatarFallback>
            </Avatar>

            {!collapsed && (
              <>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    Maria Okonkwo
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    maria@email.com
                  </p>
                </div>
                <Button variant="ghost" size="icon">
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </Sidebar>
    </>
  );
}

/* ---------------- LAYOUT ---------------- */

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex bg-background">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Content */}
        <div className="flex flex-1 flex-col min-w-0 lg:pl-[260px]">
          {/* Header */}
          <header className="sticky top-0 z-30 h-16 border-b border-border bg-card flex items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <SidebarTrigger>
                <ChevronLeft className="h-5 w-5" />
              </SidebarTrigger>

              <h1 className="text-base sm:text-lg font-semibold truncate">
                {getPageTitle(pathname)}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              </Button>

              <Avatar className="h-8 w-8 lg:hidden">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria" />
                <AvatarFallback>MO</AvatarFallback>
              </Avatar>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
