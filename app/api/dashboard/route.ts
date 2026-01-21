// app/api/dashboard/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/config/db";
import { skills, userProgress } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // TEMP: simple recommendation logic
  const recommendedSkills = await db.select().from(skills).limit(3);

  return NextResponse.json({
    recommendedSkills,
  });
}
