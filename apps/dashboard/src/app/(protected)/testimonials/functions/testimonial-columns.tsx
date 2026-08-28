"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Star, Video } from "lucide-react";

import { ITestimonial } from "@repo/types";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

import { TestimonialRowActions } from "../components/testimonial-row-actions";

export function getTestimonialColumns(
  onEdit: (testimonial: ITestimonial) => void,
  onToggleActive: (testimonial: ITestimonial) => void
): ColumnDef<ITestimonial>[] {
  return [
    {
      accessorKey: "order",
      header: "Order",
      cell: ({ row }) => (
        <span className="text-muted-foreground font-mono text-xs font-normal">
          #{row.original.order}
        </span>
      )
    },
    {
      accessorKey: "authorName",
      header: "Reviewer",
      cell: ({ row }) => {
        const t = row.original;
        return (
          <div className="flex max-w-[180px] min-w-[130px] items-center gap-2.5">
            <Avatar className="border-border h-8 w-8 shrink-0 rounded-full border">
              <AvatarImage src={t.avatar} alt={t.authorName} />
              <AvatarFallback className="text-xs font-medium">
                {t.authorName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 space-y-0.5">
              <p className="text-foreground truncate text-xs font-medium">{t.authorName}</p>
              <p className="text-muted-foreground truncate text-[11px] font-normal">
                {t.authorRole} {t.company ? `• ${t.company}` : ""}
              </p>
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: "quote",
      header: "Quote & Badges",
      cell: ({ row }) => {
        const t = row.original;
        return (
          <div className="max-w-xs min-w-[180px] space-y-1.5 sm:max-w-sm">
            <p className="text-foreground/80 line-clamp-2 text-xs font-normal break-words italic">
              &quot;{t.quote}&quot;
            </p>
            {t.tags && t.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {t.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-muted text-muted-foreground rounded-sm px-1.5 py-0.5 text-[10px] font-medium whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      }
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-amber-500">
          {Array.from({ length: row.original.rating ?? 5 }).map((_, idx) => (
            <Star key={idx} className="h-3 w-3 fill-current" />
          ))}
        </div>
      )
    },
    {
      accessorKey: "hasVideo",
      header: "Type",
      cell: ({ row }) =>
        row.original.hasVideo ? (
          <Badge
            variant="secondary"
            className="border-primary/20 bg-primary/10 text-primary gap-1 text-[10px] font-medium"
          >
            <Video className="h-3 w-3" /> Video Review
          </Badge>
        ) : (
          <span className="text-muted-foreground text-xs font-normal">Standard</span>
        )
    },
    {
      accessorKey: "isActive",
      header: "Active",
      cell: ({ row }) => (
        <Switch
          checked={row.original.isActive}
          onCheckedChange={() => onToggleActive(row.original)}
        />
      )
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => <TestimonialRowActions testimonial={row.original} onEdit={onEdit} />
    }
  ];
}
