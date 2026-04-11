// src/components/landing/FAQSection.tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export function FAQSection() {
  const t = useTranslations("FAQSection")

  const FAQS = [
  {
    question: t("quest01"),
    answer:
      t("ans01"),
  },
  {
    question: t("quest02"),
    answer:
      t("ans02"),
  },
  {
    question: t("quest03"),
    answer:
      t("ans03"),
  },
  {
    question: t("quest04"),
    answer:
      t("ans04"),
  },
  {
    question: t("quest05"),
    answer:
      t("ans05"),
  },
  {
    question: t("quest06"),
    answer:
      t("ans06"),
  },
  {
    question: t("quest07"),
    answer:
      t("ans07"),
  },
  {
    question: t("quest08"),
    answer:
      t("ans08"),
  },
];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
            {t("frequentlyAsked")}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {t("everythingYou")}
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