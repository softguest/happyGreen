// src/components/community/CommunityView.tsx
"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageSquare,
  CalendarDays,
  Trophy,
  Users,
} from "lucide-react";

import { CommunityEvents } from "./CommunityEvents";

import { MemberDirectory } from "./MemberDirectory";
import { CommunityFeed } from "./CommunityFeed";
import { Leaderboard } from "./Leaderboard";

interface Props {
  feed: any;
  events: any;
  leaderboard: any;
  members: any;
  defaultTab?: string;
  defaultCategory?: string;
}

export function CommunityView({
  feed,
  events,
  leaderboard,
  members,
  defaultTab,
  defaultCategory,
}: Props) {
  const [activeTab, setActiveTab] = useState(defaultTab || "feed");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-gray-900">
          Community
        </h1>
        <p className="text-muted-foreground mt-1">
          Connect with fellow green champions, share experiences, and discover
          opportunities
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 bg-mist">
          <TabsTrigger
            value="feed"
            className="data-[state=active]:bg-green-800 data-[state=active]:text-white text-xs sm:text-sm"
          >
            <MessageSquare className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Discussion</span>
            <span className="sm:hidden">Feed</span>
          </TabsTrigger>
          <TabsTrigger
            value="events"
            className="data-[state=active]:bg-green-800 data-[state=active]:text-white text-xs sm:text-sm"
          >
            <CalendarDays className="w-4 h-4 mr-1 sm:mr-2" />
            Events
          </TabsTrigger>
          <TabsTrigger
            value="leaderboard"
            className="data-[state=active]:bg-green-800 data-[state=active]:text-white text-xs sm:text-sm"
          >
            <Trophy className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Leader</span>board
          </TabsTrigger>
          <TabsTrigger
            value="members"
            className="data-[state=active]:bg-green-800 data-[state=active]:text-white text-xs sm:text-sm"
          >
            <Users className="w-4 h-4 mr-1 sm:mr-2" />
            Members
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="mt-6">
          <CommunityFeed feed={feed} defaultCategory={defaultCategory} />
        </TabsContent>

        <TabsContent value="events" className="mt-6">
          <CommunityEvents data={events} />
        </TabsContent>

        <TabsContent value="leaderboard" className="mt-6">
          <Leaderboard data={leaderboard} />
        </TabsContent>

        <TabsContent value="members" className="mt-6">
          <MemberDirectory data={members} />
        </TabsContent>
      </Tabs>
    </div>
  );
}