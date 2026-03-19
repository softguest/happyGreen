// src/components/landing/TestimonialsSection.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Amina Bello",
    role: "Composting Entrepreneur, Douala",
    quote:
      "Greener Base helped me turn kitchen waste into income. The AI recommended composting based on my location, and the business planner helped me price my products. I now earn 80,000 XAF monthly!",
    avatar: "AB",
    rating: 5,
  },
  {
    name: "Jean-Pierre Nkomo",
    role: "Solar Technician, Yaoundé",
    quote:
      "The learning modules are incredibly practical. I completed the solar installation pathway and got my first client within a month. The step-by-step approach made everything so clear.",
    avatar: "JN",
    rating: 5,
  },
  {
    name: "Grace Fongod",
    role: "Waste Recycling, Bamenda",
    quote:
      "I love how the platform tracks my environmental impact. Seeing that I've recycled 200kg of plastic this month motivates me to keep going. The community is also very supportive!",
    avatar: "GF",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
            What Youths Are Saying
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Real stories from young Cameroonians building green livelihoods
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