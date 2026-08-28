"use client";

import * as React from "react";

import { BookOpen, Plus } from "lucide-react";

import { IPost } from "@repo/types";

import { useUpdatePost } from "@/hooks/use-post-mutations";
import { usePostCategories, usePosts } from "@/hooks/use-posts";

import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { getPostColumns } from "../functions/post-columns";

interface PostsTableProps {
  onEdit: (post: IPost) => void;
  onOpenCreate: () => void;
}

export function PostsTable({ onEdit, onOpenCreate }: PostsTableProps) {
  const [search, setSearch] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

  const { data, isLoading } = usePosts({
    page: pageIndex + 1,
    limit: pageSize,
    category: selectedCategory,
    search: search || undefined
  });

  const {
    data: categories = [
      "Cloud Solutions",
      "Cyber Security",
      "DevOps & CI/CD",
      "Managed Services",
      "Technology"
    ]
  } = usePostCategories();

  const updatePost = useUpdatePost();

  const handleTogglePublished = (p: IPost) => {
    const id = p.id || p._id;
    if (!id) return;
    updatePost.mutate({
      id,
      data: { isPublished: !p.isPublished }
    });
  };

  const columns = React.useMemo(
    () => getPostColumns(onEdit, handleTogglePublished),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onEdit]
  );

  const posts = data?.items || [];
  const meta = data?.meta || { page: 1, limit: 10, total: 0, totalPages: 1 };
  const pageCount = meta.totalPages || meta.totalPage || 1;

  return (
    <div className="space-y-4">
      {/* Category Pills & Search */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="bg-muted/40 border-border/50 flex flex-wrap items-center gap-1.5 rounded-xl border p-1">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setSelectedCategory(cat);
                setPageIndex(0);
              }}
              className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-background text-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPageIndex(0);
            }}
            placeholder="Search articles..."
            className="text-xs font-normal"
          />
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        columns={columns}
        data={posts}
        pageCount={pageCount}
        pageIndex={pageIndex}
        pageSize={pageSize}
        onPaginationChange={({ pageIndex: nextPageIndex, pageSize: nextPageSize }) => {
          setPageIndex(nextPageIndex);
          setPageSize(nextPageSize);
        }}
        isLoading={isLoading}
        emptyState={
          <div className="text-muted-foreground flex flex-col items-center justify-center p-12 text-center">
            <BookOpen className="text-muted-foreground/30 mb-3 h-10 w-10" />
            <p className="text-foreground text-sm font-medium">No articles found</p>
            <p className="mt-1 text-xs font-normal">
              Write insightful articles to drive organic search traffic.
            </p>
            <Button onClick={onOpenCreate} size="sm" className="mt-4 text-xs font-medium">
              <Plus className="mr-1.5 h-3.5 w-3.5" /> Write Article
            </Button>
          </div>
        }
      />
    </div>
  );
}
