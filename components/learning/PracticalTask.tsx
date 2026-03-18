// src/components/learning/PracticalTask.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { CheckCircle2, Hammer, Camera, ArrowRight } from "lucide-react";

interface Props {
  task: string;
  completed: boolean;
  onToggle: () => void;
}

export function PracticalTask({ task, completed, onToggle }: Props) {
  return (
    <div className="space-y-4">
      {/* Intro */}
      <Card className="border border-gold-200 bg-gold-50/50">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gold-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Hammer className="w-5 h-5 text-gold-700" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-gray-900">
                Practical Task
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Apply what you&apos;ve learned with this hands-on activity. This
                is how real skills are built!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task Content */}
      <Card
        className={cn(
          "border-2 transition-all",
          completed
            ? "border-green-300 bg-green-50/30"
            : "border-gray-200"
        )}
      >
        <CardContent className="p-5 md:p-6">
          <div className="flex items-start gap-4">
            <div className="pt-1">
              <Checkbox
                checked={completed}
                onCheckedChange={onToggle}
                className="w-6 h-6 border-2 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
              />
            </div>
            <div className="flex-1">
              <p
                className={cn(
                  "text-gray-800 leading-relaxed",
                  completed && "line-through text-gray-500"
                )}
              >
                {task}
              </p>

              {completed && (
                <div className="mt-4 flex items-center gap-2 text-green-700 bg-green-100 rounded-lg p-3">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    Great work! You&apos;ve completed this practical task.
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="border border-gray-100 bg-mist">
        <CardContent className="p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            💡 Tips for practical tasks
          </h4>
          <ul className="space-y-1.5 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <Camera className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
              Take photos of your work to track your progress
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
              Start small — even a basic attempt teaches you a lot
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
              Write down what you learned in the Notes tab
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Toggle Button */}
      <Button
        onClick={onToggle}
        variant={completed ? "outline" : "default"}
        className={cn(
          "w-full",
          completed
            ? "border-gray-300 text-gray-600"
            : "bg-green-800 hover:bg-green-700 text-white"
        )}
      >
        {completed ? (
          <>Mark as Incomplete</>
        ) : (
          <>
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Mark Task as Completed
          </>
        )}
      </Button>
    </div>
  );
}