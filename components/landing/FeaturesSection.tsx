// src/components/landing/FeaturesSection.tsx
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

const FEATURES = [
  {
    icon: Brain,
    title: "AI Skill Advisor",
    description:
      "Get personalized green skill recommendations based on your location, interests, and available resources in Cameroon.",
    color: "bg-green-100 text-green-700",
    highlight: "Powered by Google Gemini AI",
  },
  {
    icon: BookOpen,
    title: "Micro-Learning Pathways",
    description:
      "Practical, step-by-step modules you can complete in 5-10 minutes. Includes quizzes and hands-on tasks.",
    color: "bg-blue-100 text-blue-700",
    highlight: "Learn at your own pace",
  },
  {
    icon: Lightbulb,
    title: "Green Business Planner",
    description:
      "AI guides you through creating a complete business plan — from problem statement to revenue projections in XAF.",
    color: "bg-gold-100 text-gold-700",
    highlight: "Export as professional PDF",
  },
  {
    icon: BarChart3,
    title: "Impact Tracking",
    description:
      "Log your environmental activities and see your impact visualized. Track waste reduced, trees planted, and income generated.",
    color: "bg-orange-100 text-orange-700",
    highlight: "Real data, real impact",
  },
  {
    icon: Users,
    title: "Community & Leaderboard",
    description:
      "Connect with fellow green champions, share tips, ask questions, and climb the impact leaderboard in your region.",
    color: "bg-purple-100 text-purple-700",
    highlight: "Earn badges and points",
  },
  {
    icon: MapPin,
    title: "Localized for Cameroon",
    description:
      "Content, pricing, and recommendations tailored to Cameroon's 10 regions, climate zones, and local market conditions.",
    color: "bg-emerald-100 text-emerald-700",
    highlight: "English & French support",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="w-4 h-4 text-green-700" />
            <span className="text-sm text-green-800 font-medium">
              Platform Features
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
            Everything You Need to{" "}
            <span className="text-green-700">Go Green</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            From discovering skills to launching businesses, Greener Base
            provides the tools young Cameroonians need to build climate-resilient
            livelihoods.
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