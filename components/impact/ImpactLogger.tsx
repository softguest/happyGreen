// src/components/impact/ImpactLogger.tsx
"use client";

import { useState, useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { logImpactActivity } from "@/actions/impact";
import { IMPACT_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  Plus,
  Loader2,
  CheckCircle2,
  Trash2,
  TreePine,
  Zap,
  Droplets,
  TrendingUp,
  Sparkles,
  Calendar,
} from "lucide-react";

const CATEGORY_DETAILS: Record<
  string,
  {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bgColor: string;
    units: { value: string; label: string }[];
    examples: string[];
    quickActions: { label: string; quantity: number; unit: string; description: string }[];
  }
> = {
  waste: {
    label: "Waste Reduced / Recycled",
    icon: Trash2,
    color: "text-amber-700",
    bgColor: "bg-amber-100",
    units: [
      { value: "kg", label: "Kilograms (kg)" },
      { value: "bags", label: "Bags" },
      { value: "items", label: "Items" },
    ],
    examples: [
      "Collected and sorted 10kg of plastic waste",
      "Composted 5kg of organic kitchen waste",
      "Recycled 20 plastic bottles into crafts",
    ],
    quickActions: [
      { label: "🗑️ Composted kitchen waste", quantity: 5, unit: "kg", description: "Composted organic kitchen waste" },
      { label: "♻️ Collected plastic", quantity: 10, unit: "kg", description: "Collected and sorted plastic waste for recycling" },
      { label: "📦 Recycled materials", quantity: 3, unit: "kg", description: "Recycled paper, cardboard, or metal materials" },
    ],
  },
  agriculture: {
    label: "Agriculture & Trees",
    icon: TreePine,
    color: "text-green-700",
    bgColor: "bg-green-100",
    units: [
      { value: "trees", label: "Trees / Seedlings" },
      { value: "kg", label: "Harvest (kg)" },
      { value: "sqm", label: "Area farmed (sqm)" },
    ],
    examples: [
      "Planted 10 tree seedlings in community garden",
      "Harvested 5kg of vegetables from organic garden",
      "Applied composting to 20sqm of farmland",
    ],
    quickActions: [
      { label: "🌱 Planted seedlings", quantity: 5, unit: "trees", description: "Planted tree or crop seedlings" },
      { label: "🥬 Harvested produce", quantity: 3, unit: "kg", description: "Harvested vegetables from organic garden" },
      { label: "🌿 Applied compost", quantity: 10, unit: "sqm", description: "Applied organic compost to farmland" },
    ],
  },
  energy: {
    label: "Energy Saved / Produced",
    icon: Zap,
    color: "text-yellow-700",
    bgColor: "bg-yellow-100",
    units: [
      { value: "kWh", label: "Kilowatt-hours (kWh)" },
      { value: "hours", label: "Hours of solar use" },
      { value: "units", label: "Stoves/devices sold" },
    ],
    examples: [
      "Used solar panel instead of generator for 8 hours",
      "Sold 3 improved cookstoves to community members",
      "Produced 5 briquettes from agricultural waste",
    ],
    quickActions: [
      { label: "☀️ Used solar power", quantity: 5, unit: "kWh", description: "Used solar energy instead of grid/generator" },
      { label: "🍳 Used efficient stove", quantity: 3, unit: "hours", description: "Cooked using improved cookstove instead of 3-stone fire" },
      { label: "🔥 Made briquettes", quantity: 10, unit: "units", description: "Produced biomass briquettes from waste" },
    ],
  },
  water: {
    label: "Water Conserved / Purified",
    icon: Droplets,
    color: "text-blue-700",
    bgColor: "bg-blue-100",
    units: [
      { value: "liters", label: "Liters" },
      { value: "gallons", label: "Gallons" },
    ],
    examples: [
      "Collected 200 liters of rainwater using harvesting system",
      "Purified 50 liters using bio-sand filter",
      "Saved 100 liters with drip irrigation vs flood irrigation",
    ],
    quickActions: [
      { label: "🌧️ Harvested rainwater", quantity: 100, unit: "liters", description: "Collected rainwater using harvesting system" },
      { label: "💧 Purified water", quantity: 20, unit: "liters", description: "Purified water using filter or SODIS method" },
      { label: "🚿 Saved water", quantity: 50, unit: "liters", description: "Saved water through efficient irrigation or practices" },
    ],
  },
  income: {
    label: "Income Generated",
    icon: TrendingUp,
    color: "text-emerald-700",
    bgColor: "bg-emerald-100",
    units: [{ value: "XAF", label: "XAF (CFA Franc)" }],
    examples: [
      "Sold 5 bags of compost for 7,500 XAF",
      "Earned 15,000 XAF from waste collection service",
      "Received 10,000 XAF for solar panel installation",
    ],
    quickActions: [
      { label: "💰 Product sale", quantity: 5000, unit: "XAF", description: "Sold green products (compost, briquettes, crafts, etc.)" },
      { label: "🔧 Service income", quantity: 10000, unit: "XAF", description: "Earned from green service (installation, collection, etc.)" },
      { label: "📚 Training income", quantity: 5000, unit: "XAF", description: "Earned from training or consulting services" },
    ],
  },
};

export function ImpactLogger() {
  const [isPending, startTransition] = useTransition();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [unit, setUnit] = useState("");
  const [dateLogged, setDateLogged] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categoryConfig = selectedCategory
    ? CATEGORY_DETAILS[selectedCategory]
    : null;

  const handleQuickAction = (action: {
    quantity: number;
    unit: string;
    description: string;
  }) => {
    setQuantity(action.quantity);
    setUnit(action.unit);
    setDescription(action.description);
  };

  const handleSubmit = () => {
    if (!selectedCategory || !description.trim() || quantity <= 0 || !unit) {
      setError("Please fill in all fields");
      return;
    }

    setError(null);
    startTransition(async () => {
      const result = await logImpactActivity({
        category: selectedCategory,
        activityDescription: description,
        quantity,
        unit,
        dateLogged: new Date(dateLogged),
      });

      if (result.success) {
        setSuccess(true);
        setDescription("");
        setQuantity(0);
        setTimeout(() => {
          setSuccess(false);
          setSelectedCategory(null);
          setUnit("");
        }, 3000);
      } else {
        setError(result.error || "Failed to log activity");
      }
    });
  };

  // Success state
  if (success) {
    return (
      <Card className="border-2 border-green-300 bg-green-50">
        <CardContent className="p-8 text-center">
          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-heading font-bold text-green-800">
            Impact Logged! 🎉
          </h3>
          <p className="text-green-700 mt-2">
            You earned <strong>10 points</strong> for this activity.
          </p>
          <p className="text-sm text-green-600 mt-1">
            Keep logging to unlock badges and see your total impact grow!
          </p>
          <Button
            onClick={() => {
              setSuccess(false);
              setSelectedCategory(null);
            }}
            className="mt-4 bg-green-800 hover:bg-green-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Log Another Activity
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category Selection */}
      {!selectedCategory && (
        <div>
          <h2 className="text-lg font-heading font-semibold text-gray-800 mb-4">
            What type of impact did you make?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(CATEGORY_DETAILS).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <Card
                  key={key}
                  className="border border-gray-200 card-hover cursor-pointer"
                  onClick={() => {
                    setSelectedCategory(key);
                    if (config.units.length === 1) {
                      setUnit(config.units[0].value);
                    }
                  }}
                >
                  <CardContent className="p-5 text-center">
                    <div
                      className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3",
                        config.bgColor
                      )}
                    >
                      <Icon className={cn("w-7 h-7", config.color)} />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {config.label}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {config.examples[0]}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Log Form */}
      {selectedCategory && categoryConfig && (
        <div className="space-y-4">
          {/* Category Header */}
          <Card className={cn("border", categoryConfig.bgColor.replace("bg-", "border-").replace("100", "200"))}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    categoryConfig.bgColor
                  )}
                >
                  <categoryConfig.icon
                    className={cn("w-5 h-5", categoryConfig.color)}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {categoryConfig.label}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Log your activity below
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedCategory(null);
                  setDescription("");
                  setQuantity(0);
                  setUnit("");
                  setError(null);
                }}
                className="text-gray-400"
              >
                Change
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-gold-500" />
              Quick log:
            </p>
            <div className="flex flex-wrap gap-2">
              {categoryConfig.quickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickAction(action)}
                  className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 hover:border-green-300 hover:bg-green-50 transition-colors text-gray-700"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <Card className="border border-gray-200">
            <CardContent className="p-5 space-y-4">
              {/* Description */}
              <div>
                <Label htmlFor="description">What did you do? *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your activity..."
                  rows={3}
                  className="mt-1 resize-none"
                />
                {/* Example suggestions */}
                <div className="mt-1.5">
                  <p className="text-[10px] text-muted-foreground">
                    Examples:{" "}
                    {categoryConfig.examples.map((ex, i) => (
                      <button
                        key={i}
                        onClick={() => setDescription(ex)}
                        className="text-blue-600 hover:underline"
                      >
                        {ex}
                        {i < categoryConfig.examples.length - 1 ? " • " : ""}
                      </button>
                    ))}
                  </p>
                </div>
              </div>

              {/* Quantity + Unit */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={quantity || ""}
                    onChange={(e) =>
                      setQuantity(parseFloat(e.target.value) || 0)
                    }
                    placeholder="0"
                    min={0}
                    step={selectedCategory === "income" ? 100 : 0.5}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="unit">Unit *</Label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryConfig.units.map((u) => (
                        <SelectItem key={u.value} value={u.value}>
                          {u.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Date */}
              <div>
                <Label htmlFor="date">Date of activity</Label>
                <div className="relative mt-1">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="date"
                    type="date"
                    value={dateLogged}
                    onChange={(e) => setDateLogged(e.target.value)}
                    max={new Date().toISOString().split("T")[0]}
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                  {error}
                </p>
              )}

              {/* Submit */}
              <Button
                onClick={handleSubmit}
                disabled={isPending || !description.trim() || quantity <= 0 || !unit}
                className="w-full bg-green-800 hover:bg-green-700 text-white"
                size="lg"
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4 mr-2" />
                )}
                Log Impact Activity (+10 points)
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}