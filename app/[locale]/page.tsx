// src/app/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { LandingPage } from "@/components/landing/LandingPage";

export default async function HomePage() {
  const { userId } = await auth();

  // If already signed in, redirect to dashboard
  if (userId) {
    redirect("/dashboard");
  }

  return <LandingPage />;
}