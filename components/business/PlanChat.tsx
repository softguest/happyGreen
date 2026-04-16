"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import {
  Send,
  User,
  Loader2,
  Lightbulb,
  Trash2,
} from "lucide-react";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

interface Props {
  planTitle: string;
  skillName?: string;
}

const SUGGESTIONS = [
  "What's the best pricing strategy for this business?",
  "How do I find my first 10 customers?",
  "What licenses do I need in Cameroon for this business?",
  "How can I reduce my startup costs?",
];

export function PlanChat({ planTitle, skillName }: Props) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Seed welcome message
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: `I'm here to help with your business plan: "${planTitle}"${
          skillName ? ` (based on ${skillName})` : ""
        }.

Ask me anything about:
- Market analysis
- Finding customers
- Costs & funding
- Legal requirements in Cameroon
- Marketing strategies

What would you like to know?`,
      },
    ]);
  }, [planTitle, skillName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: `How can I help with "${planTitle}"?`,
      },
    ]);
    setError(null);
  };

  // ✅ Core streaming function (same as AdvisorChat)
  async function sendMessage(text: string) {
    setError(null);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsLoading(true);

    const assistantId = `assistant-${Date.now()}`;

    // placeholder assistant message
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "assistant", content: "" },
    ]);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ai/planner`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "chat",
          planContext: planTitle,
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        fullText += chunk;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId
              ? { ...msg, content: fullText }
              : msg
          )
        );
      }
    } catch (err) {
      console.error(err);
      setError("Failed to get response");
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    sendMessage(input.trim());
    setInput("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-350px)] min-h-[400px] max-h-[600px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gold-100 rounded-lg flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-gold-700" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">
              Business Advisor
            </h3>
            <p className="text-[10px] text-green-600">AI-Powered</p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={clearChat}
          className="text-gray-400 text-xs"
        >
          <Trash2 className="w-3.5 h-3.5 mr-1" />
          Clear
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-2.5",
              message.role === "user"
                ? "justify-end"
                : "justify-start"
            )}
          >
            {message.role === "assistant" && (
              <div className="w-7 h-7 bg-gold-100 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-3.5 h-3.5 text-gold-700" />
              </div>
            )}

            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
                message.role === "user"
                  ? "bg-green-800 text-white"
                  : "bg-white border border-gray-200 text-gray-800 shadow-sm"
              )}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: formatMessage(escapeHtml(message.content)),
                }}
              />
            </div>

            {message.role === "user" && (
              <div className="w-7 h-7 bg-green-700 rounded-lg flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-white" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-2 text-sm text-gray-500">
            <Loader2 className="animate-spin w-4 h-4" /> Thinking...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="pb-2">
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                onClick={() => sendMessage(s)}
                className="text-[11px] bg-white border border-gray-200 rounded-full px-3 py-1"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex items-end gap-2 border-t pt-3">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your business plan..."
          className="min-h-[44px] max-h-[100px] resize-none rounded-xl text-sm"
        />

        <Button type="submit" disabled={isLoading}>
          <Send className="w-4 h-4" />
        </Button>
      </form>

      {error && (
        <p className="text-red-500 text-xs text-center">{error}</p>
      )}
    </div>
  );
}

// ✅ Safe formatting
function formatMessage(content: string): string {
  return content
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br/>");
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}