"use client";

import * as React from "react";

import { BookOpen, Plus } from "lucide-react";

import { IPost } from "@repo/types";

import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";

import { PostsTable } from "./components/posts-table";
import { PostFormDialog } from "./forms/post-form-dialog";

export default function PostsPage() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingPost, setEditingPost] = React.useState<IPost | null>(null);

  const handleOpenCreate = () => {
    setEditingPost(null);
    setDialogOpen(true);
  };

  const handleOpenEdit = (post: IPost) => {
    setEditingPost(post);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Blog Articles & Insights"
        description="Manage company knowledge base, technical thought leadership, categories, and published guides."
        icon={BookOpen}
      >
        <Button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 text-xs font-bold shadow-md"
        >
          <Plus className="h-4 w-4" />
          <span>Write Article</span>
        </Button>
      </PageHeader>

      <PostsTable onEdit={handleOpenEdit} onOpenCreate={handleOpenCreate} />

      <PostFormDialog open={dialogOpen} onOpenChange={setDialogOpen} post={editingPost} />
    </div>
  );
}
