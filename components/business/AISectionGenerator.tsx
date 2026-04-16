// src/components/business/AISectionGenerator.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  Loader2,
  Check,
  RefreshCw,
  Copy,
  ArrowRight,
} from "lucide-react";

interface Props {
  section: string;
  planContext: {
    title: string;
    skillName?: string;
    existingSections: Record<string, string>;
  };
  onGenerated: (content: string) => void;
  currentContent?: string;
  label?: string;
  variant?: "default" | "outline";
}

export function AISectionGenerator({
  section,
  planContext,
  onGenerated,
  currentContent,
  label,
  variant = "default",
}: Props) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

const generate = async () => {
  setIsGenerating(true);
  setGeneratedContent("");
  setShowPreview(true); // 🔥 open immediately for streaming UX

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ai/planner`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode: "generate_section",
        section,
        planContext,
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

      const chunk = decoder.decode(value);
      fullText += chunk;

      setGeneratedContent(fullText); // 🔥 STREAM INTO UI
    }
  } catch (error) {
    console.error("AI generation error:", error);
  } finally {
    setIsGenerating(false);
  }
};

  const handleAccept = () => {
    if (generatedContent) {
      onGenerated(generatedContent);
      setShowPreview(false);
      setGeneratedContent(null);
    }
  };

  return (
    <>
      <Button
        onClick={generate}
        disabled={isGenerating}
        size="sm"
        variant={variant === "outline" ? "outline" : "default"}
        className={cn(
          variant === "outline"
            ? "text-blue-700 border-blue-200 hover:bg-blue-50"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        )}
      >
        {isGenerating ? (
          <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
        ) : (
          <Sparkles className="w-4 h-4 mr-1.5" />
        )}
        {isGenerating
          ? "Generating..."
          : label || (currentContent ? "Regenerate with AI" : "Generate with AI")}
      </Button>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              AI-Generated Content
            </DialogTitle>
          </DialogHeader>

          <div className="ai-bubble">
            <p className="text-xs text-blue-600 font-medium mb-2">
              Preview — Review before accepting
            </p>
            <div
              className="text-sm text-gray-800 leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{
                __html: formatMarkdown(generatedContent || ""),
              }}
            />
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={generate}
              disabled={isGenerating}
              size="sm"
            >
              <RefreshCw
                className={cn(
                  "w-4 h-4 mr-1.5",
                  isGenerating && "animate-spin"
                )}
              />
              Regenerate
            </Button>
            <Button
              onClick={handleAccept}
              className="bg-green-800 hover:bg-green-700 text-white"
              size="sm"
            >
              <Check className="w-4 h-4 mr-1.5" />
              Accept & Use
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function formatMarkdown(content: string): string {
  return content
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(
      /^### (.*$)/gm,
      '<h4 class="font-semibold text-base mt-3 mb-1">$1</h4>'
    )
    .replace(
      /^## (.*$)/gm,
      '<h3 class="font-semibold text-lg mt-4 mb-2">$1</h3>'
    )
    .replace(/^- (.*$)/gm, '<li class="ml-4 list-disc">$1</li>')
    .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 list-decimal">$1</li>')
    .replace(
      /`(.*?)`/g,
      '<code class="bg-gray-100 px-1.5 py-0.5 rounded text-xs">$1</code>'
    )
    .replace(/\n\n/g, "</p><p class='mt-2'>")
    .replace(/\n/g, "<br />");
}