"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const languages = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "fr", label: "FR", flag: "🇫🇷" },
];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const switchLanguage = (locale: string) => {
    if (!pathname) return;

    const newPath = pathname.replace(
      new RegExp(`^/${currentLocale}(?=$|/)`),
      `/${locale}`
    );

    router.replace(newPath);
    setOpen(false); // close after selection
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = languages.find((l) => l.code === currentLocale);

  return (
    <div ref={ref} className="relative">
      {/* Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex cursor-pointer items-center gap-1 bg-black/90 px-3 py-1.5 text-sm rounded-lg glass text-white/70 hover:text-white transition"
      >
        <span>{currentLang?.flag}</span>
        <span>{currentLocale.toUpperCase()}</span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute mt-[-35px] right-0 mt-2 w-20 rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 overflow-hidden shadow-lg"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm cursor-pointer text-left text-white/70 hover:text-white hover:bg-white/10 transition"
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}