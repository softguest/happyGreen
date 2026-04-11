// src/components/landing/CTASection.tsx
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

export function CTASection() {
  const t = useTranslations("CTASection");
  return (
    <section className="py-20 md:py-28 bg-cream relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-400 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-20 h-20 bg-green-800 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Leaf className="w-10 h-10 text-white" />
        </div>

        <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 leading-tight">
          {t("readyToBuild")}{" "}
          <span className="text-green-700">{t("greenFuture")}</span>
        </h2>

        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {t("joinHundreds")}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/sign-up">
            <Button
              size="lg"
              className="bg-green-800 hover:bg-green-700 cursol-pointer text-white font-bold text-lg px-10 py-7 h-auto rounded-xl shadow-lg shadow-green-800/30"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {t("getStarted")}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          {t("noCreditCard")}
        </p>
      </div>
    </section>
  );
}