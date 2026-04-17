import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createIntlMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n";

/**
 * 🌍 next-intl middleware
 */
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
});

/**
 * 🔓 Public routes (no authentication required)
 */
const isPublicRoute = createRouteMatcher([
  "/",
  "/(en|fr)",
  "/(en|fr)/sign-in(.*)",
  "/(en|fr)/sign-up(.*)",
  "/(en|fr)/verify-email(.*)",
  "/(en|fr)/sso-callback(.*)",
  "/forgot-password(.*)",
  "/api/webhooks/clerk(.*)",
]);

/**
 * 🔐 Protected routes
 */
const isProtectedRoute = createRouteMatcher([
  "/(en|fr)/dashboard(.*)",
  "/(en|fr)/onboarding(.*)",
  "/(en|fr)/admin(.*)",
]);

export default clerkMiddleware(
  async (auth, req) => {
    const { pathname } = req.nextUrl;

    /**
     * 🚫 1. Skip API routes completely
     */
    if (pathname.startsWith("/api")) {
      return; // ✅ do NOTHING
    }

    /**
     * 🔒 Protect authenticated areas
     */
    if (isProtectedRoute(req)) {
      await auth.protect();
    }

    /**
     * 🔒 Protect everything except public routes
     */
    if (!isPublicRoute(req)) {
      await auth.protect();
    }

    /**
     * 🌍 Apply locale routing ONLY to pages
     */
    return intlMiddleware(req);
  },
  {
    signInUrl: "/:locale/sign-in",
    signUpUrl: "/:locale/sign-up",
  }
);

export const config = {
  matcher: [
    /**
     * Skip static files and Next internals
     */
    "/((?!_next|.*\\..*).*)",

    /**
     * Apply middleware to locale routes
     */
    "/(en|fr)/:path*",

    /**
     * API routes
     */
    "/(api|trpc)(.*)",
  ],
};