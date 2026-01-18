import { Brain, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const recommendedSkills = [
  {
    id: 1,
    name: "Solar Panel Installation",
    category: "Renewable Energy",
    matchScore: 95,
    demandLevel: "High",
    estimatedTime: "4 weeks",
  },
  {
    id: 2,
    name: "Sustainable Agriculture",
    category: "Food Systems",
    matchScore: 88,
    demandLevel: "Growing",
    estimatedTime: "6 weeks",
  },
  {
    id: 3,
    name: "Green Building Design",
    category: "Construction",
    matchScore: 82,
    demandLevel: "High",
    estimatedTime: "8 weeks",
  },
];

export function RecommendedSkillsCard() {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-border bg-secondary/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
              <Brain className="w-5 h-5 text-amber-dark" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">AI Recommended for You</h3>
              <p className="text-sm text-muted-foreground">Based on your profile & market demand</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-accent/10 text-amber-dark border-accent/20">
            <Zap className="w-3 h-3 mr-1" />
            AI Match
          </Badge>
        </div>
      </div>

      {/* Skills list */}
      <div className="divide-y divide-border">
        {recommendedSkills.map((skill, index) => (
          <div 
            key={skill.id}
            className="p-4 hover:bg-muted/30 transition-colors group"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-foreground truncate">{skill.name}</h4>
                  <Badge variant="outline" className="shrink-0 text-xs">
                    {skill.matchScore}% match
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>{skill.category}</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                  <span>{skill.estimatedTime}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge 
                  variant="secondary" 
                  className={`shrink-0 ${
                    skill.demandLevel === "High" 
                      ? "bg-primary/10 text-primary" 
                      : "bg-green-medium/10 text-green-medium"
                  }`}
                >
                  {skill.demandLevel} demand
                </Badge>
                <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="p-4 bg-muted/20 border-t border-border">
        <Button className="w-full" variant="default">
          Explore All Recommended Skills
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
