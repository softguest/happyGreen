// src/components/landing/LandingPage.tsx
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { SkillsPreview } from "./SkillsPreview";
import { ImpactSection } from "./ImpactSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { CTASection } from "./CTASection";
import { FAQSection } from "./FAQSection";
import { Footer } from "./Footer";
import { LandingNav } from "./LandingNav";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNav />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <SkillsPreview />
      <ImpactSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}