// src/components/community/CommunityFeed.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
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
import { createPost, toggleLike, deletePost } from "@/actions/community";
import { CAMEROON_REGIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  Plus,
  Heart,
  MessageCircle,
  MapPin,
  Star,
  Loader2,
  Pin,
  Trash2,
  Filter,
  HelpCircle,
  Lightbulb,
  BookOpen,
  Megaphone,
  Calendar,
  Send,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { PostDetail } from "./PostDetail";

const POST_CATEGORIES = [
  { value: "all", label: "All Posts", icon: MessageCircle, color: "text-gray-600" },
  { value: "question", label: "Questions", icon: HelpCircle, color: "text-blue-600" },
  { value: "tip", label: "Tips & Advice", icon: Lightbulb, color: "text-gold-600" },
  { value: "story", label: "Success Stories", icon: BookOpen, color: "text-green-600" },
  { value: "opportunity", label: "Opportunities", icon: Megaphone, color: "text-purple-600" },
  { value: "event", label: "Events", icon: Calendar, color: "text-orange-600" },
];

const CATEGORY_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  question: { label: "Question", color: "text-blue-700", bg: "bg-blue-100" },
  tip: { label: "Tip", color: "text-gold-700", bg: "bg-gold-100" },
  story: { label: "Story", color: "text-green-700", bg: "bg-green-100" },
  opportunity: { label: "Opportunity", color: "text-purple-700", bg: "bg-purple-100" },
  event: { label: "Event", color: "text-orange-700", bg: "bg-orange-100" },
};

interface Props {
  feed: {
    posts: Array<{
      post: {
        id: string;
        title: string;
        content: string;
        category: string;
        tags: unknown;
        likesCount: number;
        repliesCount: number;
        isPinned: boolean;
        createdAt: Date;
      };
      author: {
        id: string;
        fullName: string;
        region: string | null;
        city: string | null;
        totalPoints: number;
      };
      isLikedByUser: boolean;
      isOwnPost: boolean;
    }>;
    total: number;
    page: number;
    totalPages: number;
    currentUserId: string;
  };
  defaultCategory?: string;
}

export function CommunityFeed({ feed, defaultCategory }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeCategory, setActiveCategory] = useState(defaultCategory || "all");
  const [showNewPost, setShowNewPost] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  // New post form
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState("question");
  const [newTags, setNewTags] = useState("");

  const handleCreatePost = () => {
    if (!newTitle.trim() || !newContent.trim()) return;

    startTransition(async () => {
      const tags = newTags
        .split(",")
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean);

      const result = await createPost({
        title: newTitle,
        content: newContent,
        category: newCategory,
        tags,
      });

      if (result.success) {
        setShowNewPost(false);
        setNewTitle("");
        setNewContent("");
        setNewTags("");
      }
    });
  };

  const handleLike = (postId: string) => {
    startTransition(async () => {
      await toggleLike(postId, "post");
    });
  };

  const handleDelete = (postId: string) => {
    startTransition(async () => {
      await deletePost(postId);
    });
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    const url = new URL(window.location.href);
    if (cat === "all") {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", cat);
    }
    url.searchParams.set("tab", "feed");
    router.push(url.pathname + url.search);
  };

  // If a post is selected, show detail view
  if (selectedPostId) {
    return (
      <PostDetail
        postId={selectedPostId}
        onBack={() => setSelectedPostId(null)}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-1.5">
            {POST_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryChange(cat.value)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all",
                    activeCategory === cat.value
                      ? "bg-green-800 text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-green-300"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        <Dialog open={showNewPost} onOpenChange={setShowNewPost}>
          <DialogTrigger>
            <Button className="bg-green-800 hover:bg-green-700 text-white flex-shrink-0">
              <Plus className="w-4 h-4 mr-1.5" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create a Post</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div>
                <Label>Category</Label>
                <Select value={newCategory} onValueChange={setNewCategory}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {POST_CATEGORIES.filter((c) => c.value !== "all").map(
                      (cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Title *</Label>
                <Input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="What's on your mind?"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Content *</Label>
                <Textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Share your thoughts, questions, or experiences..."
                  rows={5}
                  className="mt-1 resize-none"
                />
              </div>
              <div>
                <Label>Tags (comma-separated)</Label>
                <Input
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="e.g., composting, recycling, douala"
                  className="mt-1"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewPost(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleCreatePost}
                disabled={isPending || !newTitle.trim() || !newContent.trim()}
                className="bg-green-800 hover:bg-green-700 text-white"
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Send className="w-4 h-4 mr-2" />
                )}
                Publish (+5 pts)
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Posts List */}
      {feed.posts.length === 0 ? (
        <Card className="border-2 border-dashed border-gray-200">
          <CardContent className="p-8 text-center">
            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-heading font-semibold text-gray-600">
              No posts yet
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Be the first to start a discussion!
            </p>
            <Button
              onClick={() => setShowNewPost(true)}
              className="mt-4 bg-green-800 hover:bg-green-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create First Post
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {feed.posts.map(({ post, author, isLikedByUser, isOwnPost }) => {
            const catConfig = CATEGORY_CONFIG[post.category];
            const regionLabel = CAMEROON_REGIONS.find(
              (r) => r.value === author.region
            )?.label;
            const tags = (post.tags as string[]) || [];
            const initials = author.fullName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);

            return (
              <Card
                key={post.id}
                className={cn(
                  "border border-gray-100 hover:border-gray-200 transition-all cursor-pointer",
                  post.isPinned && "border-gold-200 bg-gold-50/20"
                )}
                onClick={() => setSelectedPostId(post.id)}
              >
                <CardContent className="p-4">
                  {/* Pinned */}
                  {post.isPinned && (
                    <div className="flex items-center gap-1 text-[10px] text-gold-600 font-medium mb-2">
                      <Pin className="w-3 h-3" />
                      Pinned
                    </div>
                  )}

                  <div className="flex gap-3">
                    {/* Avatar */}
                    <div className="w-9 h-9 bg-green-200 rounded-full flex items-center justify-center text-green-800 text-xs font-bold flex-shrink-0">
                      {initials}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Author & Meta */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-gray-900">
                          {author.fullName}
                        </span>
                        {regionLabel && (
                          <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                            <MapPin className="w-3 h-3" />
                            {author.city || regionLabel.split(" ")[0]}
                          </span>
                        )}
                        <span className="text-[10px] text-muted-foreground">
                          ·{" "}
                          {formatDistanceToNow(new Date(post.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>

                      {/* Category Badge */}
                      {catConfig && (
                        <Badge
                          className={cn(
                            "text-[10px] mt-1",
                            catConfig.bg,
                            catConfig.color
                          )}
                        >
                          {catConfig.label}
                        </Badge>
                      )}

                      {/* Title */}
                      <h3 className="font-semibold text-gray-900 mt-1.5 line-clamp-1">
                        {post.title}
                      </h3>

                      {/* Content Preview */}
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {post.content}
                      </p>

                      {/* Tags */}
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center gap-4 mt-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(post.id);
                          }}
                          className={cn(
                            "flex items-center gap-1 text-xs transition-colors",
                            isLikedByUser
                              ? "text-red-500"
                              : "text-gray-400 hover:text-red-500"
                          )}
                        >
                          <Heart
                            className={cn(
                              "w-4 h-4",
                              isLikedByUser && "fill-current"
                            )}
                          />
                          {post.likesCount}
                        </button>
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <MessageCircle className="w-4 h-4" />
                          {post.repliesCount}
                        </span>
                        {isOwnPost && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(post.id);
                            }}
                            className="flex items-center gap-1 text-xs text-gray-300 hover:text-red-500 ml-auto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {feed.totalPages > 1 && (
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Page {feed.page} of {feed.totalPages} · {feed.total} posts
          </p>
        </div>
      )}
    </div>
  );
}