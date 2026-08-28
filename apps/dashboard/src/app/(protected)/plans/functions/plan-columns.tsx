"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Sparkles } from "lucide-react";

import { IPlan } from "@repo/types";

import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

import { PlanRowActions } from "../components/plan-row-actions";
import { formatPlanPrice } from "./format-plan-price";

export function getPlanColumns(
  onEdit: (plan: IPlan) => void,
  onToggleActive: (plan: IPlan) => void
): ColumnDef<IPlan>[] {
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
      accessorKey: "name",
      header: "Plan Name",
      cell: ({ row }) => {
        const plan = row.original;
        return (
          <div className="max-w-[200px] min-w-[130px] space-y-0.5">
            <p className="text-foreground flex flex-wrap items-center gap-1.5 text-xs font-medium">
              <span>{plan.name}</span>
              {plan.isPopular && (
                <Badge variant="default" className="px-1.5 py-0 text-[10px] font-medium">
                  Popular
                </Badge>
              )}
            </p>
            {plan.description && (
              <p className="text-muted-foreground line-clamp-1 text-[11px] font-normal break-words">
                {plan.description}
              </p>
            )}
          </div>
        );
      }
    },
    {
      accessorKey: "price",
      header: "Pricing",
      cell: ({ row }) => {
        const plan = row.original;
        return (
          <div className="flex min-w-[110px] items-center gap-1.5 whitespace-nowrap">
            <span className="text-foreground text-xs font-semibold">
              {formatPlanPrice(plan.price, plan.billingPeriod)}
            </span>
            <Badge variant="outline" className="text-[10px] font-medium capitalize">
              {plan.billingPeriod}
            </Badge>
          </div>
        );
      }
    },
    {
      accessorKey: "features",
      header: "Features",
      cell: ({ row }) => {
        const features = row.original.features || [];
        return (
          <div className="flex max-w-[200px] min-w-[140px] flex-wrap gap-1">
            {features.slice(0, 2).map((f) => (
              <Badge key={f} variant="secondary" className="py-0 text-[10px] font-medium break-all">
                {f}
              </Badge>
            ))}
            {features.length > 2 && (
              <span className="text-muted-foreground text-[10px] font-normal whitespace-nowrap">
                +{features.length - 2} more
              </span>
            )}
          </div>
        );
      }
    },
    {
      accessorKey: "isPopular",
      header: "Featured",
      cell: ({ row }) =>
        row.original.isPopular ? (
          <span className="text-primary flex items-center gap-1 text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5" /> Yes
          </span>
        ) : (
          <span className="text-muted-foreground text-xs font-normal">No</span>
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
      cell: ({ row }) => <PlanRowActions plan={row.original} onEdit={onEdit} />
    }
  ];
}
