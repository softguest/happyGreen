// src/components/admin/AdminSkillsView.tsx
"use client";

import { useState, useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  createAdminSkill,
  updateAdminSkill,
  deleteAdminSkill,
} from "@/actions/admin";
import { SKILL_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Brain,
  Users,
  BookOpen,
  Eye,
  EyeOff,
  Search,
  Filter,
} from "lucide-react";

interface SkillWithStats {
  id: string;
  name: string;
  category: string;
  description: string;
  shortDescription: string | null;
  difficulty: string;
  estimatedDuration: string | null;
  requiredResources: unknown;
  applicableRegions: unknown;
  marketPotential: string | null;
  climateBenefit: string | null;
  icon: string | null;
  isActive: boolean;
  createdAt: Date;
  saveCount: number;
  pathwayCount: number;
}

interface Props {
  skills: SkillWithStats[];
}

const emptySkill = {
  name: "",
  category: "agriculture",
  description: "",
  shortDescription: "",
  difficulty: "beginner",
  estimatedDuration: "2 weeks",
  requiredResources: [] as string[],
  applicableRegions: [] as string[],
  marketPotential: "medium",
  climateBenefit: "",
  icon: "Sprout",
};

export function AdminSkillsView({ skills }: Props) {
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingSkill, setEditingSkill] = useState<SkillWithStats | null>(null);
  const [formData, setFormData] = useState(emptySkill);

  const filteredSkills = skills.filter((skill) => {
    const matchesSearch =
      !searchQuery ||
      skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !categoryFilter || skill.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const openCreate = () => {
    setFormData(emptySkill);
    setEditingSkill(null);
    setShowCreateDialog(true);
  };

  const openEdit = (skill: SkillWithStats) => {
    setFormData({
      name: skill.name,
      category: skill.category,
      description: skill.description,
      shortDescription: skill.shortDescription || "",
      difficulty: skill.difficulty,
      estimatedDuration: skill.estimatedDuration || "2 weeks",
      requiredResources: (skill.requiredResources as string[]) || [],
      applicableRegions: (skill.applicableRegions as string[]) || [],
      marketPotential: skill.marketPotential || "medium",
      climateBenefit: skill.climateBenefit || "",
      icon: skill.icon || "Sprout",
    });
    setEditingSkill(skill);
    setShowCreateDialog(true);
  };

  const handleSave = () => {
    startTransition(async () => {
      if (editingSkill) {
        await updateAdminSkill(editingSkill.id, formData);
      } else {
        await createAdminSkill(formData);
      }
      setShowCreateDialog(false);
      setEditingSkill(null);
    });
  };

  const handleToggleActive = (skill: SkillWithStats) => {
    startTransition(async () => {
      await updateAdminSkill(skill.id, { isActive: !skill.isActive });
    });
  };

  const handleDelete = (skillId: string) => {
    startTransition(async () => {
      await deleteAdminSkill(skillId);
    });
  };

  const getCategoryInfo = (category: string) =>
    SKILL_CATEGORIES.find((c) => c.value === category);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">
            Skills Management
          </h1>
          <p className="text-muted-foreground mt-1">
            {skills.length} skills in catalog
          </p>
        </div>
        <Button onClick={openCreate} className="bg-gray-900 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills..."
            className="pl-9"
          />
        </div>
        <Select
          value={categoryFilter || "all"}
          onValueChange={(v) => setCategoryFilter(v === "all" ? "" : v)}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {SKILL_CATEGORIES.map((c) => (
              <SelectItem key={c.value} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Skills Table */}
      <Card className="border border-gray-100">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Skill</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Category</th>
                  <th className="text-center px-4 py-3 text-gray-600 font-medium">Difficulty</th>
                  <th className="text-center px-4 py-3 text-gray-600 font-medium">Saves</th>
                  <th className="text-center px-4 py-3 text-gray-600 font-medium">Pathways</th>
                  <th className="text-center px-4 py-3 text-gray-600 font-medium">Status</th>
                  <th className="text-right px-4 py-3 text-gray-600 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSkills.map((skill) => {
                  const catInfo = getCategoryInfo(skill.category);
                  return (
                    <tr key={skill.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900 line-clamp-1">
                          {skill.name}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {skill.shortDescription || skill.description.substring(0, 60)}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant="outline"
                          className={cn("text-[10px]", catInfo?.bgColor, catInfo?.color)}
                        >
                          {catInfo?.label?.split(" ")[0]}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge
                          className={cn(
                            "text-[10px]",
                            skill.difficulty === "beginner"
                              ? "bg-green-100 text-green-700"
                              : skill.difficulty === "intermediate"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-red-100 text-red-700"
                          )}
                        >
                          {skill.difficulty}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Users className="w-3 h-3 text-gray-400" />
                          <span className="font-medium">{skill.saveCount}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <BookOpen className="w-3 h-3 text-gray-400" />
                          <span className="font-medium">{skill.pathwayCount}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button onClick={() => handleToggleActive(skill)}>
                          {skill.isActive ? (
                            <Badge className="text-[10px] bg-green-100 text-green-700 cursor-pointer">
                              <Eye className="w-3 h-3 mr-1" />
                              Active
                            </Badge>
                          ) : (
                            <Badge className="text-[10px] bg-gray-100 text-gray-500 cursor-pointer">
                              <EyeOff className="w-3 h-3 mr-1" />
                              Hidden
                            </Badge>
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEdit(skill)}
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete skill?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Delete &quot;{skill.name}&quot;? This may fail if users
                                  have saved this skill or pathways depend on it.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(skill.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Create / Edit Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingSkill ? "Edit Skill" : "Add New Skill"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label>Skill Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, name: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(v) =>
                    setFormData((p) => ({ ...p, category: v }))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SKILL_CATEGORIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Difficulty</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(v) =>
                    setFormData((p) => ({ ...p, difficulty: v }))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:col-span-2">
                <Label>Description *</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, description: e.target.value }))
                  }
                  rows={4}
                  className="mt-1 resize-none"
                />
              </div>
              <div className="sm:col-span-2">
                <Label>Short Description</Label>
                <Input
                  value={formData.shortDescription}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      shortDescription: e.target.value,
                    }))
                  }
                  placeholder="Brief one-liner"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Estimated Duration</Label>
                <Input
                  value={formData.estimatedDuration}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      estimatedDuration: e.target.value,
                    }))
                  }
                  placeholder="e.g., 2 weeks"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Market Potential</Label>
                <Select
                  value={formData.marketPotential}
                  onValueChange={(v) =>
                    setFormData((p) => ({ ...p, marketPotential: v }))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:col-span-2">
                <Label>Climate Benefit</Label>
                <Textarea
                  value={formData.climateBenefit}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      climateBenefit: e.target.value,
                    }))
                  }
                  rows={2}
                  className="mt-1 resize-none"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isPending || !formData.name || !formData.description}
              className="bg-gray-900 text-white"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Brain className="w-4 h-4 mr-2" />
              )}
              {editingSkill ? "Update Skill" : "Create Skill"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}