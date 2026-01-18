import { Sparkles, Sun } from "lucide-react";

interface WelcomeHeaderProps {
  userName: string;
}

export function WelcomeHeader({ userName }: WelcomeHeaderProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-hero p-6 lg:p-8">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-medium/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sun className="w-5 h-5 text-accent" />
            <span className="text-sm text-primary-foreground/70">{getGreeting()}</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-2">
            Welcome back, {userName}! 👋
          </h1>
          <p className="text-primary-foreground/80 max-w-md">
            You're making great progress. Let's continue building your green skills today.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-xl px-4 py-3">
          <Sparkles className="w-5 h-5 text-accent" />
          <div>
            <p className="text-xs text-primary-foreground/60">Current streak</p>
            <p className="text-lg font-bold text-primary-foreground">7 days 🔥</p>
          </div>
        </div>
      </div>
    </div>
  );
}
