// src/components/layout/TopBar.tsx
"use client";

import { UserButton } from "@clerk/nextjs";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopBarProps {
  userName: string;
}

export function TopBar({ userName }: TopBarProps) {
  return (
    <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
      <div>
        <h2 className="text-lg font-heading font-semibold text-gray-800">
          Welcome back, {userName.split(" ")[0]}! 👋
        </h2>
        <p className="text-sm text-muted-foreground">
          Let&apos;s build green skills today
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-gold-500 rounded-full" />
        </Button>
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "w-9 h-9",
            },
          }}
        />
      </div>
    </header>
  );
}