import { ArrowRight, Sparkles } from "lucide-react";
// import { Link } from "next/link";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const CTASection = () => {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container-main">
        <div className="relative bg-gradient-card rounded-3xl overflow-hidden shadow-card border border-border/50">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-24 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-foreground">
                Join 50,000+ changemakers
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 max-w-3xl mx-auto">
              Ready to Build Your
              <span className="text-primary"> Green Future?</span>
            </h2>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Start your journey today. Learn in-demand skills, connect with mentors, and make an impact on the planet.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link href="/dashboard">
                  Start Learning Free
                  <ArrowRight className="w-5 h-5" />
                </Link> 
              </Button>
              <Button variant="outline" size="xl">
                Talk to Our Team
              </Button>
            </div>

            {/* Trust indicators */}
            <p className="mt-8 text-sm text-muted-foreground">
              No credit card required • Free forever tier • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
