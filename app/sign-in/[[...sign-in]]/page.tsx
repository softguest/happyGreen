// src/app/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from "@clerk/nextjs";
import { Leaf } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-green-800 rounded-2xl mb-3">
            <Leaf className="w-7 h-7 text-gold-400" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-green-800">
            Welcome Back
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Sign in to continue your green journey
          </p>
        </div>
        <SignIn
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
          afterSignInUrl="/dashboard"
          signUpUrl="/sign-up"
        />
      </div>
    </div>
  );
}