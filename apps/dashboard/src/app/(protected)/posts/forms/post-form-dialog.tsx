"use client";

import { BookOpen } from "lucide-react";

import { IPost } from "@repo/types";
import { CreatePostInput } from "@repo/validators";

import { useCreatePost, useUpdatePost } from "@/hooks/use-post-mutations";
import { usePostCategories } from "@/hooks/use-posts";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { PostForm } from "./post-form";

interface PostFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post?: IPost | null;
}

export function PostFormDialog({ open, onOpenChange, post }: PostFormDialogProps) {
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();
  const { data: categories } = usePostCategories();

  const isEditing = !!post;
  const isLoading = createPost.isPending || updatePost.isPending;

  const handleSubmit = async (values: CreatePostInput) => {
    if (post) {
      const id = post.id || post._id;
      if (!id) return;
      await updatePost.mutateAsync({ id, data: values });
    } else {
      await createPost.mutateAsync(values);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="text-primary h-5 w-5" />
            <span>{isEditing ? "Edit Blog Article" : "Compose Blog Article"}</span>
          </DialogTitle>
          <DialogDescription>
            Write rich editorial content, configure author credits, and select hero banner images.
          </DialogDescription>
        </DialogHeader>

        <PostForm
          key={post ? post.id || post._id : "create"}
          defaultValues={
            post
              ? {
                  title: post.title,
                  slug: post.slug,
                  excerpt: post.excerpt,
                  body: post.body,
                  coverImage: post.coverImage,
                  category: post.category,
                  author: post.author,
                  publishedAt: post.publishedAt,
                  isPublished: post.isPublished,
                  readTime: post.readTime,
                  tags: post.tags
                }
              : undefined
          }
          categories={categories}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          onCancel={() => onOpenChange(false)}
          submitLabel={isEditing ? "Update Article" : "Publish Article"}
        />
      </DialogContent>
    </Dialog>
  );
}
