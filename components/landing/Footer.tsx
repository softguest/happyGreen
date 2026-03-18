// src/components/landing/Footer.tsx
import Link from "next/link";
import { Leaf } from "lucide-react";

const FOOTER_LINKS = {
  Platform: [
    { label: "Features", href: "#features" },
    { label: "Green Skills", href: "#skills" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
  ],
  Resources: [
    { label: "Learning Pathways", href: "/sign-up" },
    { label: "Business Planner", href: "/sign-up" },
    { label: "Impact Tracker", href: "/sign-up" },
    { label: "Community", href: "/sign-up" },
  ],
  About: [
    { label: "Our Mission", href: "#" },
    { label: "Pachipanda Challenge", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gold-500 rounded-xl flex items-center justify-center">
                <Leaf className="w-5 h-5 text-green-900" />
              </div>
              <span className="text-lg font-heading font-bold">
                GreenSkill Hub
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              AI-powered platform empowering Cameroonian youths to discover
              green skills, build sustainable livelihoods, and contribute to
              climate resilience.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <span className="text-2xl">🇨🇲</span>
              <span className="text-sm text-gray-400">
                Made with ❤️ for Cameroon
              </span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} GreenSkill Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>Powered by Gemini AI</span>
            <span>·</span>
            <span>Built with Next.js</span>
            <span>·</span>
            <span>Pachipanda Challenge 2025</span>
          </div>
        </div>
      </div>
    </footer>
  );
}