"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";

const languages = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();

  const switchLanguage = (locale: string) => {
    if (!pathname) return;
    // replace leading locale segment (e.g. /en/about -> /fr/about)
    const newPath = pathname.replace(new RegExp(`^/${currentLocale}(?=$|/)`), `/${locale}`);
    router.replace(newPath);
  };

  return (
    <div className="relative group">
      {/* Button */}
      <button className="bg-black/90 px-3 py-1.5 text-sm rounded-lg glass text-white/70 hover:text-white transition">
        {currentLocale.toUpperCase()}
      </button>

      {/* Dropdown */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="mt-[-40px] absolute right-0 mt-2 w-12 rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 overflow-hidden"
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            className="w-full px-2 py-2 text-sm text-left text-white/70 hover:text-white hover:bg-white/10 transition"
          >
            {lang.label}
          </button>
        ))}
      </motion.div>
    </div>
  );
}