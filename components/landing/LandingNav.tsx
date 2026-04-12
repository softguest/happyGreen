"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation"; // ✅ IMPORTANT (NOT next/link)
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Leaf, Menu } from "lucide-react";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

export function LandingNav() {
  const t = useTranslations("nav"); // ✅ hook
  const locale = useLocale();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Translated links
  const NAV_LINKS = [
    { href: "#features", label: t("features") },
    { href: "#how-it-works", label: t("howItWorks") },
    { href: "#skills", label: t("skills") },
    { href: "#impact", label: t("impact") },
    { href: "#faq", label: t("faq") },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div
              className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center",
                scrolled ? "bg-green-800" : "bg-white/20 backdrop-blur-sm"
              )}
            >
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span
              className={cn(
                "text-lg font-heading font-bold",
                scrolled ? "text-green-800" : "text-white"
              )}
            >
              <span className="hidden md:block">GreenSkillUp</span>
              <span className="block md:hidden">SkillUp</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  scrolled
                    ? "text-gray-600 hover:text-green-800 hover:bg-green-50"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/sign-in">
              <Button
                variant="ghost"
                className={cn(
                  "text-sm",
                  scrolled
                    ? "text-gray-700 hover:text-green-800"
                    : "text-white hover:bg-white/10"
                )}
              >
                {t("signIn")}
              </Button>
            </Link>

            <Link href="/sign-up">
              <Button
                variant="ghost"
                className={cn(
                  "text-sm font-bold bg-gold-500",
                  scrolled
                    ? "text-green-900 hover:text-green-800"
                    : "text-white hover:bg-white/10"
                )}
              >
                {t("getStarted")}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <div className="flex items-center gap-2">
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "md:hidden",
                    scrolled ? "text-gray-700" : "text-white"
                  )}
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <LanguageSwitcher />
            </div>
            

            <SheetContent side="right" className="w-72 bg-white p-0">
              <div className="flex items-center gap-2.5 px-6 py-5 border-b">
                <div className="w-9 h-9 bg-green-800 rounded-xl flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-green-800">
                  SkillUp
                </span>
              </div>

              <nav className="px-4 py-4 space-y-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-green-800 hover:bg-green-50 rounded-lg"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="px-4 py-4 border-t space-y-2">
                <Link href="/sign-in" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full cursor-pointer">
                    {t("signIn")}
                  </Button>
                </Link>

                <Link href="/sign-up" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full bg-gold-500 text-green-900 font-bold cursor-pointer">
                    {t("getStarted")}
                  </Button>
                </Link>

              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}