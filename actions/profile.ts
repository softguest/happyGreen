// src/actions/profile.ts
"use server";

import { db } from "@/config/db";
import { userProfiles } from "@/config/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import type { OnboardingFormData } from "@/types";

export async function getUserProfile() {
  const { userId } = await auth();
  if (!userId) return null;

  const profiles = await db
    .select()
    .from(userProfiles)
    .where(eq(userProfiles.clerkId, userId))
    .limit(1);

  return profiles[0] || null;
}

export async function completeOnboarding(data: OnboardingFormData) {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    // Check if profile already exists
    const existing = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.clerkId, userId))
      .limit(1);

    if (existing.length > 0) {
      // Update existing profile
      await db
        .update(userProfiles)
        .set({
          fullName: data.fullName,
          preferredLanguage: data.preferredLanguage,
          region: data.region,
          city: data.city,
          currentSituation: data.currentSituation,
          interests: data.interests,
          availableResources: data.availableResources,
          onboardingCompleted: true,
          updatedAt: new Date(),
        })
    } else {
      // Create new profile
      await db.insert(userProfiles).values({
        id: randomUUID(),
        clerkId: userId,
        fullName: data.fullName || "",
        email: user?.emailAddresses?.[0]?.emailAddress || "",
        phone: user?.phoneNumbers?.[0]?.phoneNumber || "",
        preferredLanguage: data.preferredLanguage,
        region: data.region,
        city: data.city,
        currentSituation: data.currentSituation,
        interests: data.interests,
        availableResources: data.availableResources,
        onboardingCompleted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Onboarding error:", error);
    return { success: false, error: "Failed to save profile" };
  }
}

export async function updateProfile(data: Partial<OnboardingFormData>) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  try {
    await db
      .update(userProfiles)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(userProfiles.clerkId, userId));

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/profile");
    return { success: true };
  } catch (error) {
    console.error("Update profile error:", error);
    return { success: false, error: "Failed to update profile" };
  }
}