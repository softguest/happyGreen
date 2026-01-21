import { Plus, Search, MessageSquare, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const quickActions = [
  {
    icon: Plus,
    label: "New Skill",
    description: "Start a new course",
    variant: "default" as const,
  },
  {
    icon: Search,
    label: "Find Jobs",
    description: "Browse opportunities",
    variant: "outline" as const,
  },
  {
    icon: MessageSquare,
    label: "AI Mentor",
    description: "Get guidance",
    variant: "outline" as const,
  },
  {
    icon: Calendar,
    label: "Schedule",
    description: "Plan your week",
    variant: "outline" as const,
  },
];

export function QuickActions() {
  return (
    <section className="space-y-4">
      <h3 className="text-base sm:text-lg font-semibold text-foreground">
        Quick Actions
      </h3>

      {/* Mobile: horizontal scroll | Desktop: grid */}
      <div
        className="
          -mx-4 px-4
          gap-3 grid
          grid-cols-2
          lg:grid-cols-4
          scrollbar-hide
        "
      >
        {quickActions.map((action, index) => (
          <Button
            key={action.label}
            variant={action.variant}
            className={`
              flex-shrink-0
              min-w-[160px] sm:min-w-0
              h-auto flex-col gap-2 p-4
              rounded-xl
              transition-all
              ${index === 0 ? "bg-primary hover:bg-primary/90" : ""}
            `}
          >
            <action.icon className="w-5 h-5" />

            <div className="text-center">
              <p className="font-medium leading-tight">
                {action.label}
              </p>
              <p
                className={`text-xs leading-snug ${
                  index === 0
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground"
                }`}
              >
                {action.description}
              </p>
            </div>
          </Button>
        ))}
      </div>
    </section>
  );
}
