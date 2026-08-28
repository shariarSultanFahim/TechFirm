"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Calendar } from "lucide-react";

import { IPost } from "@repo/types";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

import { PostRowActions } from "../components/post-row-actions";

export function getPostColumns(
  onEdit: (post: IPost) => void,
  onTogglePublished: (post: IPost) => void
): ColumnDef<IPost>[] {
  return [
    {
      accessorKey: "coverImage",
      header: "Cover",
      cell: ({ row }) => {
        const p = row.original;
        return (
          <div className="border-border bg-muted relative h-10 w-14 shrink-0 overflow-hidden rounded-lg border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.coverImage} alt={p.title} className="h-full w-full object-cover" />
          </div>
        );
      }
    },
    {
      accessorKey: "title",
      header: "Article Title",
      cell: ({ row }) => {
        const p = row.original;
        return (
          <div className="max-w-xs space-y-0.5">
            <p className="text-foreground line-clamp-1 text-xs font-medium">{p.title}</p>
            <p className="text-muted-foreground line-clamp-1 text-[11px] font-normal">
              {p.excerpt}
            </p>
            {p.slug && (
              <code className="text-muted-foreground bg-muted inline-block rounded-sm px-1 font-mono text-[10px]">
                /blog/{p.slug}
              </code>
            )}
          </div>
        );
      }
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <Badge variant="outline" className="text-[10px] font-medium">
          {row.original.category}
        </Badge>
      )
    },
    {
      accessorKey: "author",
      header: "Author",
      cell: ({ row }) => {
        const author = row.original.author;
        return (
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={author?.avatar} alt={author?.name} />
              <AvatarFallback className="text-[9px] font-medium">
                {author?.name ? author.name.slice(0, 2).toUpperCase() : "AU"}
              </AvatarFallback>
            </Avatar>
            <span className="text-foreground text-xs font-medium">{author?.name || "Author"}</span>
          </div>
        );
      }
    },
    {
      accessorKey: "publishedAt",
      header: "Published",
      cell: ({ row }) => {
        const postDate = row.original.publishedAt || row.original.createdAt;
        const formattedDate = postDate
          ? new Date(postDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            })
          : "Draft";

        return (
          <div className="text-muted-foreground flex items-center gap-1 text-[11px] font-normal">
            <Calendar className="h-3 w-3" />
            <span>{formattedDate}</span>
          </div>
        );
      }
    },
    {
      accessorKey: "isPublished",
      header: "Live",
      cell: ({ row }) => (
        <Switch
          checked={row.original.isPublished}
          onCheckedChange={() => onTogglePublished(row.original)}
        />
      )
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => <PostRowActions post={row.original} onEdit={onEdit} />
    }
  ];
}
