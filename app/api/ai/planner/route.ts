// src/app/api/ai/planner/route.ts

import { streamText } from "ai";
import { geminiModel } from "@/lib/ai/gemini";
import {
  buildPlannerSystemPrompt,
  buildSectionPrompt,
  buildFullPlanReviewPrompt,
} from "@/lib/ai/business-prompts";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/config/db";
import { userProfiles } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();

    const {
      mode = "chat",
      section,
      planContext,
      plan,
      messages,
    } = body;

    // ✅ Validate messages
    if (mode === "chat") {
      if (!messages || !Array.isArray(messages)) {
        return new Response("Invalid messages format", { status: 400 });
      }
    }

    // ✅ Get user profile
    const profiles = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.clerkId, userId))
      .limit(1);

    const profile = profiles[0];

    if (!profile) {
      return new Response("Profile not found", { status: 404 });
    }

    // ✅ Build system prompt (personalized)
    const systemPrompt = buildPlannerSystemPrompt({
      fullName: profile.fullName,
      region: profile.region,
      city: profile.city,
      availableResources: (profile.availableResources as string[]) || [],
    });

    // =========================
    // 🧠 MODE HANDLING
    // =========================

    // ✅ 1. CHAT MODE (streaming conversation)
    if (mode === "chat") {
      const safeMessages = messages.map((m: any) => ({
        role: m.role,
        content: m.content,
      }));

      const result = streamText({
        model: geminiModel,
        system: systemPrompt,

        // ✅ Inject business context for smarter responses
        messages: [
          {
            role: "system",
            content: `Business Plan Context:
${planContext || "No context provided."}

You are helping the user refine, validate, and grow this business idea.`,
          },
          ...safeMessages,
        ],

        temperature: 0.7,
        maxOutputTokens: 1500,
      });

      return result.toTextStreamResponse();
    }

    // =========================
    // 🧱 2. GENERATE SECTION
    // =========================
    if (mode === "generate_section") {
      if (!section || !planContext) {
        return new Response("Missing section or context", { status: 400 });
      }

      const prompt = buildSectionPrompt(section, planContext);

      const result = streamText({
        model: geminiModel,
        system: systemPrompt,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        maxOutputTokens: 1500,
      });

      return result.toTextStreamResponse();
    }

    // =========================
    // 🔍 3. FULL PLAN REVIEW
    // =========================
    if (mode === "review") {
      if (!plan) {
        return new Response("Missing plan data", { status: 400 });
      }

      const prompt = buildFullPlanReviewPrompt(plan);

      const result = streamText({
        model: geminiModel,
        system: systemPrompt,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        maxOutputTokens: 1500,
      });

      return result.toTextStreamResponse();
    }

    // =========================
    // ❌ UNKNOWN MODE
    // =========================
    return new Response("Invalid mode", { status: 400 });

  } catch (error) {
    console.error("Planner AI error:", error);
    return new Response("AI service error", { status: 500 });
  }
}