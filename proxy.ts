// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import createMiddleware from "next-intl/middleware";
// import { locales, defaultLocale } from "./i18n";

// // 🌍 i18n middleware
// const intlMiddleware = createMiddleware({
//   locales,
//   defaultLocale,
// });

// // 🔓 Public routes
// const isPublicRoute = createRouteMatcher([
//   "/","/en","/fr",
//   "/en/sign-in(.*)",
//   "/fr/sign-in(.*)",
//   "/en/sign-up(.*)",
//   "/fr/sign-up(.*)",
//   "/forgot-password(.*)",
//   "/api/webhooks/clerk(.*)",
// ]);

// // 🔐 Protected routes
// const isProtectedRoute = createRouteMatcher([
//   "/dashboard(.*)",
//   "/onboarding(.*)",
//   "/admin(.*)",
// ]);

// export default clerkMiddleware(async (auth, req) => {
//   // ✅ Protect routes
//   if (!isPublicRoute(req)) {
//     await auth.protect();
//   }

//   if (isProtectedRoute(req)) {
//     await auth.protect();
//   }

//   // ✅ Always apply i18n
//   return intlMiddleware(req);
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',

//     // Locale routes
//     "/(en|fr)/:path*",

//     // API routes
//     "/(api|trpc)(.*)",
//   ],
// };

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
     * 🌍 Apply locale routing
     */
    return intlMiddleware(req);
  },

  /**
   * Clerk routing configuration
   */
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