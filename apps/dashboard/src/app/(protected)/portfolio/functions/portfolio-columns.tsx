"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";

import { IPortfolioItem } from "@repo/types";

import { env } from "@/env";

import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

import { PortfolioRowActions } from "../components/portfolio-row-actions";

export function getPortfolioColumns(
  onEdit: (item: IPortfolioItem) => void,
  onToggleActive: (item: IPortfolioItem) => void
): ColumnDef<IPortfolioItem>[] {
  return [
    {
      accessorKey: "image",
      header: "Preview",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="border-border bg-muted relative h-10 w-12 shrink-0 overflow-hidden rounded-lg border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
          </div>
        );
      }
    },
    {
      accessorKey: "title",
      header: "Project Title",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="max-w-xs space-y-0.5">
            <p className="text-foreground line-clamp-1 text-xs font-medium">{item.title}</p>
            {item.subtitle && (
              <p className="text-muted-foreground line-clamp-1 text-[11px] font-normal">
                {item.subtitle}
              </p>
            )}
            <div className="mt-1 flex items-center gap-1.5">
              <code className="text-muted-foreground bg-muted rounded-sm px-1 font-mono text-[10px]">
                /portfolio/{item.slug}
              </code>
              <a
                href={`${env.NEXT_PUBLIC_WEB_URL || ""}/portfolio/${item.slug}`}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                title="View on Public Site"
              >
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: "category",
      header: "Category & Industry",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="space-y-1">
            <Badge variant="outline" className="text-[10px] font-medium">
              {item.category}
            </Badge>
            {item.industry && (
              <p className="text-muted-foreground text-[10px] font-normal">{item.industry}</p>
            )}
          </div>
        );
      }
    },
    {
      accessorKey: "results",
      header: "Results Metrics",
      cell: ({ row }) => {
        const results = row.original.results || [];
        return (
          <div className="flex max-w-[200px] flex-wrap gap-1">
            {results.length > 0 ? (
              results.slice(0, 2).map((r, i) => (
                <Badge key={i} variant="secondary" className="px-1.5 py-0.5 text-[9px] font-medium">
                  {r.title}
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground text-[11px] font-normal">—</span>
            )}
            {results.length > 2 && (
              <Badge variant="outline" className="text-[9px] font-medium">
                +{results.length - 2} more
              </Badge>
            )}
          </div>
        );
      }
    },
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
      accessorKey: "isActive",
      header: "Live",
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
      cell: ({ row }) => <PortfolioRowActions item={row.original} onEdit={onEdit} />
    }
  ];
}
