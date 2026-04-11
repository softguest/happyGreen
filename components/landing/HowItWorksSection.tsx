// src/components/landing/HowItWorksSection.tsx
"use client"
import { UserPlus, Brain, BookOpen, Rocket } from "lucide-react";
import { useTranslations } from "next-intl";

export function HowItWorksSection() {
  const t = useTranslations("howItWorks"); // ✅ hook

  const STEPS = [
  {
    icon: UserPlus,
    step: "01",
    title: t("stepTitle01"),
    description: t("stepDesc01"),
    color: "bg-blue-600",
  },
  {
    icon: Brain,
    step: "02",
    title: t("stepTitle02"),
    description:
      t("stepDesc02"),
    color: "bg-green-600",
  },
  {
    icon: BookOpen,
    step: "03",
    title: t("stepTitle03"),
    description: t("stepDesc03"),
    color: "bg-purple-600",
  },
  {
    icon: Rocket,
    step: "04",
    title: t("stepTitle04"),
    description:
      t("stepDesc04"),
    color: "bg-yellow-600",
  },
];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
            {t("howItWorks")}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {t("fourSimpleSteps")}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="relative text-center">
                {/* Connector */}
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gray-200">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-300 rounded-full" />
                  </div>
                )}

                <div
                  className={`w-20 h-20 ${step.color} rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-lg`}
                >
                  <Icon className="w-9 h-9 text-white" />
                </div>

                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                  {t("step")} {step.step}
                </span>
                <h3 className="text-lg font-heading font-bold text-gray-900 mt-2">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}