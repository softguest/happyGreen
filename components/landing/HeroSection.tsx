import { Leaf, ArrowRight, Play } from "lucide-react";
// import { Link } from "next/link";
import { Button } from "@/components/ui/button";
import heroBg from "/bg-page.jpg";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/bg-page.jpg"
          alt="Young people learning green skills in nature"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-40 left-10 w-48 h-48 bg-green-medium/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="container-main relative z-10 py-20 lg:py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-up">
            <Leaf className="w-4 h-4 text-accent" />
            <span className="text-sm text-primary-foreground/90 font-medium">
              AI-Powered Green Skills Platform
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl text-primary-foreground sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Build Skills.
            <span className="block text-[#f9c31f]">Save the Planet.</span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-primary-foreground/80 leading-relaxed mb-10 max-w-2xl animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Empowering young people with AI-driven green skills and entrepreneurship training to tackle unemployment while fighting climate change.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="xl" asChild>
              <Link href="/dashboard">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl">
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Social proof */}
          <div className="mt-12 pt-8 border-t border-primary-foreground/10 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <p className="text-sm text-primary-foreground/60 mb-4">Trusted by organizations worldwide</p>
            <div className="flex flex-wrap items-center gap-8">
              <div className="text-primary-foreground/40 font-bold text-lg">UNEP</div>
              <div className="text-primary-foreground/40 font-bold text-lg">GIZ</div>
              <div className="text-primary-foreground/40 font-bold text-lg">WWF</div>
              <div className="text-primary-foreground/40 font-bold text-lg">Climate-KIC</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};
