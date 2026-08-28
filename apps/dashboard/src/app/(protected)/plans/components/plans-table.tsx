"use client";

import * as React from "react";

import { CreditCard, Plus } from "lucide-react";

import { BillingPeriod, IPlan } from "@repo/types";

import { useUpdatePlan } from "@/hooks/use-plan-mutations";
import { usePlans } from "@/hooks/use-plans";

import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { getPlanColumns } from "../functions/plan-columns";

interface PlansTableProps {
  onEdit: (plan: IPlan) => void;
  onOpenCreate: () => void;
}

export function PlansTable({ onEdit, onOpenCreate }: PlansTableProps) {
  const [search, setSearch] = React.useState("");
  const [selectedPeriod, setSelectedPeriod] = React.useState<"all" | BillingPeriod>("all");
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

  const { data, isLoading } = usePlans({
    page: pageIndex + 1,
    limit: pageSize,
    billingPeriod: selectedPeriod,
    search: search || undefined
  });

  const updatePlan = useUpdatePlan();

  const handleToggleActive = (plan: IPlan) => {
    const id = plan.id || plan._id;
    if (!id) return;
    updatePlan.mutate({
      id,
      data: { isActive: !plan.isActive }
    });
  };

  const columns = React.useMemo(
    () => getPlanColumns(onEdit, handleToggleActive),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onEdit]
  );

  const plans = data?.items || [];
  const meta = data?.meta || { page: 1, limit: 10, total: 0, totalPages: 1 };
  const pageCount = meta.totalPage || meta.totalPages || 1;

  return (
    <div className="space-y-4">
      {/* Controls row: Period filter pills & Search */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="bg-muted/40 border-border/50 flex items-center gap-1.5 rounded-xl border p-1">
          {(["all", "monthly", "annual"] as const).map((period) => (
            <button
              key={period}
              type="button"
              onClick={() => {
                setSelectedPeriod(period);
                setPageIndex(0);
              }}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-medium capitalize transition-colors ${
                selectedPeriod === period
                  ? "bg-background text-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {period}
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
            placeholder="Search plans..."
            className="text-xs font-normal"
          />
        </div>
      </div>

      {/* Main Server-side paginated DataTable */}
      <DataTable
        columns={columns}
        data={plans}
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
            <CreditCard className="text-muted-foreground/30 mb-3 h-10 w-10" />
            <p className="text-foreground text-sm font-medium">No pricing plans found</p>
            <p className="mt-1 text-xs font-normal">
              Create subscription and hosting tiers for your clients.
            </p>
            <Button onClick={onOpenCreate} size="sm" className="mt-4 text-xs font-medium">
              <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Pricing Plan
            </Button>
          </div>
        }
      />
    </div>
  );
}
