"use client";

import * as React from "react";

import { Pencil, Trash2 } from "lucide-react";

import { IPost } from "@repo/types";

import { useDeletePost } from "@/hooks/use-post-mutations";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Button } from "@/components/ui/button";

interface PostRowActionsProps {
  post: IPost;
  onEdit: (post: IPost) => void;
}

export function PostRowActions({ post, onEdit }: PostRowActionsProps) {
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const deletePost = useDeletePost();

  const handleDelete = async () => {
    const id = post.id || post._id;
    if (!id) return;
    await deletePost.mutateAsync(id);
    setDeleteOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-end gap-1.5">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onEdit(post)}
          className="text-foreground hover:text-primary h-8 w-8"
          title="Edit Article"
        >
          <Pencil className="h-3.5 w-3.5" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setDeleteOpen(true)}
          className="text-muted-foreground hover:text-destructive h-8 w-8"
          title="Delete Article"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Article?"
        description={
          <span>
            Are you sure you want to delete <strong>&quot;{post.title}&quot;</strong>? This action
            cannot be undone.
          </span>
        }
        isLoading={deletePost.isPending}
        onConfirm={handleDelete}
      />
    </>
  );
}
