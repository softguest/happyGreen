// src/lib/admin.ts

// Admin Clerk IDs — add your own Clerk user ID here
// Find your Clerk ID in Clerk Dashboard → Users → click user → copy ID
export const ADMIN_CLERK_IDS: string[] = [
  // Add your Clerk user IDs here:
    "user_38XseCNMCaex2uyERjNxQaccOJv"
];

// Or use email-based admin check
export const ADMIN_EMAILS: string[] = [
    "borishitz@gmail.com",
];

export function isAdminId(clerkId: string): boolean {
  return ADMIN_CLERK_IDS.includes(clerkId);
}

export function isAdminEmail(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

// Admin nav items
export const ADMIN_NAV_ITEMS = [
  { href: "/admin", label: "Overview", icon: "LayoutDashboard" },
  { href: "/admin/users", label: "Users", icon: "Users" },
  { href: "/admin/skills", label: "Skills", icon: "Brain" },
  { href: "/admin/pathways", label: "Pathways", icon: "BookOpen" },
  { href: "/admin/business", label: "Business Plans", icon: "Lightbulb" },
  { href: "/admin/impact", label: "Impact Data", icon: "BarChart3" },
  { href: "/admin/badges", label: "Badges", icon: "Trophy" },
  { href: "/admin/settings", label: "Settings", icon: "Settings" },
] as const;