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
  Bell
} from "lucide-react";
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
import Link from "next/link";
import { UserButton, useUser } from '@clerk/nextjs';
import { usePathname } from "next/navigation";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "My Courses", url: "/dashboard/courses", icon: BookOpen },
  { title: "Achievements", url: "/dashboard/achievements", icon: Trophy },
  { title: "Opportunities", url: "/dashboard/opportunities", icon: Briefcase },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { user } = useUser();
  const pathname = usePathname(); 
  const isActive = (path: string) => pathname === path;

  return (
    <Sidebar 
      className="border-r border-border bg-card"
      collapsible="icon"
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">HappiGreen</span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
        )}
      </div>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                  >
                    <Link 
                      href={item.url} 
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors"
                      // activeClassName="bg-primary text-primary-foreground"
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User section at bottom */}
      <div className="mt-auto border-t border-border p-4">
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
          <Avatar className="h-9 w-9">
            {/* <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria" />
            <AvatarFallback className="bg-primary text-primary-foreground">MO</AvatarFallback> */}
             {!user ? (
              <Link href="/sign-in">
                <button className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700">
                  Login
                </button>
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <UserButton />
                <span className="hidden lg:block text-sm font-semibold text-gray-700">
                  {user.firstName} {user.lastName}
                </span>
              </div>
            )}
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.emailAddresses.join(", ")}</p>
            </div>
          )}
          {!collapsed && (
            <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-foreground">
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </Sidebar>
  );
}

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useUser();
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top header */}
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground">
                <ChevronLeft className="h-5 w-5" />
              </SidebarTrigger>
              <h1 className="text-lg font-semibold text-foreground hidden sm:block">Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              </Button>
              <Avatar className="h-8 w-8 lg:hidden">
                {/* <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria" />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">MO</AvatarFallback> */}
                {!user ? (
                  <Link href="/sign-in">
                    <button className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700">
                      Login
                    </button>
                  </Link>
                ) : (
                  <div className="flex items-center gap-2">
                    <UserButton />
                    <span className="hidden lg:block text-sm font-semibold text-gray-700">
                      {user.firstName} {user.lastName}
                    </span>
                  </div>
                )}
              </Avatar>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

