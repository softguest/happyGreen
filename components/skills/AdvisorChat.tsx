"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import {
  Send,
  Sparkles,
  User,
  Loader2,
  Lightbulb,
  Sprout,
  Trash2,
} from "lucide-react";

type Part = { type: "text"; text: string } | { type: string; [k: string]: any };
type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  parts: Part[];
};

const SUGGESTED_QUESTIONS = [
  { text: "What green skills are best for my area?", icon: Sprout },
  { text: "How can I start a composting business with little money?", icon: Lightbulb },
  { text: "What are the most profitable green skills in Cameroon?", icon: Sparkles },
  { text: "How can I combine waste recycling with farming?", icon: Sprout },
];

export function AdvisorChat() {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      parts: [
        {
          type: "text",
          text: "Hello! 🌱 I'm your GreenSkill Hub AI Advisor. What green skills would you like to explore today?",
        },
      ],
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    setTimeout(() => {
      void sendMessageToAdvisor(question);
      setInput("");
    }, 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    void sendMessageToAdvisor(input.trim());
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!input.trim()) return;
      void sendMessageToAdvisor(input.trim());
      setInput("");
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Hello! 🌱 I'm your GreenSkill Hub AI Advisor. What green skills would you like to explore today?",
          },
        ],
      },
    ]);
    setError(null);
  };

  // Helper: parse backend response into parts
  function parseAssistantResponse(body: any): Part[] {
    // Accept either { reply: string } or { parts: [{type:'text', text: '...'}] }
    if (!body) return [{ type: "text", text: "No response from server." }];
    if (typeof body.reply === "string") {
      return [{ type: "text", text: body.reply }];
    }
    if (Array.isArray(body.parts)) {
      return body.parts.map((p: any) =>
        typeof p === "string" ? { type: "text", text: p } : p
      );
    }
    if (typeof body === "string") {
      return [{ type: "text", text: body }];
    }
    // fallback
    return [{ type: "text", text: JSON.stringify(body) }];
  }

  // Main send function that posts to /api/ai/advisor
  async function sendMessageToAdvisor(text: string) {
    setError(null);

    // Append user message locally
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      parts: [{ type: "text", text }],
    };
    setMessages((m) => [...m, userMsg]);

    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // send whatever your backend expects; common shapes:
          // { text } or { messages: [...] }
          text,
          // optionally include the conversation so the server can maintain context:
          messages: messages.concat(userMsg).map((msg) => ({
            role: msg.role,
            parts: msg.parts,
          })),
        }),
      });

      if (!res.ok) {
        const textBody = await res.text().catch(() => "");
        throw new Error(`Server responded ${res.status}: ${textBody}`);
      }

      // Try parse JSON; if your backend streams or returns other format, adapt here
      const body = await res.json().catch(async () => {
        // if not JSON, try text
        const t = await res.text();
        return { reply: t };
      });

      const assistantParts = parseAssistantResponse(body);

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        parts: assistantParts,
      };

      setMessages((m) => [...m, assistantMsg]);
    } catch (err: any) {
      console.error("sendMessageToAdvisor error:", err);
      setError(err?.message ?? "Unknown error sending message");
      // Optionally append an assistant error message
      setMessages((m) => [
        ...m,
        {
          id: `assistant-error-${Date.now()}`,
          role: "assistant",
          parts: [{ type: "text", text: "Sorry — I couldn't reach the advisor. Try again." }],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-280px)] min-h-[500px] max-h-[700px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-800 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Green Skill Advisor</h3>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Powered by AI
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={clearChat}
          className="text-gray-400 hover:text-gray-600"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Clear
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 px-2">
        {messages.map((message) => {
          const textPart = message.parts.find((p) => p.type === "text");
          const content = textPart && "text" in textPart ? textPart.text : "";

          return (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkles className="w-4 h-4 text-green-700" />
                </div>
              )}

              <div
                className={cn(
                  "max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3",
                  message.role === "user"
                    ? "bg-green-800 text-white rounded-br-md"
                    : "bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-sm"
                )}
              >
                <div
                  className="text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: formatMessage(content),
                  }}
                />
              </div>

              {message.role === "user" && (
                <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-green-700" />
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-green-600" />
                <span className="text-sm text-gray-500">Thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length <= 1 && !isLoading && (
        <div className="pb-3 px-4">
          <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSuggestedQuestion(q.text)}
                className="flex items-center gap-1.5 text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 hover:border-green-300 hover:bg-green-50 transition-colors"
              >
                <q.icon className="w-3 h-3" />
                {q.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-gray-100 pt-4 px-4">
        <form onSubmit={handleSubmit} className="flex items-end gap-2">
          <div className="flex-1">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask about green skills, business ideas..."
              className="min-h-[48px] max-h-[120px] resize-none rounded-xl"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="h-12 w-12 rounded-xl bg-green-800 hover:bg-green-700 p-0"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </Button>
        </form>

        {error && <p className="text-xs text-red-600 mt-2 text-center">{error}</p>}

        <p className="text-[10px] text-muted-foreground mt-2 text-center">
          AI responses are generated automatically. Verify business advice with local experts.
        </p>
      </div>
    </div>
  );
}

function formatMessage(content: string): string {
  return content
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br/>");
}
