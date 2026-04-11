// src/db/schema.ts
import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
  integer,
  jsonb,
  real,
  uniqueIndex,
  decimal 
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ============================================
// 1. USER PROFILES (extends Clerk user)
// ============================================
export const userProfiles = pgTable("user_profiles", {
    id: text("id").primaryKey(),
    clerkId: text("clerk_id").notNull().unique(),
    fullName: text("full_name").notNull(),
    email: text("email"),
    phone: text("phone"),
    region: text("region"),               // e.g., "Centre", "Littoral"
    city: text("city"),                   // e.g., "Yaoundé", "Douala"
    preferredLanguage: text("preferred_language").default("en").notNull(), // "en" | "fr"
    currentSituation: text("current_situation"),  // student | unemployed | employed | entrepreneur
    interests: jsonb("interests").$type<string[]>().default([]),          // ["agriculture", "waste_management"]
    availableResources: jsonb("available_resources").$type<string[]>().default([]), // ["land", "small_capital"]
    onboardingCompleted: boolean("onboarding_completed").default(false).notNull(),
    totalPoints: integer("total_points").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    clerkIdIdx: uniqueIndex("clerk_id_idx").on(table.clerkId),
  })
);

// ============================================
// 2. GREEN SKILLS CATALOG
// ============================================
export const greenSkills = pgTable("green_skills", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),            // agriculture | waste_management | renewable_energy | water_conservation
  description: text("description").notNull(),
  shortDescription: text("short_description"),
  difficulty: text("difficulty").default("beginner").notNull(), // beginner | intermediate | advanced
  estimatedDuration: text("estimated_duration"),    // e.g., "2 weeks"
  requiredResources: jsonb("required_resources").$type<string[]>().default([]),
  applicableRegions: jsonb("applicable_regions").$type<string[]>().default([]),  // empty = all regions
  marketPotential: text("market_potential"),         // low | medium | high
  climateBenefit: text("climate_benefit"),
  icon: text("icon"),                               // lucide icon name
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================
// 3. USER SKILLS (saved/recommended)
// ============================================
export const userSkills = pgTable("user_skills", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("clerk_id").notNull()
    .references(() => userProfiles.id, { onDelete: "cascade" }),
  skillId: uuid("skill_id")
    .notNull()
    .references(() => greenSkills.id, { onDelete: "cascade" }),
  status: text("status").default("interested").notNull(), // interested | learning | completed
  recommendedByAi: boolean("recommended_by_ai").default(false).notNull(),
  aiRecommendationReason: text("ai_recommendation_reason"),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================
// 4. LEARNING PATHWAYS
// ============================================
export const learningPathways = pgTable("learning_pathways", {
  id: uuid("id").defaultRandom().primaryKey(),
  skillId: uuid("skill_id")
    .notNull()
    .references(() => greenSkills.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  estimatedHours: real("estimated_hours").default(0),
  totalModules: integer("total_modules").default(0).notNull(),
  difficulty: text("difficulty").default("beginner").notNull(),
  prerequisites: jsonb("prerequisites").$type<string[]>().default([]),
  learningOutcomes: jsonb("learning_outcomes").$type<string[]>().default([]),
  isPublished: boolean("is_published").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================
// 5. LEARNING MODULES
// ============================================
export const learningModules = pgTable("learning_modules", {
  id: uuid("id").defaultRandom().primaryKey(),
  pathwayId: uuid("pathway_id")
    .notNull()
    .references(() => learningPathways.id, { onDelete: "cascade" }),
  orderIndex: integer("order_index").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),              // markdown or rich text
  summary: text("summary"),
  practicalTask: text("practical_task"),            // hands-on assignment
  durationMinutes: integer("duration_minutes").default(10),
  contentType: text("content_type").default("text").notNull(), // text | video | audio | mixed
  resources: jsonb("resources").$type<{ title: string; url: string }[]>().default([]),
  quizQuestions: jsonb("quiz_questions")
    .$type<
      {
        question: string;
        options: string[];
        correctIndex: number;
        explanation: string;
      }[]
    >()
    .default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================
// 6. USER MODULE PROGRESS
// ============================================
export const userModuleProgress = pgTable("user_module_progress", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull()
    .references(() => userProfiles.id, { onDelete: "cascade" }),
  moduleId: uuid("module_id")
    .notNull()
    .references(() => learningModules.id, { onDelete: "cascade" }),
  pathwayId: uuid("pathway_id")
    .notNull()
    .references(() => learningPathways.id, { onDelete: "cascade" }),
  status: text("status").default("not_started").notNull(), // not_started | in_progress | completed
  quizScore: integer("quiz_score"),
  quizAttempts: integer("quiz_attempts").default(0),
  practicalTaskCompleted: boolean("practical_task_completed").default(false),
  notes: text("notes"),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================
// 7. BUSINESS PLANS
// ============================================
export const businessPlans = pgTable("business_plans", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull()
    .references(() => userProfiles.id, { onDelete: "cascade" }),
  skillId: uuid("skill_id").references(() => greenSkills.id),
  title: text("title").notNull(),
  problemStatement: text("problem_statement"),
  solution: text("solution"),
  targetCustomers: text("target_customers"),
  revenueModel: text("revenue_model"),
  startupCostEstimate: real("startup_cost_estimate"),
  monthlyRevenueEstimate: real("monthly_revenue_estimate"),
  keyActivities: jsonb("key_activities").$type<string[]>().default([]),
  resourcesNeeded: jsonb("resources_needed").$type<string[]>().default([]),
  challenges: jsonb("challenges").$type<string[]>().default([]),
  aiSuggestions: jsonb("ai_suggestions").$type<Record<string, unknown>>().default({}),
  status: text("status").default("draft").notNull(), // draft | in_progress | completed
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================
// 8. IMPACT LOGS
// ============================================
export const impactLogs = pgTable("impact_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull()
    .references(() => userProfiles.id, { onDelete: "cascade" }),
  category: text("category").notNull(), // waste | agriculture | energy | water | income
  activityDescription: text("activity_description").notNull(),
  quantity: real("quantity").notNull(),
  unit: text("unit").notNull(),         // kg | trees | liters | XAF | kWh
  dateLogged: timestamp("date_logged").defaultNow().notNull(),
  verified: boolean("verified").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================
// 9. BADGES & ACHIEVEMENTS
// ============================================
export const badges = pgTable("badges", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  category: text("category").notNull(),   // learning | business | impact | community
  criteria: jsonb("criteria").$type<Record<string, unknown>>().default({}),
  pointsAwarded: integer("points_awarded").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userBadges = pgTable("user_badges", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull()
    .references(() => userProfiles.id, { onDelete: "cascade" }),
  badgeId: uuid("badge_id")
    .notNull()
    .references(() => badges.id, { onDelete: "cascade" }),
  earnedAt: timestamp("earned_at").defaultNow().notNull(),
});

// ============================================
// 10. AI CONVERSATION HISTORY
// ============================================
export const aiConversations = pgTable("ai_conversations", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull()
    .references(() => userProfiles.id, { onDelete: "cascade" }),
  conversationType: text("conversation_type").notNull(), // advisor | business_planner
  messages: jsonb("messages")
    .$type<{ role: string; content: string; timestamp: string }[]>()
    .default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Add to src/db/schema.ts — at the end, before relations
// ============================================
// 11. ADMIN SETTINGS & PLATFORM CONFIG
// ============================================
export const platformSettings = pgTable("platform_settings", {
  id: uuid("id").defaultRandom().primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  description: text("description"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const adminLogs = pgTable("admin_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  adminClerkId: text("admin_clerk_id").notNull(),
  action: text("action").notNull(),
  entity: text("entity").notNull(),        // user | skill | pathway | module | badge
  entityId: text("entity_id"),
  details: jsonb("details").$type<Record<string, unknown>>().default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================
// 12. COMMUNITY DISCUSSIONS
// ============================================
export const communityPosts = pgTable("community_posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userProfiles.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(), // question | tip | story | opportunity | event
  tags: jsonb("tags").$type<string[]>().default([]),
  likesCount: integer("likes_count").default(0).notNull(),
  repliesCount: integer("replies_count").default(0).notNull(),
  isPinned: boolean("is_pinned").default(false).notNull(),
  isPublished: boolean("is_published").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================
// 13. POST REPLIES
// ============================================
export const postReplies = pgTable("post_replies", {
  id: uuid("id").defaultRandom().primaryKey(),
  postId: uuid("post_id")
    .notNull()
    .references(() => communityPosts.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => userProfiles.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  likesCount: integer("likes_count").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================
// 14. POST LIKES
// ============================================
export const postLikes = pgTable("post_likes", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userProfiles.id, { onDelete: "cascade" }),
  postId: uuid("post_id").references(() => communityPosts.id, { onDelete: "cascade" }),
  replyId: uuid("reply_id").references(() => postReplies.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================
// 15. COMMUNITY EVENTS
// ============================================
export const communityEvents = pgTable("community_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  eventType: text("event_type").notNull(), // workshop | training | meetup | funding | competition
  location: text("location"),              // city or "Online"
  region: text("region"),
  date: timestamp("date").notNull(),
  endDate: timestamp("end_date"),
  link: text("link"),
  organizer: text("organizer"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Main table for the AI-generated content
export const aiGeneratedContent = pgTable('ai_generated_content', {
  id: uuid('id').primaryKey().defaultRandom(),
  moduleId: uuid('module_id').notNull().references(() => learningModules.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => userProfiles.id, { onDelete: 'cascade' }), // Clerk user ID is a string
  
  topic: text('topic').notNull(),
  promptUsed: text('prompt_used').notNull(),
  generatedContent: jsonb('generated_content').notNull(), // Will store structured JSON from Gemini
  contentType: text('content_type', { enum: ['deep_dive', 'explanation', 'case_study', 'exercise'] }).default('deep_dive'),
  
  userContext: jsonb('user_context'), // Store user location, interests, etc. at time of generation
  tokensUsed: integer('tokens_used'),
  generationQualityScore: decimal('generation_quality_score', { precision: 3, scale: 2 }), // For user feedback
  
  isBookmarked: boolean('is_bookmarked').default(false),
  helpfulCount: integer('helpful_count').default(0),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Table for interactive chat sessions related to a piece of generated content
export const aiContentChats = pgTable('ai_content_chats', {
  id: uuid('id').primaryKey().defaultRandom(),
  contentId: uuid('content_id').notNull().references(() => aiGeneratedContent.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => userProfiles.id, { onDelete: 'cascade' }),
  
  // Array of {role: 'user' | 'assistant', content: string, timestamp: string}
  messages: jsonb('messages').notNull(),
  contextSummary: text('context_summary'), // Optional: For summarizing long conversations
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Define relationships for type-safe queries
export const aiGeneratedContentRelations = relations(aiGeneratedContent, ({ one }) => ({
  user: one(userProfiles, {
    fields: [aiGeneratedContent.userId],
    references: [userProfiles.id],
  }),
  module: one(learningModules, {
    fields: [aiGeneratedContent.moduleId],
    references: [learningModules.id],
  }),
}));

export const aiContentChatsRelations = relations(aiContentChats, ({ one }) => ({
  user: one(userProfiles, {
    fields: [aiContentChats.userId],
    references: [userProfiles.id],
  }),
  content: one(aiGeneratedContent, {
    fields: [aiContentChats.contentId],
    references: [aiGeneratedContent.id],
  }),
}));

// ============================================
// RELATIONS
// ============================================
export const userProfileRelations = relations(userProfiles, ({ many }) => ({
  skills: many(userSkills),
  moduleProgress: many(userModuleProgress),
  businessPlans: many(businessPlans),
  impactLogs: many(impactLogs),
  badges: many(userBadges),
  aiConversations: many(aiConversations),
}));

export const greenSkillRelations = relations(greenSkills, ({ many }) => ({
  pathways: many(learningPathways),
  userSkills: many(userSkills),
  businessPlans: many(businessPlans),
}));

export const userSkillRelations = relations(userSkills, ({ one }) => ({
  user: one(userProfiles, {
    fields: [userSkills.userId],
    references: [userProfiles.id],
  }),
  skill: one(greenSkills, {
    fields: [userSkills.skillId],
    references: [greenSkills.id],
  }),
}));

export const learningPathwayRelations = relations(
  learningPathways,
  ({ one, many }) => ({
    skill: one(greenSkills, {
      fields: [learningPathways.skillId],
      references: [greenSkills.id],
    }),
    modules: many(learningModules),
  })
);

export const learningModuleRelations = relations(
  learningModules,
  ({ one, many }) => ({
    pathway: one(learningPathways, {
      fields: [learningModules.pathwayId],
      references: [learningPathways.id],
    }),
    progress: many(userModuleProgress),
  })
);

export const userModuleProgressRelations = relations(
  userModuleProgress,
  ({ one }) => ({
    user: one(userProfiles, {
      fields: [userModuleProgress.userId],
      references: [userProfiles.id],
    }),
    module: one(learningModules, {
      fields: [userModuleProgress.moduleId],
      references: [learningModules.id],
    }),
    pathway: one(learningPathways, {
      fields: [userModuleProgress.pathwayId],
      references: [learningPathways.id],
    }),
  })
);

export const businessPlanRelations = relations(businessPlans, ({ one }) => ({
  user: one(userProfiles, {
    fields: [businessPlans.userId],
    references: [userProfiles.id],
  }),
  skill: one(greenSkills, {
    fields: [businessPlans.skillId],
    references: [greenSkills.id],
  }),
}));

export const impactLogRelations = relations(impactLogs, ({ one }) => ({
  user: one(userProfiles, {
    fields: [impactLogs.userId],
    references: [userProfiles.id],
  }),
}));

export const userBadgeRelations = relations(userBadges, ({ one }) => ({
  user: one(userProfiles, {
    fields: [userBadges.userId],
    references: [userProfiles.id],
  }),
  badge: one(badges, {
    fields: [userBadges.badgeId],
    references: [badges.id],
  }),
}));

export const aiConversationRelations = relations(
  aiConversations,
  ({ one }) => ({
    user: one(userProfiles, {
      fields: [aiConversations.userId],
      references: [userProfiles.id],
    }),
  })
);

export const communityPostRelations = relations(communityPosts, ({ one, many }) => ({
  author: one(userProfiles, {
    fields: [communityPosts.userId],
    references: [userProfiles.id],
  }),
  replies: many(postReplies),
  likes: many(postLikes),
}));

export const postReplyRelations = relations(postReplies, ({ one }) => ({
  post: one(communityPosts, {
    fields: [postReplies.postId],
    references: [communityPosts.id],
  }),
  author: one(userProfiles, {
    fields: [postReplies.userId],
    references: [userProfiles.id],
  }),
}));

export const postLikeRelations = relations(postLikes, ({ one }) => ({
  user: one(userProfiles, {
    fields: [postLikes.userId],
    references: [userProfiles.id],
  }),
  post: one(communityPosts, {
    fields: [postLikes.postId],
    references: [communityPosts.id],
  }),
  reply: one(postReplies, {
    fields: [postLikes.replyId],
    references: [postReplies.id],
  }),
}));