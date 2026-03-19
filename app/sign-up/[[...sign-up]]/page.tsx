// src/app/sign-up/[[...sign-up]]/page.tsx
import { SignUp } from "@clerk/nextjs";
import { Leaf } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-green-800 rounded-2xl mb-3">
            <Leaf className="w-7 h-7 text-gold-400" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-green-800">
            Join GreenSkill Up
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Start your green skills journey — it&apos;s free!
          </p>
        </div>
        <SignUp
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-lg border border-gray-100 rounded-2xl",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              formButtonPrimary:
                "bg-green-800 hover:bg-green-700 text-white rounded-xl",
              footerActionLink: "text-green-700 hover:text-green-800",
            },
          }}
          afterSignUpUrl="/onboarding"
          signInUrl="/sign-in"
        />
      </div>
    </div>
  );
}