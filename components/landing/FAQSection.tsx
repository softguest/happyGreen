// src/components/landing/FAQSection.tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  {
    question: "Is Greener Base really free?",
    answer:
      "Yes! Creating an account, getting AI skill recommendations, accessing learning modules, and using the business planner are all completely free. We believe every young person should have access to green skills training regardless of their financial situation.",
  },
  {
    question: "Who is Greener Base for?",
    answer:
      "Greener Base is designed for Cameroonian youths aged 18-35, including students, unemployed or underemployed youth, and aspiring green entrepreneurs. Whether you're in Douala, Yaoundé, Bamenda, or any other city or village, the platform adapts to your local context.",
  },
  {
    question: "How does the AI Skill Advisor work?",
    answer:
      "Our AI (powered by Google Gemini) analyzes your location, climate zone, interests, and available resources to recommend the most relevant green skills. For example, if you're in the Far North region, it might recommend drip irrigation or solar installation. If you're in Douala, it might suggest waste recycling or urban farming.",
  },
  {
    question: "What kind of green skills can I learn?",
    answer:
      "We cover four main categories: Sustainable Agriculture (composting, agroforestry, smart farming), Waste Management (plastic recycling, biogas), Renewable Energy (solar installation, cookstoves, briquettes), and Water Conservation (rainwater harvesting, purification). Each skill includes practical, hands-on learning modules.",
  },
  {
    question: "Can I really start a business from these skills?",
    answer:
      "Absolutely! Every skill on the platform has real market potential in Cameroon. Our AI Business Planner helps you create a complete business plan with realistic startup costs (in XAF), revenue projections, and step-by-step launch instructions. Many skills can be started with less than 50,000 XAF.",
  },
  {
    question: "What languages does the platform support?",
    answer:
      "Greener Base supports both English and French, Cameroon's two official languages. You can set your preferred language during onboarding.",
  },
  {
    question: "Do I need a computer to use Greener Base?",
    answer:
      "No! Greener Base is designed mobile-first, meaning it works perfectly on smartphones. You just need a basic internet connection to access the platform. Learning modules are kept short (5-10 minutes) to be friendly on mobile data.",
  },
  {
    question: "How do points and badges work?",
    answer:
      "You earn points by completing learning modules (+20), logging impact activities (+10), creating business plans (+50), and participating in the community. Badges are awarded for milestones like completing your first pathway, logging 100kg of waste, or planting 50 trees. Points contribute to your position on the leaderboard.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to know about Greener Base
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={cn(
                  "border rounded-xl overflow-hidden transition-all",
                  isOpen ? "border-green-300 bg-green-50/30 shadow-sm" : "border-gray-200"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle
                      className={cn(
                        "w-5 h-5 mt-0.5 flex-shrink-0 transition-colors",
                        isOpen ? "text-green-700" : "text-gray-400"
                      )}
                    />
                    <span
                      className={cn(
                        "font-semibold text-sm sm:text-base transition-colors",
                        isOpen ? "text-green-800" : "text-gray-800"
                      )}
                    >
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 flex-shrink-0 transition-transform ml-4",
                      isOpen ? "rotate-180 text-green-700" : "text-gray-400"
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pl-13">
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed ml-8">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}