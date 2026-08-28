"use client";

import { ColumnDef } from "@tanstack/react-table";

import { IFaq } from "@repo/types";

import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

import { FaqRowActions } from "../components/faq-row-actions";

export function getFaqColumns(
  onEdit: (faq: IFaq) => void,
  onToggleActive: (faq: IFaq) => void
): ColumnDef<IFaq>[] {
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
      accessorKey: "question",
      header: "Question",
      cell: ({ row }) => (
        <span className="text-foreground max-w-xs text-xs font-medium">
          {row.original.question}
        </span>
      )
    },
    {
      accessorKey: "answer",
      header: "Answer",
      cell: ({ row }) => (
        <p className="text-muted-foreground line-clamp-2 max-w-md text-xs font-normal">
          {row.original.answer}
        </p>
      )
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <Badge variant="outline" className="text-[10px] font-medium capitalize">
          {row.original.category}
        </Badge>
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
      cell: ({ row }) => <FaqRowActions faq={row.original} onEdit={onEdit} />
    }
  ];
}
