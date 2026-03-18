// src/components/skills/BusinessIdeasModal.tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lightbulb, Loader2, Sparkles } from "lucide-react";

// Install this shadcn component if not yet done:
// npx shadcn@latest add dialog

interface Props {
  skillName: string;
  trigger?: React.ReactNode;
}

export function BusinessIdeasModal({ skillName, trigger }: Props) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchIdeas = async () => {
    if (content) return; // Already loaded
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/business-ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillName }),
      });

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

      setContent(fullText);
    } catch {
      setContent("Failed to load business ideas. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpen = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) fetchIdeas();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger>
        {trigger || (
          <Button
            variant="outline"
            size="sm"
            className="text-gold-600 border-gold-300 hover:bg-gold-50"
          >
            <Lightbulb className="w-4 h-4 mr-1.5" />
            Business Ideas
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold-500" />
            Business Ideas: {skillName}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-green-700 mb-3" />
            <p className="text-sm text-muted-foreground">
              Generating business ideas for your area...
            </p>
          </div>
        ) : content ? (
          <div
            className="prose prose-sm prose-green max-w-none"
            dangerouslySetInnerHTML={{
              __html: formatMarkdown(content),
            }}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function formatMarkdown(content: string): string {
  return content
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/^### (.*$)/gm, '<h4 class="font-semibold text-base mt-3 mb-1">$1</h4>')
    .replace(/^## (.*$)/gm, '<h3 class="font-semibold text-lg mt-4 mb-2">$1</h3>')
    .replace(/^# (.*$)/gm, '<h2 class="font-bold text-xl mt-4 mb-2">$1</h2>')
    .replace(/^- (.*$)/gm, '<li class="ml-4 list-disc">$1</li>')
    .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 list-decimal">$1</li>')
    .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1.5 py-0.5 rounded text-xs">$1</code>')
    .replace(/\n\n/g, "</p><p class='mt-2'>")
    .replace(/\n/g, "<br />");
}