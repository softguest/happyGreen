// src/components/landing/HeroSection.tsx
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Sparkles,
  Brain,
  BookOpen,
  Lightbulb,
  BarChart3,
  Leaf,
  CheckCircle2,
} from "lucide-react";

export function HeroSection() {
    const t = useTranslations("hero"); // ✅ hook
    const locale = useLocale();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0f2f1f] overflow-hidden">
       {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-green-500/20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-emerald-400/10 blur-3xl rounded-full bottom-[-120px] right-[-120px]" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-green-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Decorative Icons */}
      <div className="absolute top-32 right-[15%] hidden lg:block opacity-20">
        <Brain className="w-16 h-16 text-white" />
      </div>
      <div className="absolute bottom-40 left-[10%] hidden lg:block opacity-20">
        <Leaf className="w-20 h-20 text-green-300" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span className="text-sm text-white/90 font-medium">
              {t("ai-powered")}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight">
              {t("main-sub01")}{" "}
              <span className="text-gold-400">{t("main-sub02")}</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-green-100 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {t("heroDesc")}
            </p>

            {/* Checklist */}
            <div className="mt-8 space-y-3 max-w-md mx-auto lg:mx-0">
              {[
                t("heroPoint1"),
                t("heroPoint2"),
                t("heroPoint3"),
                t("heroPoint4"),
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 text-green-100"
                >
                  <CheckCircle2 className="w-5 h-5 text-gold-400 flex-shrink-0" />
                  <span className="text-sm sm:text-base">{item}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link href={`/${locale}/sign-up`}>
                <Button
                  size="lg"
                  className="bg-gold-500 hover:bg-gold-600 text-green-300 cursor-pointer hover:bg-white/10 font-bold text-base px-8 py-6 h-auto rounded-xl shadow-lg shadow-gold-500/30"
                >
                  {t("startLearning")}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-green-800 cursor-pointer hover:bg-white/10 text-base px-8 py-6 h-auto rounded-xl"
                >
                  {t("seeHowItWorks")}
                </Button>
              </a>
            </div>

            {/* Social Proof */}
            <div className="mt-10 flex items-center gap-6 justify-center lg:justify-start text-green-200 text-sm">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold text-white">100%</span>
                <span>{t("freeToStart")}</span>
              </div>
              <div className="w-px h-5 bg-green-600" />
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold text-white">🇨🇲</span>
                <span>{t("buildForCameroon")}</span>
              </div>
              <div className="w-px h-5 bg-green-600 hidden sm:block" />
              <div className="hidden sm:flex items-center gap-1.5">
                <span className="text-lg font-bold text-white">🤖</span>
                <span>{t("greenAiAdvisor")}</span>
              </div>
            </div>
          </div>

          {/* Right — Visual Card */}
          <div className="hidden lg:block relative">
            <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-2xl">
              {/* Mock Dashboard */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                {/* Mock Top Bar */}
                <div className="bg-green-800 px-4 py-3 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="text-white/60 text-xs ml-2">
                    greenskillup.com/dashboard
                  </span>
                </div>

                <div className="p-4 space-y-3">
                  {/* Welcome */}
                  <div className="bg-gradient-to-r from-green-800 to-green-600 rounded-xl p-4 text-white">
                    <p className="text-xs text-green-200">{t('welcomeBack')}</p>
                    <p className="font-bold">Amina! 🌱</p>
                    <p className="text-xs text-green-200 mt-1">
                      {t("readyToBuildSkills")}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { icon: Brain, label: "Skills", value: "4" },
                      { icon: BookOpen, label: "Modules", value: "12" },
                      { icon: Lightbulb, label: "Plans", value: "2" },
                      { icon: BarChart3, label: "Impact", value: "8" },
                    ].map((stat, i) => (
                      <div
                        key={i}
                        className="bg-gray-50 rounded-lg p-2 text-center"
                      >
                        <stat.icon className="w-4 h-4 mx-auto text-green-600 mb-0.5" />
                        <p className="text-sm font-bold text-gray-900">
                          {stat.value}
                        </p>
                        <p className="text-[8px] text-gray-500">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* AI Bubble */}
                  <div className="border-l-4 border-blue-400 bg-blue-50 rounded-r-lg p-3">
                    <p className="text-[10px] text-blue-700 font-medium">
                      🤖 AI Advisor
                    </p>
                    <p className="text-xs text-blue-800 mt-0.5">
                      {t("basedOnYourLocation")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="bg-slate-200/30 absolute -top-4 -right-4 bg-gold text-green-900 rounded-xl px-3 py-2 shadow-lg transform rotate-3">
              <p className="text-xs font-bold">🏆 +100 pts</p>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-3 py-2 shadow-lg transform -rotate-2">
              <p className="text-xs font-bold text-green-700">♻️ 50kg waste reduced</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}