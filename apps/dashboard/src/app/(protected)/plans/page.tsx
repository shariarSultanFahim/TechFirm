"use client";

import * as React from "react";

import { CreditCard, Plus } from "lucide-react";

import { IPlan } from "@repo/types";

import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";

import { PlansTable } from "./components/plans-table";
import { PlanFormDialog } from "./forms/plan-form-dialog";

export default function PlansPage() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingPlan, setEditingPlan] = React.useState<IPlan | null>(null);

  const handleOpenCreate = () => {
    setEditingPlan(null);
    setDialogOpen(true);
  };

  const handleOpenEdit = (plan: IPlan) => {
    setEditingPlan(plan);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Pricing & Hosting Plans"
        description="Manage public pricing tiers, billing cycles, highlighted perks, and CTA buttons."
        icon={CreditCard}
      >
        <Button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 text-xs font-bold shadow-md"
        >
          <Plus className="h-4 w-4" />
          <span>Add Plan</span>
        </Button>
      </PageHeader>

      <PlansTable onEdit={handleOpenEdit} onOpenCreate={handleOpenCreate} />

      <PlanFormDialog open={dialogOpen} onOpenChange={setDialogOpen} plan={editingPlan} />
    </div>
  );
}
