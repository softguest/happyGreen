"use client";

import { useRef, useEffect, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Send, User, Loader2, Lightbulb, Trash2 } from "lucide-react";

interface Props {
  planTitle: string;
  skillName?: string;
}

const SUGGESTIONS = [
  "What's the best pricing strategy for this business?",
  "How do I find my first 10 customers?",
  "What licenses do I need in Cameroon for this business?",
  "How can I reduce my startup costs?",
  "What marketing channels should I use?",
  "How do I compete with existing businesses?",
];

export function PlanChat({ planTitle, skillName }: Props) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");

  const { messages, status, setMessages } = useChat();

  const isLoading = status === "submitted" || status === "streaming";

  // Seed welcome message
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        parts: [{ "type": "text", "text":
          `I'm here to help with your business plan: **"${planTitle}"**${
            skillName ? ` (based on ${skillName})` : ""
          }.\n\nAsk me anything about:\n- 📊 Market analysis and pricing\n- 👥 Finding customers\n- 💰 Financing and costs\n- 📋 Legal requirements in Cameroon\n- 🚀 Marketing and launch strategies\n\nWhat would you like to know?`,}
        ],
      },
    ]);
  }, [planTitle, skillName, setMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { id: Date.now().toString(), role: "user", parts: [{ "type": "text", "text": input }] }]);
      setInput("");
    }
  };

  const handleSuggestion = (text: string) => {
    setMessages([...messages, { id: Date.now().toString(), role: "user", parts: [{ "type": "text", "text": text }] }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        setMessages([...messages, { id: Date.now().toString(), role: "user", parts: [{ "type": "text", "text": input }] }]);
        setInput("");
      }
    }
  };

  const getMessageText = (message: any) => {
  if (message.display) return message.display;

  if (message.parts) {
    return message.parts
      .map((p: any) => {
        if (p.type === "text") return p.text;
        // fallback for non-text parts
        if (p.type === "tool-result") return `[Tool result: ${p.toolName}]`;
        return "";
      })
      .join(" ");
  }

  return "";
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
            <h3 className="font-semibold text-gray-900 text-sm">Business Advisor</h3>
            <p className="text-[10px] text-green-600">AI-Powered</p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            setMessages([
              {
                id: "welcome",
                role: "assistant",
                parts: [{ "type": "text", "text": `How can I help with "${planTitle}"?` }],
              },
            ])
          }
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
              message.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            {message.role === "assistant" && (
              <div className="w-7 h-7 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Lightbulb className="w-3.5 h-3.5 text-gold-700" />
              </div>
            )}

            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
                message.role === "user"
                  ? "bg-green-800 text-white rounded-br-md"
                  : "bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-sm"
              )}
            >
              <div
                dangerouslySetInnerHTML={{
                   __html: formatMessage(getMessageText(message)),
                }}
              />
              {isLoading && message.role === "assistant" && (
                <span className="animate-pulse ml-1">▍</span>
              )}
            </div>

            {message.role === "user" && (
              <div className="w-7 h-7 bg-green-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-3.5 h-3.5 text-white" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-2.5">
            <div className="w-7 h-7 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-3.5 h-3.5 text-gold-700" />
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
              <Loader2 className="w-4 h-4 animate-spin text-gold-600" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 2 && !isLoading && (
        <div className="pb-2">
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTIONS.slice(0, 4).map((s, i) => (
              <button
                key={i}
                onClick={() => handleSuggestion(s)}
                className="text-[11px] bg-white border border-gray-200 rounded-full px-3 py-1 hover:border-gold-300 hover:bg-gold-50 transition-colors text-gray-600"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-gray-100 pt-3">
        <form onSubmit={handleSubmit} className="flex items-end gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your business plan..."
            className="min-h-[44px] max-h-[100px] resize-none rounded-xl text-sm"
            rows={1}
            autoFocus
          />

          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="h-11 w-11 rounded-xl bg-gold-500 hover:bg-gold-600 text-green-900 p-0 flex-shrink-0"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

function formatMessage(content: string): string {
  return content
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/^### (.*$)/gm, '<h4 class="font-semibold text-sm mt-2 mb-1">$1</h4>')
    .replace(/^## (.*$)/gm, '<h3 class="font-semibold mt-3 mb-1">$1</h3>')
}