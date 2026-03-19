// src/app/dashboard/community/page.tsx
import {
  getCommunityFeed,
  getCommunityEvents,
  getLeaderboard,
  getCommunityMembers,
} from "@/actions/community";
import { redirect } from "next/navigation";
import { CommunityView } from "@/components/community/CommunityView";

export const metadata = {
  title: "Community | Greener Base",
};

interface Props {
  searchParams: Promise<{ tab?: string; category?: string }>;
}

export default async function CommunityPage({ searchParams }: Props) {
  const params = await searchParams;
  const feed = await getCommunityFeed(params.category);
  const events = await getCommunityEvents();
  const leaderboard = await getLeaderboard();
  const members = await getCommunityMembers();

  if (!feed) redirect("/onboarding");

  return (
    <CommunityView
      feed={feed}
      events={events}
      leaderboard={leaderboard}
      members={members}
      defaultTab={params.tab}
      defaultCategory={params.category}
    />
  );
}