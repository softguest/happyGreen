// src/components/landing/TestimonialsSection.tsx
"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useTranslations } from "next-intl";

export function TestimonialsSection() {
  const t = useTranslations("TestimonialsSection");

  const TESTIMONIALS = [
  {
    name: "Amina Bello",
    role: t("testiRole01"),
    quote:
      t("testiQuote01"),
    avatar: "AB",
    rating: 5,
  },
  {
    name: "Jean-Pierre Nkomo",
    role: t("testiRole02"),
    quote:
      t("testiQuote02"),
    avatar: "JN",
    rating: 5,
  },
  {
    name: "Grace Fongod",
    role: t("testiRole03"),
    quote:
      t("testiQuote03"),
    avatar: "GF",
    rating: 5,
  },
];

  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
            {t("whatYouths")}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {t("realStories")}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <Card
              key={i}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white"
            >
              <CardContent className="p-6 md:p-8">
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-green-200 mb-4" />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 text-gold-500 fill-current"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 leading-relaxed italic">
                  &quot;{t.quote}&quot;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-100">
                  <div className="w-11 h-11 bg-green-200 rounded-full flex items-center justify-center text-green-800 text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}