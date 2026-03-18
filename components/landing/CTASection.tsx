// src/components/landing/CTASection.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-cream relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-400 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-20 h-20 bg-green-800 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Leaf className="w-10 h-10 text-gold-400" />
        </div>

        <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 leading-tight">
          Ready to Build Your{" "}
          <span className="text-green-700">Green Future?</span>
        </h2>

        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Join hundreds of young Cameroonians who are turning green skills into
          sustainable livelihoods. It&apos;s free, AI-powered, and designed for you.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/sign-up">
            <Button
              size="lg"
              className="bg-green-800 hover:bg-green-700 text-white font-bold text-lg px-10 py-7 h-auto rounded-xl shadow-lg shadow-green-800/30"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Get Started — It&apos;s Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          No credit card required · Works on mobile · English & French
        </p>
      </div>
    </section>
  );
}