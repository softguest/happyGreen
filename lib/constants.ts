// src/lib/constants.ts

export const CAMEROON_REGIONS = [
  { value: "adamawa", label: "Adamawa (Ngaoundéré)", climateZone: "sudano-sahelian" },
  { value: "centre", label: "Centre (Yaoundé)", climateZone: "equatorial" },
  { value: "east", label: "East (Bertoua)", climateZone: "equatorial" },
  { value: "far_north", label: "Far North (Maroua)", climateZone: "sahelian" },
  { value: "littoral", label: "Littoral (Douala)", climateZone: "equatorial-coastal" },
  { value: "north", label: "North (Garoua)", climateZone: "sudano-sahelian" },
  { value: "northwest", label: "Northwest (Bamenda)", climateZone: "highland" },
  { value: "south", label: "South (Ebolowa)", climateZone: "equatorial" },
  { value: "southwest", label: "Southwest (Buea)", climateZone: "equatorial-coastal" },
  { value: "west", label: "West (Bafoussam)", climateZone: "highland" },
] as const;

export const SKILL_CATEGORIES = [
  {
    value: "agriculture",
    label: "Sustainable Agriculture",
    icon: "Sprout",
    color: "text-green-700",
    bgColor: "bg-green-100",
    description: "Climate-smart farming, composting, agroforestry",
  },
  {
    value: "waste_management",
    label: "Waste Management & Recycling",
    icon: "Recycle",
    color: "text-amber-700",
    bgColor: "bg-amber-100",
    description: "Plastic recycling, composting, waste collection",
  },
  {
    value: "renewable_energy",
    label: "Renewable Energy",
    icon: "Sun",
    color: "text-yellow-700",
    bgColor: "bg-yellow-100",
    description: "Solar installation, biogas, efficient cookstoves",
  },
  {
    value: "water_conservation",
    label: "Water Conservation",
    icon: "Droplets",
    color: "text-blue-700",
    bgColor: "bg-blue-100",
    description: "Rainwater harvesting, purification, irrigation",
  },
] as const;

export const USER_SITUATIONS = [
  { value: "student", label: "Student", icon: "GraduationCap", description: "Currently studying" },
  { value: "unemployed", label: "Unemployed / Job Seeking", icon: "Search", description: "Looking for opportunities" },
  { value: "employed", label: "Employed", icon: "Briefcase", description: "Working but seeking green transition" },
  { value: "entrepreneur", label: "Aspiring Entrepreneur", icon: "Rocket", description: "Want to start a green business" },
] as const;

export const AVAILABLE_RESOURCES = [
  { value: "land", label: "Access to Land", icon: "Map" },
  { value: "small_capital", label: "Small Capital (< 50,000 XAF)", icon: "Wallet" },
  { value: "medium_capital", label: "Medium Capital (50,000 - 500,000 XAF)", icon: "Banknote" },
  { value: "tools", label: "Basic Tools / Equipment", icon: "Wrench" },
  { value: "smartphone", label: "Smartphone with Internet", icon: "Smartphone" },
  { value: "computer", label: "Computer / Laptop", icon: "Laptop" },
  { value: "transport", label: "Means of Transport", icon: "Truck" },
  { value: "network", label: "Community Network / Contacts", icon: "Users" },
  { value: "storage", label: "Storage Space", icon: "Warehouse" },
  { value: "water_access", label: "Access to Water Source", icon: "Droplets" },
] as const;

export const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "fr", label: "Français" },
] as const;

export const IMPACT_CATEGORIES = [
  { value: "waste", label: "Waste Reduced", unit: "kg", icon: "Trash2" },
  { value: "agriculture", label: "Crops / Trees", unit: "units", icon: "TreePine" },
  { value: "energy", label: "Energy Saved", unit: "kWh", icon: "Zap" },
  { value: "water", label: "Water Conserved", unit: "liters", icon: "Droplets" },
  { value: "income", label: "Income Generated", unit: "XAF", icon: "TrendingUp" },
] as const;

// Nav items for sidebar
export const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/dashboard/skills", label: "AI Skill Advisor", icon: "Brain" },
  { href: "/dashboard/learn", label: "Learning Paths", icon: "BookOpen" },
  { href: "/dashboard/business", label: "Business Planner", icon: "Lightbulb" },
  { href: "/dashboard/impact", label: "My Impact", icon: "BarChart3" },
  { href: "/dashboard/community", label: "Community", icon: "Users" },
  { href: "/dashboard/profile", label: "Profile", icon: "UserCircle" },
] as const;