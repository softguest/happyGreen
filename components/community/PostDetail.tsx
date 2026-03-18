// src/components/community/PostDetail.tsx
"use client";

import { useState, useEffect, useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getPostWithReplies, createReply, toggleLike } from "@/actions/community";
import { CAMEROON_REGIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  MapPin,
  Send,
  Loader2,
  Star,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Props {
  postId: string;
  onBack: () => void;
}

const CATEGORY_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  question: { label: "Question", color: "text-blue-700", bg: "bg-blue-100" },
  tip: { label: "Tip", color: "text-gold-700", bg: "bg-gold-100" },
  story: { label: "Story", color: "text-green-700", bg: "bg-green-100" },
  opportunity: { label: "Opportunity", color: "text-purple-700", bg: "bg-purple-100" },
  event: { label: "Event", color: "text-orange-700", bg: "bg-orange-100" },
};

export function PostDetail({ postId, onBack }: Props) {
  const [isPending, startTransition] = useTransition();
  const [postData, setPostData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    loadPost();
  }, [postId]);

  const loadPost = async () => {
    setLoading(true);
    const data = await getPostWithReplies(postId);
    setPostData(data);
    setLoading(false);
  };

  const handleReply = () => {
    if (!replyContent.trim()) return;
    startTransition(async () => {
      await createReply(postId, replyContent);
      setReplyContent("");
      await loadPost();
    });
  };

  const handleLikePost = () => {
    startTransition(async () => {
      await toggleLike(postId, "post");
      await loadPost();
    });
  };

  const handleLikeReply = (replyId: string) => {
    startTransition(async () => {
      await toggleLike(replyId, "reply");
      await loadPost();
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-green-700" />
      </div>
    );
  }

  if (!postData) {
    return (
      <Card className="border-dashed border-2 border-gray-200">
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">Post not found</p>
          <Button variant="outline" onClick={onBack} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </CardContent>
      </Card>
    );
  }

  const { post, author, isLikedByUser, replies } = postData;
  const catConfig = CATEGORY_CONFIG[post.category];
  const regionLabel = CAMEROON_REGIONS.find(
    (r) => r.value === author.region
  )?.label;
  const authorInitials = author.fullName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="space-y-4">
      {/* Back */}
      <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-600">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Feed
      </Button>

      {/* Post */}
      <Card className="border border-gray-200">
        <CardContent className="p-5">
          <div className="flex gap-3">
            <div className="w-11 h-11 bg-green-200 rounded-full flex items-center justify-center text-green-800 text-sm font-bold flex-shrink-0">
              {authorInitials}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-gray-900">
                  {author.fullName}
                </span>
                <Badge variant="outline" className="text-[10px] border-gold-200 text-gold-700">
                  <Star className="w-3 h-3 mr-0.5" />
                  {author.totalPoints}
                </Badge>
                {regionLabel && (
                  <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                    <MapPin className="w-3 h-3" />
                    {author.city || regionLabel.split(" ")[0]}
                  </span>
                )}
                <span className="text-xs text-muted-foreground">
                  ·{" "}
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>

              {catConfig && (
                <Badge className={cn("text-[10px] mt-1.5", catConfig.bg, catConfig.color)}>
                  {catConfig.label}
                </Badge>
              )}

              <h2 className="text-lg font-heading font-bold text-gray-900 mt-2">
                {post.title}
              </h2>

              <div className="text-sm text-gray-700 mt-3 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </div>

              {/* Tags */}
              {(post.tags as string[])?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {(post.tags as string[]).map((tag: string) => (
                    <span
                      key={tag}
                      className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100">
                <button
                  onClick={handleLikePost}
                  className={cn(
                    "flex items-center gap-1.5 text-sm transition-colors",
                    isLikedByUser
                      ? "text-red-500"
                      : "text-gray-500 hover:text-red-500"
                  )}
                >
                  <Heart
                    className={cn("w-5 h-5", isLikedByUser && "fill-current")}
                  />
                  {post.likesCount} {post.likesCount === 1 ? "like" : "likes"}
                </button>
                <span className="flex items-center gap-1.5 text-sm text-gray-500">
                  <MessageCircle className="w-5 h-5" />
                  {post.repliesCount}{" "}
                  {post.repliesCount === 1 ? "reply" : "replies"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reply Input */}
      <Card className="border border-gray-200">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write a reply... (+3 points)"
              rows={2}
              className="flex-1 resize-none"
            />
            <Button
              onClick={handleReply}
              disabled={isPending || !replyContent.trim()}
              className="bg-green-800 hover:bg-green-700 text-white self-end"
              size="sm"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Replies */}
      {replies.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700">
            {replies.length} {replies.length === 1 ? "Reply" : "Replies"}
          </h3>
          {replies.map(({ reply, author: replyAuthor, isLikedByUser: replyLiked }: any) => {
            const rInitials = replyAuthor.fullName
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);
            const rRegion = CAMEROON_REGIONS.find(
              (r) => r.value === replyAuthor.region
            )?.label;

            return (
              <Card key={reply.id} className="border border-gray-100 ml-4 sm:ml-8">
                <CardContent className="p-3">
                  <div className="flex gap-2.5">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-[10px] font-bold flex-shrink-0">
                      {rInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-gray-900">
                          {replyAuthor.fullName}
                        </span>
                        {rRegion && (
                          <span className="text-[10px] text-muted-foreground">
                            {rRegion.split(" ")[0]}
                          </span>
                        )}
                        <span className="text-[10px] text-muted-foreground">
                          ·{" "}
                          {formatDistanceToNow(new Date(reply.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">
                        {reply.content}
                      </p>
                      <button
                        onClick={() => handleLikeReply(reply.id)}
                        className={cn(
                          "flex items-center gap-1 text-xs mt-2 transition-colors",
                          replyLiked
                            ? "text-red-500"
                            : "text-gray-400 hover:text-red-500"
                        )}
                      >
                        <Heart
                          className={cn(
                            "w-3.5 h-3.5",
                            replyLiked && "fill-current"
                          )}
                        />
                        {reply.likesCount}
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}