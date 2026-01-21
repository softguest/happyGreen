// app/api/onboarding/profile/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/config/db";
import { users } from "@/config/schema";
import { interests } from "@/config/schema";
import { userInterests } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { region, interests: selectedInterests } = body;

  // 1️⃣ Find DB user
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.clerkUserId, userId));

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // 2️⃣ Update region
  await db
    .update(users)
    .set({ region })
    .where(eq(users.id, user.id));

  // 3️⃣ Save interests
  for (const interestName of selectedInterests) {
    let [interest] = await db
      .select()
      .from(interests)
      .where(eq(interests.name, interestName));

    if (!interest) {
      [interest] = await db
        .insert(interests)
        .values({ name: interestName })
        .returning();
    }

    await db.insert(userInterests).values({
      userId: user.id,
      interestId: interest.id,
    });
  }

  return NextResponse.json({ success: true });
}
