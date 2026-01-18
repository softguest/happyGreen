import { Play, Clock, CheckCircle2, BookOpen } from "lucide-react";
// import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const currentPath = {
  title: "Solar Energy Fundamentals",
  description: "Learn the basics of solar panel technology, installation, and maintenance.",
  progress: 65,
  totalModules: 12,
  completedModules: 8,
  nextLesson: "Module 9: Wiring & Safety Standards",
  estimatedTimeLeft: "2h 30min",
  lastAccessed: "2 hours ago",
};

export function LearningPathCard() {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
      {/* Header with progress visualization */}
      <div className="relative p-5 bg-gradient-to-r from-primary/5 to-secondary/50">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                <BookOpen className="w-3 h-3 mr-1" />
                Active Course
              </Badge>
              <Badge variant="outline" className="text-muted-foreground">
                <Clock className="w-3 h-3 mr-1" />
                {currentPath.lastAccessed}
              </Badge>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-1">{currentPath.title}</h3>
            <p className="text-sm text-muted-foreground">{currentPath.description}</p>
          </div>
        </div>

        {/* Progress section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Course Progress</span>
            <span className="font-semibold text-primary">{currentPath.progress}%</span>
          </div>
          <Progress value={currentPath.progress} className="h-3 bg-secondary" />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              {currentPath.completedModules}/{currentPath.totalModules} modules
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {currentPath.estimatedTimeLeft} left
            </span>
          </div>
        </div>
      </div>

      {/* Next lesson highlight */}
      <div className="p-4 border-t border-border bg-muted/20">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
              <Play className="w-5 h-5 text-amber-dark" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground mb-0.5">Up Next</p>
              <p className="font-medium text-foreground truncate">{currentPath.nextLesson}</p>
            </div>
          </div>
          <Button variant="hero" size="default" className="shrink-0" asChild>
            <Link href="/dashboard/skill/solar-installation">
              Continue
              <Play className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
