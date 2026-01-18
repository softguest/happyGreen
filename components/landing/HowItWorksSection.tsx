import { UserPlus, Brain, Briefcase, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Sign Up",
    description: "Create your free account and complete a quick skills assessment.",
  },
  {
    number: "02",
    icon: Brain,
    title: "AI Matching",
    description: "Our AI analyzes your profile and matches you with relevant green skills.",
  },
  {
    number: "03",
    icon: Briefcase,
    title: "Learn & Build",
    description: "Access interactive courses, mentorship, and hands-on projects.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Earn & Grow",
    description: "Launch your green business or land jobs in the sustainable economy.",
  },
];

export const HowItWorksSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-green-light rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container-main relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            From sign-up to earning income in the green economy — in four simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-26 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative group cursor-pointer"
              >
                {/* Step Card */}
                <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft hover:shadow-card transition-all duration-500 hover:-translate-y-2 border border-border/50 h-full">
                  {/* Number Badge */}
                  <div className="relative mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-soft group-hover:scale-110 transition-transform duration-300">
                      {step.number}
                    </div>
                    {/* Pulse effect */}
                    <div className="absolute inset-0 w-12 h-12 rounded-full bg-primary/30 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-secondary mb-4">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow - Mobile */}
                {index < steps.length - 1 && (
                  <div className="hidden sm:block lg:hidden absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 text-primary/30">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
