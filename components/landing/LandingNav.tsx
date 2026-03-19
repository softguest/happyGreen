// src/components/landing/LandingNav.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Leaf, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#skills", label: "Green Skills" },
  { href: "#impact", label: "Impact" },
  { href: "#faq", label: "FAQ" },
];

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
                "w-9 h-9 rounded-xl flex items-center justify-center transition-colors",
                scrolled ? "bg-green-800" : "bg-white/20 backdrop-blur-sm"
              )}
            >
              <Leaf
                className={cn(
                  "w-5 h-5",
                  scrolled ? "text-white" : "text-white"
                )}
              />
            </div>
            <span
              className={cn(
                "text-lg font-heading font-bold transition-colors",
                scrolled ? "text-green-800" : "text-white"
              )}
            >
             GreenSkill Up
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
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button 
              // className="bg-gold-500 hover:bg-gold-600 text-green-900 font-bold text-sm px-5"
                variant="ghost"
                className={cn(
                    "text-sm font-bold bg-gold-500 cursol-pionter",
                    scrolled
                      ? "text-green-900 hover:text-green-800"
                      : "text-white hover:bg-white/10"
                  )}
              >
                Get Started Free
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
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
            <SheetContent side="right" className="w-72 bg-white p-0">
              <div className="flex items-center gap-2.5 px-6 py-5 border-b border-gray-100">
                <div className="w-9 h-9 bg-green-800 rounded-xl flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-heading font-bold text-green-800">
                  GreenSkill Up
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
              <div className="px-4 py-4 border-t border-gray-100 space-y-2">
                <Link href="/sign-in" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full bg-gold-500 hover:bg-gold-600 text-green-900 font-bold">
                    Get Started Free
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