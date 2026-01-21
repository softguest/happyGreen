// app/api/user/profile/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/config/db";
import { users } from "@/config/schema";
import { eq } from "drizzle-orm";


export async function POST(req: Request) {
  const { userId } =await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { region, interests } = body;

  if (!region || !Array.isArray(interests)) {
    return NextResponse.json(
      { error: "Invalid payload" },
      { status: 400 }
    );
  }

  await db
    .update(users)
    .set({
      region,
      interests,
    })
    .where(eq(users.clerkUserId, userId));

  return NextResponse.json({ success: true });
}
