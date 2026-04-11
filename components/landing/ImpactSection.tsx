// src/components/landing/ImpactSection.tsx
"use client";
import {
  Trash2,
  TreePine,
  Zap,
  Droplets,
  Users,
  Globe,
} from "lucide-react";
import { useTranslations } from "next-intl";

export function ImpactSection() {
  const t = useTranslations("ImpactSection");

  const IMPACT_STATS = [
    { icon: Trash2, value: t("wasteReduce"), unit: t("kgTracked"), color: "text-amber-600", bg: "bg-amber-100" },
    { icon: TreePine, value: t("treesPlanted"), unit: t("seedlingsTracked"), color: "text-green-600", bg: "bg-green-100" },
    { icon: Zap, value: t("energySaved"), unit: t("kWhTracked"), color: "text-yellow-600", bg: "bg-yellow-100" },
    { icon: Droplets, value: t("waterConserved"), unit: t("litersTracked"), color: "text-blue-600", bg: "bg-blue-100" },
  ];

  return (
    <section id="impact" className="relative min-h-screen flex items-center justify-center bg-[#0f2f1f] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute w-[500px] h-[500px] bg-green-500/20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-emerald-400/10 blur-3xl rounded-full bottom-[-120px] right-[-120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
            {t("withGreenSkillUp")}
          </h2>
          <p className="mt-4 text-lg text-green-200">
            {t("everyActionCounts")}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {IMPACT_STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-colors"
              >
                <div
                  className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                >
                  <Icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <p className="text-lg font-heading font-bold text-white">
                  {stat.value}
                </p>
                <p className="text-sm text-green-300 mt-1">{stat.unit}</p>
              </div>
            );
          })}
        </div>

        {/* Community Stats */}
        <div className="mt-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Globe className="w-6 h-6 text-gold-400" />
            <h3 className="text-xl font-heading font-bold text-white">
              {t("joinGreenCommunity")}
            </h3>
          </div>
          <p className="text-green-200 max-w-2xl mx-auto">
            {t("connectWithOthers")}
            Connect with other young Cameroonians building green skills. Share
            tips, collaborate on projects, and climb the impact leaderboard in
            your region. Together, we&apos;re building a climate-resilient future.
          </p>
          <div className="flex items-center justify-center gap-8 mt-6">
            <div>
              <p className="text-2xl font-bold text-white">10</p>
              <p className="text-xs text-green-300">{t("regions")}</p>
            </div>
            <div className="w-px h-10 bg-green-600" />
            <div>
              <p className="text-2xl font-bold text-white">13+</p>
              <p className="text-xs text-green-300">{t("greenSkills")}</p>
            </div>
            <div className="w-px h-10 bg-green-600" />
            <div>
              <p className="text-2xl font-bold text-white">5</p>
              <p className="text-xs text-green-300">{t("impactAreas")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}