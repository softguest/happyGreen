// src/app/onboarding/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { OnboardingForm } from "@/components/onboarding/OnboardingForm";
import { Leaf } from "lucide-react";

export default async function OnboardingPage() {
  const user = await currentUser();

  const defaultName =
    `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
    user?.emailAddresses[0]?.emailAddress?.split("@")[0] ||
    "";

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-800 rounded-2xl mb-4">
          <Leaf className="w-8 h-8 text-gold-500" />
        </div>
        <h1 className="text-3xl font-heading font-bold text-green-800">
          Welcome to GreenSkill Up
        </h1>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto">
          Let&apos;s set up your profile so we can recommend the best green skills
          and opportunities for you.
        </p>
      </div>

      {/* Form */}
      <OnboardingForm defaultName={defaultName} />
    </div>
  );
}