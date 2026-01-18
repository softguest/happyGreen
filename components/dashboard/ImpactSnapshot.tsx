import { GraduationCap, DollarSign, TreeDeciduous, Award } from "lucide-react";

const impactStats = [
  {
    icon: GraduationCap,
    value: "12",
    label: "Skills Completed",
    change: "+3 this month",
    color: "primary" as const,
  },
  {
    icon: DollarSign,
    value: "$2,400",
    label: "Est. Monthly Income",
    change: "+$600 potential",
    color: "accent" as const,
  },
  {
    icon: TreeDeciduous,
    value: "2.4t",
    label: "CO₂ Saved Yearly",
    change: "From your skills",
    color: "green" as const,
  },
  {
    icon: Award,
    value: "3",
    label: "Certifications",
    change: "1 in progress",
    color: "secondary" as const,
  },
];

const colorClasses = {
  primary: {
    bg: "bg-primary/10",
    icon: "text-primary",
    text: "text-primary",
  },
  accent: {
    bg: "bg-accent/10",
    icon: "text-amber-dark",
    text: "text-amber-dark",
  },
  green: {
    bg: "bg-green-medium/10",
    icon: "text-green-medium",
    text: "text-green-medium",
  },
  secondary: {
    bg: "bg-secondary",
    icon: "text-secondary-foreground",
    text: "text-secondary-foreground",
  },
};

export function ImpactSnapshot() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Your Impact</h3>
        <a href="#" className="text-sm text-primary hover:underline">View details →</a>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {impactStats.map((stat) => {
          const colors = colorClasses[stat.color];
          return (
            <div
              key={stat.label}
              className="bg-card rounded-xl border border-border p-4 shadow-soft hover:shadow-card transition-shadow"
            >
              <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${colors.icon}`} />
              </div>
              <p className={`text-2xl font-bold ${colors.text} mb-1`}>{stat.value}</p>
              <p className="text-sm font-medium text-foreground mb-0.5">{stat.label}</p>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
