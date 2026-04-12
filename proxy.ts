import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n";

// 🌍 i18n middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
});

// 🔓 Public routes
const isPublicRoute = createRouteMatcher([
  "/","/en","/fr",
  "/en/sign-in(.*)",
  "/fr/sign-in(.*)",
  "/en/sign-up(.*)",
  "/fr/sign-up(.*)",
  "/forgot-password(.*)",
  "/api/webhooks/clerk(.*)",
]);

// 🔐 Protected routes
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/onboarding(.*)",
  "/admin(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // ✅ Protect routes
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  // ✅ Always apply i18n
  return intlMiddleware(req);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',

    // Locale routes
    "/(en|fr)/:path*",

    // API routes
    "/(api|trpc)(.*)",
  ],
};

