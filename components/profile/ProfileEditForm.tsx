// src/components/profile/ProfileEditForm.tsx
"use client";

import { useState, useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateProfileInfo } from "@/actions/profile-page";
import {
  CAMEROON_REGIONS,
  SKILL_CATEGORIES,
  USER_SITUATIONS,
  AVAILABLE_RESOURCES,
  LANGUAGES,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  Save,
  Loader2,
  CheckCircle2,
  User,
  MapPin,
  Globe,
  Wrench,
  Sparkles,
  GraduationCap,
  Search,
  Briefcase,
  Rocket,
  Sprout,
  Recycle,
  Sun,
  Droplets,
  Map,
  Wallet,
  Banknote,
  Smartphone,
  Laptop,
  Truck,
  Users,
  Warehouse,
} from "lucide-react";

const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  Sprout, Recycle, Sun, Droplets,
  GraduationCap, Search, Briefcase, Rocket,
  Map, Wallet, Banknote, Wrench, Smartphone,
  Laptop, Truck, Users, Warehouse,
};

interface Props {
  profile: {
    id: string;
    fullName: string;
    email: string | null;
    phone: string | null;
    region: string | null;
    city: string | null;
    preferredLanguage: string;
    currentSituation: string | null;
    interests: unknown;
    availableResources: unknown;
  };
}

export function ProfileEditForm({ profile }: Props) {
  const [isPending, startTransition] = useTransition();
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: profile.fullName,
    phone: profile.phone || "",
    preferredLanguage: profile.preferredLanguage,
    region: profile.region || "",
    city: profile.city || "",
    currentSituation: profile.currentSituation || "",
    interests: (profile.interests as string[]) || [],
    availableResources: (profile.availableResources as string[]) || [],
  });

  const updateField = (key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setSaveMessage(null);
  };

  const toggleArrayItem = (
    key: "interests" | "availableResources",
    item: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].includes(item)
        ? prev[key].filter((i) => i !== item)
        : [...prev[key], item],
    }));
    setSaveMessage(null);
  };

  const handleSave = () => {
    startTransition(async () => {
      const result = await updateProfileInfo(formData);
      if (result.success) {
        setSaveMessage("Profile updated successfully!");
        setTimeout(() => setSaveMessage(null), 4000);
      } else {
        setSaveMessage("Failed to update. Please try again.");
      }
    });
  };

  const regionInfo = CAMEROON_REGIONS.find((r) => r.value === formData.region);

  return (
    <div className="space-y-6">
      {/* Save Banner */}
      {saveMessage && (
        <div
          className={cn(
            "flex items-center gap-2 p-3 rounded-xl text-sm font-medium",
            saveMessage.includes("success")
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          )}
        >
          <CheckCircle2 className="w-4 h-4" />
          {saveMessage}
        </div>
      )}

      {/* ====== BASIC INFO ====== */}
      <Card className="border border-gray-100">
        <CardContent className="p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-green-600" />
            Basic Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="+237 6XX XXX XXX"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                value={profile.email || ""}
                disabled
                className="mt-1 bg-gray-50"
              />
              <p className="text-[10px] text-muted-foreground mt-1">
                Email is managed through your login provider
              </p>
            </div>
            <div>
              <Label htmlFor="language">Preferred Language</Label>
              <Select
                value={formData.preferredLanguage}
                onValueChange={(v) => updateField("preferredLanguage", v)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ====== LOCATION ====== */}
      <Card className="border border-gray-100">
        <CardContent className="p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            Location
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="region">Region</Label>
              <Select
                value={formData.region}
                onValueChange={(v) => updateField("region", v)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {CAMEROON_REGIONS.map((region) => (
                    <SelectItem key={region.value} value={region.value}>
                      {region.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="city">City / Town</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => updateField("city", e.target.value)}
                placeholder="e.g., Yaoundé, Douala"
                className="mt-1"
              />
            </div>
          </div>

          {regionInfo && (
            <div className="mt-3 p-2.5 bg-green-50 rounded-lg border border-green-200">
              <p className="text-xs text-green-800">
                🌍 Climate zone:{" "}
                <strong>{regionInfo.climateZone}</strong> — AI recommendations
                are tailored to this zone
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ====== SITUATION ====== */}
      <Card className="border border-gray-100">
        <CardContent className="p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-purple-600" />
            Current Situation
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {USER_SITUATIONS.map((situation) => {
              const Icon = iconComponents[situation.icon];
              const isSelected = formData.currentSituation === situation.value;
              return (
                <button
                  key={situation.value}
                  type="button"
                  onClick={() =>
                    updateField("currentSituation", situation.value)
                  }
                  className={cn(
                    "flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 text-center transition-all",
                    isSelected
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200 hover:border-green-300"
                  )}
                >
                  {Icon && (
                    <Icon
                      className={cn(
                        "w-5 h-5",
                        isSelected ? "text-green-700" : "text-gray-400"
                      )}
                    />
                  )}
                  <span
                    className={cn(
                      "text-xs font-medium",
                      isSelected ? "text-green-800" : "text-gray-600"
                    )}
                  >
                    {situation.label}
                  </span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* ====== INTERESTS ====== */}
      <Card className="border border-gray-100">
        <CardContent className="p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-green-600" />
            Green Skill Interests
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SKILL_CATEGORIES.map((cat) => {
              const Icon = iconComponents[cat.icon];
              const isSelected = formData.interests.includes(cat.value);
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => toggleArrayItem("interests", cat.value)}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all",
                    isSelected
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200 hover:border-green-300"
                  )}
                >
                  <div
                    className={cn(
                      "w-9 h-9 rounded-lg flex items-center justify-center",
                      isSelected ? cat.bgColor : "bg-gray-100"
                    )}
                  >
                    {Icon && (
                      <Icon
                        className={cn(
                          "w-4 h-4",
                          isSelected ? cat.color : "text-gray-400"
                        )}
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      className={cn(
                        "text-xs font-medium",
                        isSelected ? "text-green-800" : "text-gray-700"
                      )}
                    >
                      {cat.label}
                    </p>
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  )}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* ====== RESOURCES ====== */}
      <Card className="border border-gray-100">
        <CardContent className="p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-amber-600" />
            Available Resources
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {AVAILABLE_RESOURCES.map((resource) => {
              const Icon = iconComponents[resource.icon];
              const isSelected = formData.availableResources.includes(
                resource.value
              );
              return (
                <button
                  key={resource.value}
                  type="button"
                  onClick={() =>
                    toggleArrayItem("availableResources", resource.value)
                  }
                  className={cn(
                    "flex items-center gap-2.5 p-2.5 rounded-xl border-2 text-left transition-all",
                    isSelected
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200 hover:border-green-300"
                  )}
                >
                  {Icon && (
                    <Icon
                      className={cn(
                        "w-4 h-4",
                        isSelected ? "text-green-700" : "text-gray-400"
                      )}
                    />
                  )}
                  <span
                    className={cn(
                      "text-xs font-medium",
                      isSelected ? "text-green-800" : "text-gray-700"
                    )}
                  >
                    {resource.label}
                  </span>
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-green-600 ml-auto" />
                  )}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* ====== SAVE BUTTON ====== */}
      <div className="flex items-center justify-between sticky bottom-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-lg">
        <p className="text-xs text-muted-foreground hidden sm:block">
          Changes affect AI recommendations and skill matching
        </p>
        <Button
          onClick={handleSave}
          disabled={isPending}
          className="bg-green-800 hover:bg-green-700 text-white ml-auto"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Save Changes
        </Button>
      </div>
    </div>
  );
}