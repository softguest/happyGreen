import { Users, GraduationCap, DollarSign, TreeDeciduous } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "50K+",
    label: "Youth Trained",
    description: "Young people empowered with green skills",
  },
  {
    icon: GraduationCap,
    value: "120+",
    label: "Courses",
    description: "AI-curated learning paths",
  },
  {
    icon: DollarSign,
    value: "$2M+",
    label: "Income Generated",
    description: "Earned by our graduates",
  },
  {
    icon: TreeDeciduous,
    value: "100K",
    label: "Tons CO₂ Saved",
    description: "Through green initiatives",
  },
];

export const ImpactSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-hero relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }} />
      </div>

      <div className="container-main relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            Our Impact
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Making a Real Difference
          </h2>
          <p className="text-lg text-primary-foreground/80">
            Together, we're building a sustainable future — one skill at a time.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-2xl p-8 text-center hover:bg-primary-foreground/15 transition-all duration-500"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-accent" />
              </div>

              {/* Value */}
              <div className="text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-2">
                {stat.value}
              </div>

              {/* Label */}
              <div className="text-lg font-semibold text-primary-foreground mb-2">
                {stat.label}
              </div>

              {/* Description */}
              <p className="text-sm text-primary-foreground/60">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
