// src/components/business/PlanReview.tsx
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, Star, RefreshCw, AlertCircle } from "lucide-react";

interface Props {
  plan: {
    title: string;
    problemStatement: string;
    solution: string;
    targetCustomers: string;
    revenueModel: string;
    startupCostEstimate: number;
    monthlyRevenueEstimate: number;
    keyActivities: string[];
    resourcesNeeded: string[];
    challenges: string[];
  };
  skillName?: string;
}

export function PlanReview({ plan, skillName }: Props) {
  const [review, setReview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasEnoughContent =
    plan.problemStatement || plan.solution || plan.targetCustomers;

  const getReview = async () => {
    setIsLoading(true);
    setError(null);
    setReview(null);

    try {
      const response = await fetch("/api/ai/planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "review",
          plan: { ...plan },
        }),
      });

      if (!response.ok) throw new Error("Failed");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No body");

      let fullText = "";
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("0:")) {
            try {
              fullText += JSON.parse(line.slice(2));
            } catch {
              // skip
            }
          }
        }
      }

      setReview(fullText);
    } catch {
      setError("Failed to generate review. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!hasEnoughContent) {
    return (
      <Card className="border-2 border-dashed border-gray-200">
        <CardContent className="p-8 text-center">
          <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-heading font-semibold text-gray-600">
            Not enough content to review
          </h3>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            Fill in at least the Problem Statement, Solution, and Target
            Customers before requesting an AI review.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {!review && !isLoading && (
        <Card className="border-2 border-dashed border-blue-200 bg-blue-50/30">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-heading font-bold text-gray-900">
              Get AI Feedback on Your Plan
            </h3>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              Our AI will review your business plan and provide constructive
              feedback, highlight strengths, and suggest improvements.
            </p>
            <Button
              onClick={getReview}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8"
              size="lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Generate AI Review
            </Button>
          </CardContent>
        </Card>
      )}

      {isLoading && (
        <Card className="border border-blue-200">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600 mx-auto mb-4" />
            <h3 className="font-heading font-semibold text-gray-900">
              Analyzing your business plan...
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              The AI is evaluating each section and preparing detailed feedback.
            </p>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="border border-red-200 bg-red-50">
          <CardContent className="p-6 text-center">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-red-700">{error}</p>
            <Button
              onClick={getReview}
              variant="outline"
              className="mt-4 border-red-300"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {review && (
        <div className="space-y-4">
          <Card className="border border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-blue-600" />
                <h3 className="font-heading font-bold text-gray-900">
                  AI Review
                </h3>
              </div>
              <div
                className="prose prose-sm prose-blue max-w-none text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: formatReview(review),
                }}
              />
            </CardContent>
          </Card>

          <div className="text-center">
            <Button
              onClick={getReview}
              variant="outline"
              className="border-blue-300 text-blue-700"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Get New Review
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function formatReview(content: string): string {
  return content
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(
      /^### (.*$)/gm,
      '<h4 class="font-semibold text-base mt-4 mb-2">$1</h4>'
    )
    .replace(
      /^## (.*$)/gm,
      '<h3 class="font-bold text-lg mt-5 mb-2 text-blue-800">$1</h3>'
    )
    .replace(/^- (.*$)/gm, '<li class="ml-4 list-disc">$1</li>')
    .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 list-decimal">$1</li>')
    .replace(/\n\n/g, "</p><p class='mt-2'>")
    .replace(/\n/g, "<br />");
}