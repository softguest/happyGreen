"use client";

import { useState } from "react";
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  Wrench, 
  CheckCircle2, 
  Circle, 
  Lock,
  Play,
  FileText,
  HelpCircle,
  Rocket,
  Star,
  Trophy,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import Link from 'next/link';

// Dummy skill data
const skillData = {
  id: "solar-installation",
  title: "Solar Panel Installation",
  description: "Master the fundamentals of solar energy systems. Learn to design, install, and maintain residential solar panels — one of the fastest-growing green careers.",
  category: "Renewable Energy",
  duration: "4 weeks",
  hoursPerWeek: "5-7 hours",
  difficulty: "Beginner",
  enrolled: 2847,
  rating: 4.8,
  toolsNeeded: ["Safety gear", "Multimeter", "Basic hand tools", "Roof mounting kit"],
  instructor: {
    name: "James Mwangi",
    title: "Certified Solar Technician",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James"
  }
};

const modules = [
  {
    id: 1,
    title: "Introduction to Solar Energy",
    description: "Understand the basics of solar power and its environmental impact.",
    duration: "45 min",
    status: "completed" as const,
    lessons: [
      { id: 1, title: "What is Solar Energy?", type: "video", duration: "12 min", completed: true },
      { id: 2, title: "How Solar Panels Work", type: "video", duration: "15 min", completed: true },
      { id: 3, title: "Environmental Benefits", type: "reading", duration: "8 min", completed: true },
      { id: 4, title: "Module Quiz", type: "quiz", duration: "10 min", completed: true },
    ]
  },
  {
    id: 2,
    title: "Solar System Components",
    description: "Learn about panels, inverters, batteries, and mounting systems.",
    duration: "1 hr 20 min",
    status: "completed" as const,
    lessons: [
      { id: 5, title: "Types of Solar Panels", type: "video", duration: "18 min", completed: true },
      { id: 6, title: "Understanding Inverters", type: "video", duration: "20 min", completed: true },
      { id: 7, title: "Battery Storage Basics", type: "video", duration: "22 min", completed: true },
      { id: 8, title: "Mounting Systems Overview", type: "reading", duration: "10 min", completed: true },
      { id: 9, title: "Module Quiz", type: "quiz", duration: "10 min", completed: true },
    ]
  },
  {
    id: 3,
    title: "Site Assessment & Design",
    description: "Evaluate locations and design efficient solar installations.",
    duration: "1 hr 30 min",
    status: "in-progress" as const,
    lessons: [
      { id: 10, title: "Roof Assessment Checklist", type: "video", duration: "15 min", completed: true },
      { id: 11, title: "Sun Path Analysis", type: "video", duration: "18 min", completed: true },
      { id: 12, title: "System Sizing Calculator", type: "interactive", duration: "25 min", completed: false, current: true },
      { id: 13, title: "Design Best Practices", type: "reading", duration: "12 min", completed: false },
      { id: 14, title: "Hands-on Project", type: "project", duration: "20 min", completed: false },
    ]
  },
  {
    id: 4,
    title: "Installation Fundamentals",
    description: "Step-by-step guide to installing solar panel systems safely.",
    duration: "2 hrs",
    status: "locked" as const,
    lessons: [
      { id: 15, title: "Safety Protocols", type: "video", duration: "20 min", completed: false },
      { id: 16, title: "Mounting Installation", type: "video", duration: "30 min", completed: false },
      { id: 17, title: "Wiring & Connections", type: "video", duration: "35 min", completed: false },
      { id: 18, title: "System Testing", type: "video", duration: "25 min", completed: false },
      { id: 19, title: "Final Project", type: "project", duration: "30 min", completed: false },
    ]
  },
  {
    id: 5,
    title: "Maintenance & Troubleshooting",
    description: "Keep systems running efficiently and solve common problems.",
    duration: "1 hr 15 min",
    status: "locked" as const,
    lessons: [
      { id: 20, title: "Routine Maintenance", type: "video", duration: "20 min", completed: false },
      { id: 21, title: "Common Issues & Fixes", type: "video", duration: "25 min", completed: false },
      { id: 22, title: "Performance Monitoring", type: "interactive", duration: "15 min", completed: false },
      { id: 23, title: "Final Assessment", type: "quiz", duration: "15 min", completed: false },
    ]
  },
];

// Calculate progress
const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
const completedLessons = modules.reduce((acc, m) => acc + m.lessons.filter(l => l.completed).length, 0);
const progressPercent = Math.round((completedLessons / totalLessons) * 100);

const lessonTypeIcons = {
  video: Play,
  reading: FileText,
  quiz: HelpCircle,
  interactive: Wrench,
  project: Rocket,
};

export default function SkilledDetailedPage() {
  const [expandedModules, setExpandedModules] = useState<number[]>([3]); // Default expand in-progress module

  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-primary" />;
      case "in-progress":
        return <Circle className="w-5 h-5 text-accent fill-accent/20" />;
      default:
        return <Lock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-primary/10 text-primary border-0">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-accent/10 text-amber-dark border-0">In Progress</Badge>;
      default:
        return <Badge variant="secondary" className="text-muted-foreground">Locked</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-4 lg:p-6 space-y-6">
        {/* Back Navigation */}
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Skill Overview Header */}
        <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
          <div className="bg-gradient-hero p-6 lg:p-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge className="bg-primary-foreground/20 text-primary-foreground border-0">
                {skillData.category}
              </Badge>
              <Badge className="bg-primary-foreground/20 text-primary-foreground border-0">
                {skillData.difficulty}
              </Badge>
            </div>
            
            <h1 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-3">
              {skillData.title}
            </h1>
            <p className="text-primary-foreground/80 max-w-2xl mb-6">
              {skillData.description}
            </p>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-sm text-primary-foreground/70">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{skillData.duration} • {skillData.hoursPerWeek}/week</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{skillData.enrolled.toLocaleString()} enrolled</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-accent text-accent" />
                <span>{skillData.rating} rating</span>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="p-6 border-b border-border bg-secondary/20">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-medium text-foreground">Your Progress</p>
                <p className="text-sm text-muted-foreground">{completedLessons} of {totalLessons} lessons completed</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{progressPercent}%</p>
              </div>
            </div>
            <Progress value={progressPercent} className="h-3" />
            
            {/* Encouragement message */}
            <p className="mt-3 text-sm text-muted-foreground">
              🎯 Great progress! Complete 2 more lessons to unlock the next module.
            </p>
          </div>

          {/* Tools Needed */}
          <div className="p-6 bg-muted/20">
            <div className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium text-foreground mb-2">Tools & Materials Needed</p>
                <div className="flex flex-wrap gap-2">
                  {skillData.toolsNeeded.map((tool) => (
                    <Badge key={tool} variant="outline" className="font-normal">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Modules */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Learning Path</h2>
          
          <div className="space-y-3">
            {modules.map((module, moduleIndex) => {
              const isExpanded = expandedModules.includes(module.id);
              const moduleProgress = module.lessons.filter(l => l.completed).length;
              const isLocked = module.status === "locked";
              
              return (
                <div 
                  key={module.id}
                  className={`bg-card rounded-xl border shadow-soft overflow-hidden transition-all ${
                    isLocked ? "border-border opacity-60" : "border-border"
                  }`}
                >
                  {/* Module Header */}
                  <button
                    onClick={() => !isLocked && toggleModule(module.id)}
                    disabled={isLocked}
                    className={`w-full p-4 lg:p-5 flex items-center gap-4 text-left transition-colors ${
                      !isLocked ? "hover:bg-muted/30" : "cursor-not-allowed"
                    }`}
                  >
                    {/* Module number */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      module.status === "completed" 
                        ? "bg-primary text-primary-foreground" 
                        : module.status === "in-progress"
                        ? "bg-accent text-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {module.status === "completed" ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <span className="font-bold">{moduleIndex + 1}</span>
                      )}
                    </div>

                    {/* Module info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground truncate">{module.title}</h3>
                        {getStatusBadge(module.status)}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">{module.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>{module.lessons.length} lessons</span>
                        <span>{module.duration}</span>
                        {module.status !== "locked" && (
                          <span>{moduleProgress}/{module.lessons.length} completed</span>
                        )}
                      </div>
                    </div>

                    {/* Expand icon */}
                    {!isLocked && (
                      <div className="shrink-0 text-muted-foreground">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    )}
                  </button>

                  {/* Lessons List */}
                  {isExpanded && !isLocked && (
                    <div className="border-t border-border bg-muted/10">
                      {module.lessons.map((lesson, lessonIndex) => {
                        const LessonIcon = lessonTypeIcons[lesson.type as keyof typeof lessonTypeIcons] || FileText;
                        const isCurrent = 'current' in lesson && lesson.current;
                        
                        return (
                          <div
                            key={lesson.id}
                            className={`flex items-center gap-4 p-4 lg:px-5 border-b border-border/50 last:border-0 transition-colors ${
                              isCurrent ? "bg-accent/5" : "hover:bg-muted/20"
                            }`}
                          >
                            {/* Completion indicator */}
                            <div className="shrink-0">
                              {lesson.completed ? (
                                <CheckCircle2 className="w-5 h-5 text-primary" />
                              ) : isCurrent ? (
                                <div className="w-5 h-5 rounded-full border-2 border-accent bg-accent/20" />
                              ) : (
                                <Circle className="w-5 h-5 text-muted-foreground/40" />
                              )}
                            </div>

                            {/* Lesson icon */}
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                              lesson.completed 
                                ? "bg-primary/10 text-primary" 
                                : isCurrent 
                                ? "bg-accent/20 text-amber-dark"
                                : "bg-muted text-muted-foreground"
                            }`}>
                              <LessonIcon className="w-4 h-4" />
                            </div>

                            {/* Lesson info */}
                            <div className="flex-1 min-w-0">
                              <p className={`font-medium truncate ${
                                lesson.completed ? "text-muted-foreground" : "text-foreground"
                              }`}>
                                {lesson.title}
                              </p>
                              <p className="text-xs text-muted-foreground capitalize">
                                {lesson.type} • {lesson.duration}
                              </p>
                            </div>

                            {/* Action button */}
                            {isCurrent && (
                              <Button variant="hero" size="sm">
                                Continue
                              </Button>
                            )}
                            {lesson.completed && (
                              <Button variant="ghost" size="sm" className="text-muted-foreground">
                                Review
                              </Button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Turn Skill into Business CTA */}
        <div className="bg-gradient-card rounded-2xl border border-border shadow-card overflow-hidden">
          <div className="p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                    <Rocket className="w-5 h-5 text-amber-dark" />
                  </div>
                  <Badge className="bg-accent/10 text-amber-dark border-0">Coming Soon</Badge>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Turn This Skill Into a Business
                </h3>
                <p className="text-muted-foreground mb-4 lg:mb-0">
                  Complete this skill path to unlock our entrepreneurship module. Learn to start your own solar installation business, find customers, and scale your income.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 lg:shrink-0">
                <Button variant="default" size="lg" className="gap-2">
                  <Trophy className="w-4 h-4" />
                  View Business Path
                </Button>
              </div>
            </div>

            {/* Progress to unlock */}
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Complete skill to unlock</span>
                <span className="font-medium text-foreground">{progressPercent}% complete</span>
              </div>
              <Progress value={progressPercent} className="h-2" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
