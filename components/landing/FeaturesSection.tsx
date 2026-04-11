// src/components/landing/FeaturesSection.tsx
"use client";
import {
  Brain,
  BookOpen,
  Lightbulb,
  BarChart3,
  Users,
  Download,
  Sparkles,
  MapPin,
} from "lucide-react";
import { useTranslations } from "next-intl";

export function FeaturesSection() {
  const t = useTranslations("features"); // ✅ hook

  const FEATURES = [
  {
    icon: Brain,
    title: t("title01"),
    description: t("description01"),
    color: "bg-green-100 text-green-700",
    highlight: t("sub01"),
  },
  {
    icon: BookOpen,
    title: t("title02"),
    description:
      t("description02"),
    color: "bg-blue-100 text-blue-700",
    highlight: t("sub02"),
  },
  {
    icon: Lightbulb,
    title: t("title03"),
    description:
      t("description03"),
    color: "bg-gold-100 text-gold-700",
    highlight: t("sub03"),
  },
  {
    icon: BarChart3,
    title: t("title04"),
    description:
      t("description04"),
    color: "bg-orange-100 text-orange-700",
    highlight: t("sub04"),
  },
  {
    icon: Users,
    title: t("title05"),
    description:
      t("description05"),
    color: "bg-purple-100 text-purple-700",
    highlight: t("sub05"),
  },
  {
    icon: MapPin,
    title: t("title06"),
    description:
      t("description06"),
    color: "bg-emerald-100 text-emerald-700",
    highlight: t("sub06"),
  },
];

  return (
    <section id="features" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="w-4 h-4 text-green-700" />
            <span className="text-sm text-green-800 font-medium">
              {t("heading")}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
            {t("subheading")}{" "}
            <span className="text-green-700">{t("subheadingHighlight")}</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            {t("fromDescription")}
          </p>
        </div>

        {/* Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="group bg-white rounded-2xl border border-gray-100 p-6 md:p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-heading font-bold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                <p className="mt-4 text-sm text-green-700 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  {feature.highlight}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}