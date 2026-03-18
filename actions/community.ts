// src/actions/community.ts
"use server";

import { db } from "@/config/db";
import {
  userProfiles,
  communityPosts,
  postReplies,
  postLikes,
  communityEvents,
  userSkills,
  greenSkills,
  impactLogs,
  userBadges,
  badges,
} from "@/config/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and, desc, asc, count, sql, gte, or, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// ============================================
// Helper
// ============================================
async function getCurrentProfile() {
  const { userId } = await auth();
  if (!userId) return null;

  const profiles = await db
    .select()
    .from(userProfiles)
    .where(eq(userProfiles.clerkId, userId))
    .limit(1);

  return profiles[0] || null;
}

// ============================================
// GET COMMUNITY FEED
// ============================================
export async function getCommunityFeed(
  category?: string,
  page: number = 1,
  limit: number = 15
) {
  const profile = await getCurrentProfile();
  if (!profile) return null;

  const offset = (page - 1) * limit;

  let whereClause = eq(communityPosts.isPublished, true);
  if (category && category !== "all") {
    whereClause = and(
      eq(communityPosts.isPublished, true),
      eq(communityPosts.category, category)
    )!;
  }

  // Get posts with author info
  const posts = await db
    .select({
      post: communityPosts,
      author: {
        id: userProfiles.id,
        fullName: userProfiles.fullName,
        region: userProfiles.region,
        city: userProfiles.city,
        totalPoints: userProfiles.totalPoints,
      },
    })
    .from(communityPosts)
    .innerJoin(userProfiles, eq(communityPosts.userId, userProfiles.id))
    .where(whereClause)
    .orderBy(desc(communityPosts.isPinned), desc(communityPosts.createdAt))
    .limit(limit)
    .offset(offset);

  // Check which posts the current user has liked
  const postIds = posts.map((p) => p.post.id);

  let userLikes: Set<string> = new Set();
  if (postIds.length > 0) {
    const likes = await db
      .select({ postId: postLikes.postId })
      .from(postLikes)
      .where(
        and(
          eq(postLikes.userId, profile.id),
          sql`${postLikes.postId} = ANY(${postIds})`
        )
      );
    userLikes = new Set(likes.map((l) => l.postId!));
  }

  // Total count
  const [totalResult] = await db
    .select({ count: count() })
    .from(communityPosts)
    .where(whereClause);

  return {
    posts: posts.map((p) => ({
      ...p,
      isLikedByUser: userLikes.has(p.post.id),
      isOwnPost: p.author.id === profile.id,
    })),
    total: totalResult?.count || 0,
    page,
    totalPages: Math.ceil((totalResult?.count || 0) / limit),
    currentUserId: profile.id,
  };
}

// ============================================
// GET SINGLE POST WITH REPLIES
// ============================================
export async function getPostWithReplies(postId: string) {
  const profile = await getCurrentProfile();
  if (!profile) return null;

  const postData = await db
    .select({
      post: communityPosts,
      author: {
        id: userProfiles.id,
        fullName: userProfiles.fullName,
        region: userProfiles.region,
        city: userProfiles.city,
        totalPoints: userProfiles.totalPoints,
      },
    })
    .from(communityPosts)
    .innerJoin(userProfiles, eq(communityPosts.userId, userProfiles.id))
    .where(eq(communityPosts.id, postId))
    .limit(1);

  if (postData.length === 0) return null;

  // Get replies
  const replies = await db
    .select({
      reply: postReplies,
      author: {
        id: userProfiles.id,
        fullName: userProfiles.fullName,
        region: userProfiles.region,
        totalPoints: userProfiles.totalPoints,
      },
    })
    .from(postReplies)
    .innerJoin(userProfiles, eq(postReplies.userId, userProfiles.id))
    .where(eq(postReplies.postId, postId))
    .orderBy(asc(postReplies.createdAt));

  // Check user likes
  const postLikeCheck = await db
    .select()
    .from(postLikes)
    .where(
      and(
        eq(postLikes.userId, profile.id),
        eq(postLikes.postId, postId)
      )
    )
    .limit(1);

  // Check reply likes
  const replyIds = replies.map((r) => r.reply.id);
  let replyLikes: Set<string> = new Set();
  if (replyIds.length > 0) {
    const rLikes = await db
      .select({ replyId: postLikes.replyId })
      .from(postLikes)
      .where(
        and(
          eq(postLikes.userId, profile.id),
          sql`${postLikes.replyId} = ANY(${replyIds})`
        )
      );
    replyLikes = new Set(rLikes.map((l) => l.replyId!));
  }

  return {
    ...postData[0],
    isLikedByUser: postLikeCheck.length > 0,
    isOwnPost: postData[0].author.id === profile.id,
    replies: replies.map((r) => ({
      ...r,
      isLikedByUser: replyLikes.has(r.reply.id),
      isOwnReply: r.author.id === profile.id,
    })),
    currentUserId: profile.id,
  };
}

// ============================================
// CREATE POST
// ============================================
export async function createPost(data: {
  title: string;
  content: string;
  category: string;
  tags: string[];
}) {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "Unauthorized" };

  if (!data.title.trim() || !data.content.trim()) {
    return { success: false, error: "Title and content are required" };
  }

  try {
    const [post] = await db
      .insert(communityPosts)
      .values({
        userId: profile.id,
        title: data.title.trim(),
        content: data.content.trim(),
        category: data.category,
        tags: data.tags,
      })
      .returning();

    // Award points
    await db
      .update(userProfiles)
      .set({
        totalPoints: profile.totalPoints + 5,
        updatedAt: new Date(),
      })
      .where(eq(userProfiles.id, profile.id));

    revalidatePath("/dashboard/community");
    return { success: true, postId: post.id };
  } catch (error) {
    console.error("Create post error:", error);
    return { success: false, error: "Failed to create post" };
  }
}

// ============================================
// CREATE REPLY
// ============================================
export async function createReply(postId: string, content: string) {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false, error: "Unauthorized" };

  if (!content.trim()) {
    return { success: false, error: "Reply content is required" };
  }

  try {
    await db.insert(postReplies).values({
      postId,
      userId: profile.id,
      content: content.trim(),
    });

    // Update reply count
    await db
      .update(communityPosts)
      .set({
        repliesCount: sql`${communityPosts.repliesCount} + 1`,
        updatedAt: new Date(),
      })
      .where(eq(communityPosts.id, postId));

    // Award points
    await db
      .update(userProfiles)
      .set({
        totalPoints: profile.totalPoints + 3,
        updatedAt: new Date(),
      })
      .where(eq(userProfiles.id, profile.id));

    revalidatePath("/dashboard/community");
    return { success: true };
  } catch (error) {
    console.error("Create reply error:", error);
    return { success: false, error: "Failed to create reply" };
  }
}

// ============================================
// TOGGLE LIKE
// ============================================
export async function toggleLike(targetId: string, type: "post" | "reply") {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false };

  try {
    const likeCondition =
      type === "post"
        ? and(eq(postLikes.userId, profile.id), eq(postLikes.postId, targetId))
        : and(eq(postLikes.userId, profile.id), eq(postLikes.replyId, targetId));

    const existing = await db
      .select()
      .from(postLikes)
      .where(likeCondition!)
      .limit(1);

    if (existing.length > 0) {
      // Unlike
      await db.delete(postLikes).where(eq(postLikes.id, existing[0].id));

      if (type === "post") {
        await db
          .update(communityPosts)
          .set({ likesCount: sql`GREATEST(${communityPosts.likesCount} - 1, 0)` })
          .where(eq(communityPosts.id, targetId));
      } else {
        await db
          .update(postReplies)
          .set({ likesCount: sql`GREATEST(${postReplies.likesCount} - 1, 0)` })
          .where(eq(postReplies.id, targetId));
      }
    } else {
      // Like
      const likeData: Record<string, unknown> = { userId: profile.id };
      if (type === "post") likeData.postId = targetId;
      else likeData.replyId = targetId;

      await db.insert(postLikes).values(likeData as any);

      if (type === "post") {
        await db
          .update(communityPosts)
          .set({ likesCount: sql`${communityPosts.likesCount} + 1` })
          .where(eq(communityPosts.id, targetId));
      } else {
        await db
          .update(postReplies)
          .set({ likesCount: sql`${postReplies.likesCount} + 1` })
          .where(eq(postReplies.id, targetId));
      }
    }

    revalidatePath("/dashboard/community");
    return { success: true };
  } catch (error) {
    console.error("Toggle like error:", error);
    return { success: false };
  }
}

// ============================================
// DELETE POST
// ============================================
export async function deletePost(postId: string) {
  const profile = await getCurrentProfile();
  if (!profile) return { success: false };

  try {
    await db
      .delete(communityPosts)
      .where(
        and(
          eq(communityPosts.id, postId),
          eq(communityPosts.userId, profile.id)
        )
      );

    revalidatePath("/dashboard/community");
    return { success: true };
  } catch (error) {
    console.error("Delete post error:", error);
    return { success: false };
  }
}

// ============================================
// GET EVENTS
// ============================================
export async function getCommunityEvents() {
  const profile = await getCurrentProfile();
  if (!profile) return [];

  const now = new Date();

  const events = await db
    .select()
    .from(communityEvents)
    .where(
      and(
        eq(communityEvents.isActive, true),
        or(
          gte(communityEvents.date, now),
          gte(communityEvents.endDate, now)
        )
      )
    )
    .orderBy(asc(communityEvents.date))
    .limit(20);

  // Separate events by relevance to user's region
  const userRegion = profile.region;
  const localEvents = events.filter(
    (e) => e.region === userRegion || !e.region
  );
  const otherEvents = events.filter(
    (e) => e.region && e.region !== userRegion
  );

  return { localEvents, otherEvents, userRegion };
}

// ============================================
// GET LEADERBOARD
// ============================================
export async function getLeaderboard() {
  const profile = await getCurrentProfile();
  if (!profile) return null;

  // Global leaderboard (this month)
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const globalLeaders = await db
    .select({
      id: userProfiles.id,
      fullName: userProfiles.fullName,
      region: userProfiles.region,
      city: userProfiles.city,
      totalPoints: userProfiles.totalPoints,
    })
    .from(userProfiles)
    .where(eq(userProfiles.onboardingCompleted, true))
    .orderBy(desc(userProfiles.totalPoints))
    .limit(20);

  // Regional leaderboard
  let regionalLeaders: typeof globalLeaders = [];
  if (profile.region) {
    regionalLeaders = await db
      .select({
        id: userProfiles.id,
        fullName: userProfiles.fullName,
        region: userProfiles.region,
        city: userProfiles.city,
        totalPoints: userProfiles.totalPoints,
      })
      .from(userProfiles)
      .where(
        and(
          eq(userProfiles.region, profile.region),
          eq(userProfiles.onboardingCompleted, true)
        )
      )
      .orderBy(desc(userProfiles.totalPoints))
      .limit(15);
  }

  // Add badge count and impact count per leader
  const enrichLeader = async (leader: (typeof globalLeaders)[0]) => {
    const [badgeCount] = await db
      .select({ count: count() })
      .from(userBadges)
      .where(eq(userBadges.userId, leader.id));

    const [impactCount] = await db
      .select({ count: count() })
      .from(impactLogs)
      .where(eq(impactLogs.userId, leader.id));

    return {
      ...leader,
      badges: badgeCount?.count || 0,
      impacts: impactCount?.count || 0,
      isCurrentUser: leader.id === profile.id,
    };
  };

  const enrichedGlobal = await Promise.all(globalLeaders.map(enrichLeader));
  const enrichedRegional = await Promise.all(regionalLeaders.map(enrichLeader));

  // Current user's rank
  const [userRank] = await db
    .select({
      rank: sql<number>`(SELECT COUNT(*) + 1 FROM user_profiles WHERE total_points > ${profile.totalPoints} AND onboarding_completed = true)`,
    })
    .from(userProfiles)
    .where(eq(userProfiles.id, profile.id));

  return {
    global: enrichedGlobal,
    regional: enrichedRegional,
    userRegion: profile.region,
    currentUserId: profile.id,
    userRank: Number(userRank?.rank) || 0,
    userPoints: profile.totalPoints,
  };
}

// ============================================
// GET MEMBERS (people with similar interests)
// ============================================
export async function getCommunityMembers(
  filterInterest?: string,
  filterRegion?: string
) {
  const profile = await getCurrentProfile();
  if (!profile) return null;

  let conditions = [
    eq(userProfiles.onboardingCompleted, true),
    ne(userProfiles.id, profile.id),
  ];

  if (filterRegion) {
    conditions.push(eq(userProfiles.region, filterRegion));
  }

  const members = await db
    .select({
      id: userProfiles.id,
      fullName: userProfiles.fullName,
      region: userProfiles.region,
      city: userProfiles.city,
      currentSituation: userProfiles.currentSituation,
      interests: userProfiles.interests,
      totalPoints: userProfiles.totalPoints,
      createdAt: userProfiles.createdAt,
    })
    .from(userProfiles)
    .where(and(...conditions))
    .orderBy(desc(userProfiles.totalPoints))
    .limit(30);

  // Filter by interest in code (jsonb matching)
  let filteredMembers = members;
  if (filterInterest) {
    filteredMembers = members.filter((m) => {
      const interests = (m.interests as string[]) || [];
      return interests.includes(filterInterest);
    });
  }

  // Enrich with stats
  const enriched = await Promise.all(
    filteredMembers.map(async (member) => {
      const [skillCount] = await db
        .select({ count: count() })
        .from(userSkills)
        .where(eq(userSkills.userId, member.id));

      const [badgeCount] = await db
        .select({ count: count() })
        .from(userBadges)
        .where(eq(userBadges.userId, member.id));

      // Find shared interests with current user
      const userInterests = (profile.interests as string[]) || [];
      const memberInterests = (member.interests as string[]) || [];
      const sharedInterests = userInterests.filter((i) =>
        memberInterests.includes(i)
      );

      return {
        ...member,
        skills: skillCount?.count || 0,
        badges: badgeCount?.count || 0,
        sharedInterests,
      };
    })
  );

  return {
    members: enriched,
    currentUserInterests: (profile.interests as string[]) || [],
    currentUserRegion: profile.region,
  };
}