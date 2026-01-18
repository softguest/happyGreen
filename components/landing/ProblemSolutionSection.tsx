 import { TrendingDown, Lightbulb, Rocket } from "lucide-react";

const problems = [
  {
    icon: TrendingDown,
    title: "Youth Unemployment Crisis",
    description: "Over 70 million young people worldwide are unemployed, with limited access to future-proof skills.",
    color: "destructive" as const,
  },
  {
    icon: Lightbulb,
    title: "Skills Gap in Green Economy",
    description: "The green economy is growing fast, but there's a massive shortage of trained professionals.",
    color: "amber" as const,
  },
  {
    icon: Rocket,
    title: "Our Solution",
    description: "AI-powered training that matches youth with high-demand green skills and entrepreneurship opportunities.",
    color: "primary" as const,
  },
];

const colorClasses = {
  destructive: {
    bg: "bg-destructive/10",
    icon: "text-destructive",
    border: "border-destructive/20",
  },
  amber: {
    bg: "bg-amber/10",
    icon: "text-amber-dark",
    border: "border-amber/20",
  },
  primary: {
    bg: "bg-primary/10",
    icon: "text-primary",
    border: "border-primary/20",
  },
};

export const ProblemSolutionSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-cream">
      <div className="container-main">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            The Challenge & Opportunity
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Solving Two Global Crises at Once
          </h2>
          <p className="text-lg text-muted-foreground">
            We're bridging the gap between youth potential and the green economy's demand for skilled workers.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((item, index) => {
            const colors = colorClasses[item.color];
            return (
              <div
                key={item.title}
                className={`group relative bg-card rounded-2xl p-8 shadow-card border ${colors.border} hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-2`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${colors.bg} mb-6`}>
                  <item.icon className={`w-7 h-7 ${colors.icon}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>

                {/* Decorative corner */}
                {index === 2 && (
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-accent/10 rounded-bl-[100px] rounded-tr-2xl" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
