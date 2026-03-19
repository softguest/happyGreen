// src/components/profile/ProfileSettings.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
import { Input } from "@/components/ui/input";
import { deleteAllUserData, exportUserData } from "@/actions/profile-page";
import { cn } from "@/lib/utils";
import {
  Shield,
  Download,
  Trash2,
  Loader2,
  Key,
  Bell,
  Palette,
  Globe,
  AlertTriangle,
  ExternalLink,
  CheckCircle2,
  FileText,
  Info,
} from "lucide-react";
import { format } from "date-fns";

interface Props {
  profile: {
    id: string;
    clerkId: string;
    fullName: string;
    email: string | null;
    preferredLanguage: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export function ProfileSettings({ profile }: Props) {
  const router = useRouter();
  const { signOut, openUserProfile } = useClerk();
  const [isPending, startTransition] = useTransition();
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [exportMessage, setExportMessage] = useState<string | null>(null);

  const handleExportData = () => {
    startTransition(async () => {
      const data = await exportUserData();
      if (data) {
        const blob = new Blob([JSON.stringify(data, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `greenskillhub_data_${format(
          new Date(),
          "yyyy-MM-dd"
        )}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setExportMessage("Data exported successfully!");
        setTimeout(() => setExportMessage(null), 4000);
      }
    });
  };

  const handleDeleteAccount = () => {
    startTransition(async () => {
      const result = await deleteAllUserData();
      if (result.success) {
        await signOut({ redirectUrl: "/" });
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* ====== ACCOUNT ====== */}
      <Card className="border border-gray-100">
        <CardContent className="p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600" />
            Account & Security
          </h3>

          <div className="space-y-4">
            {/* Email */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">Email</p>
                <p className="text-xs text-muted-foreground">
                  {profile.email || "No email set"}
                </p>
              </div>
              <Badge variant="outline" className="text-xs text-green-700 border-green-200">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </div>

            <Separator />

            {/* Password & Security */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Password & Security
                </p>
                <p className="text-xs text-muted-foreground">
                  Change password, enable 2FA, manage sessions
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => openUserProfile()}
                className="text-xs"
              >
                <Key className="w-3.5 h-3.5 mr-1.5" />
                Manage
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>

            <Separator />

            {/* Account Dates */}
            <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
              <div>
                <p className="font-medium text-gray-700">Account Created</p>
                <p>{format(new Date(profile.createdAt), "dd MMM yyyy, HH:mm")}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Last Updated</p>
                <p>{format(new Date(profile.updatedAt), "dd MMM yyyy, HH:mm")}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ====== PREFERENCES ====== */}
      <Card className="border border-gray-100">
        <CardContent className="p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Palette className="w-4 h-4 text-purple-600" />
            Preferences
          </h3>

          <div className="space-y-4">
            {/* Language */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">Language</p>
                <p className="text-xs text-muted-foreground">
                  {profile.preferredLanguage === "fr"
                    ? "Français"
                    : "English"}
                </p>
              </div>
              <Badge variant="outline" className="text-xs">
                <Globe className="w-3 h-3 mr-1" />
                {profile.preferredLanguage.toUpperCase()}
              </Badge>
            </div>

            <Separator />

            {/* Notifications */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Notifications
                </p>
                <p className="text-xs text-muted-foreground">
                  Learning reminders and impact nudges
                </p>
              </div>
              <Badge variant="outline" className="text-xs text-amber-600 border-amber-200">
                <Bell className="w-3 h-3 mr-1" />
                Coming Soon
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ====== DATA & PRIVACY ====== */}
      <Card className="border border-gray-100">
        <CardContent className="p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4 text-green-600" />
            Data & Privacy
          </h3>

          <div className="space-y-4">
            {/* Export Data */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Export My Data
                </p>
                <p className="text-xs text-muted-foreground">
                  Download all your profile, skills, plans, and impact data as
                  JSON
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportData}
                disabled={isPending}
                className="text-xs text-green-700 border-green-300 hover:bg-green-50"
              >
                {isPending ? (
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                )}
                Export
              </Button>
            </div>

            {exportMessage && (
              <div className="flex items-center gap-2 p-2.5 bg-green-50 border border-green-200 rounded-lg text-xs text-green-800">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {exportMessage}
              </div>
            )}

            <Separator />

            {/* Data Usage Info */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-blue-800">
                    How we use your data
                  </p>
                  <p className="text-[10px] text-blue-700 mt-0.5">
                    Your profile data (location, interests, resources) is used
                    to personalize AI recommendations. Impact logs are
                    aggregated anonymously for community statistics. We never
                    sell your data to third parties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ====== DANGER ZONE ====== */}
      <Card className="border-2 border-red-200">
        <CardContent className="p-5">
          <h3 className="text-sm font-semibold text-red-700 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Danger Zone
          </h3>

          <div className="space-y-4">
            {/* Sign Out */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">Sign Out</p>
                <p className="text-xs text-muted-foreground">
                  Sign out of your account on this device
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut({ redirectUrl: "/" })}
                className="text-xs"
              >
                Sign Out
              </Button>
            </div>

            <Separator />

            {/* Delete Account */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">
                  Delete Account
                </p>
                <p className="text-xs text-muted-foreground">
                  Permanently delete your account and all data. This cannot be
                  undone.
                </p>
              </div>

              <AlertDialog>
                <AlertDialogTrigger>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2 text-red-700">
                      <AlertTriangle className="w-5 h-5" />
                      Delete Account Permanently
                    </AlertDialogTitle>
                    <AlertDialogDescription className="space-y-3">
                      <p>
                        This will permanently delete your account and all
                        associated data including:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Your profile and preferences</li>
                        <li>All saved green skills</li>
                        <li>Learning progress and module completions</li>
                        <li>Business plans</li>
                        <li>Impact logs and activity history</li>
                        <li>Earned badges and points</li>
                        <li>AI conversation history</li>
                      </ul>
                      <p className="font-semibold text-red-700">
                        This action cannot be undone.
                      </p>
                      <div className="pt-2">
                        <p className="text-sm mb-2">
                          Type <strong>DELETE</strong> to confirm:
                        </p>
                        <Input
                          value={deleteConfirmText}
                          onChange={(e) =>
                            setDeleteConfirmText(e.target.value)
                          }
                          placeholder="Type DELETE"
                          className="border-red-300"
                        />
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      onClick={() => setDeleteConfirmText("")}
                    >
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      disabled={deleteConfirmText !== "DELETE" || isPending}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      {isPending ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4 mr-2" />
                      )}
                      Delete Everything
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* App Info */}
      <div className="text-center text-xs text-muted-foreground pb-4 space-y-1">
        <p>Greener Base v1.0 — AI-Powered Green Skills Platform</p>
        <p>Built for Cameroonian youth 🇨🇲 • Powered by Subjectspot</p>
      </div>
    </div>
  );
}