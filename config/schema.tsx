// db/schema/users.ts
import { pgTable, text, timestamp,integer, uuid, boolean } from "drizzle-orm/pg-core";
// import { skills } from "./skills";
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  clerkUserId: text("clerk_user_id").notNull().unique(),

  fullName: text("full_name"),
  email: text("email"),

  region: text("region"), // e.g. "Centre", "Littoral"
  interests: text("interests").array(), // ["agriculture", "waste"]

  createdAt: timestamp("created_at").defaultNow(),
});

// db/schema/skills.ts
export const skills = pgTable("skills", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: text("title").notNull(),
  description: text("description").notNull(),

  category: text("category").notNull(), 
  // agriculture | waste | energy | water

  duration: text("duration"), // "2–3 weeks"
  tools: text("tools").array(), // ["gloves", "bags"]

  createdAt: timestamp("created_at").defaultNow(),
});

// db/schema/modules.ts
export const modules = pgTable("modules", {
  id: uuid("id").defaultRandom().primaryKey(),

  skillId: uuid("skill_id")
    .references(() => skills.id)
    .notNull(),

  title: text("title").notNull(),
  content: text("content"), // short lesson text

  order: integer("order").notNull(),
});

export const userSkills = pgTable("user_skills", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),

  skillId: uuid("skill_id")
    .references(() => skills.id)
    .notNull(),

  completed: boolean("completed").default(false),

  startedAt: timestamp("started_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const skillLevels = pgTable("skill_levels", {
  id: uuid("id").defaultRandom().primaryKey(),

  skillId: uuid("skill_id")
    .references(() => skills.id)
    .notNull(),

  level: text("level").notNull(), 
  // Beginner | Intermediate | Advanced

  order: integer("order").notNull(), // 1,2,3

  outcome: text("outcome"), // What learner can do after this level
});

export const learningSteps = pgTable("learning_steps", {
  id: uuid("id").defaultRandom().primaryKey(),

  skillLevelId: uuid("skill_level_id")
    .references(() => skillLevels.id)
    .notNull(),

  title: text("title").notNull(), // "Learn HTML basics"
  description: text("description"),

  order: integer("order").notNull(),
});

export const resources = pgTable("resources", {
  id: uuid("id").defaultRandom().primaryKey(),

  stepId: uuid("step_id")
    .references(() => learningSteps.id)
    .notNull(),

  title: text("title"),
  url: text("url"),
  type: text("type"), // video | article | course
});

export const userProgress = pgTable("user_progress", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),

  stepId: uuid("step_id")
    .references(() => learningSteps.id)
    .notNull(),

  completed: boolean("completed").default(false),
  completedAt: timestamp("completed_at"),
});

export const userModules = pgTable("user_modules", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),

  moduleId: uuid("module_id")
    .references(() => modules.id)
    .notNull(),

  completed: boolean("completed").default(false),
  completedAt: timestamp("completed_at"),
});

export const impact = pgTable("impact", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),

  skillsCompleted: integer("skills_completed").default(0),
  estimatedIncome: text("estimated_income"), // "50,000 – 100,000 FCFA"
  environmentalImpact: text("environmental_impact"), 
  // e.g. "Reduced plastic waste by ~20kg"

  updatedAt: timestamp("updated_at").defaultNow(),
});

export const businessPlans = pgTable("business_plans", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull(),
  skillId: uuid("skill_id").notNull(),

  idea: text("idea"),
  startupCost: text("startup_cost"),
  targetCustomers: text("target_customers"),

  createdAt: timestamp("created_at").defaultNow(),
});

export const interests = pgTable("interests", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(), // e.g. "Web Development"
});

export const userInterests = pgTable("user_interests", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),

  interestId: uuid("interest_id")
    .references(() => interests.id)
    .notNull(),
});