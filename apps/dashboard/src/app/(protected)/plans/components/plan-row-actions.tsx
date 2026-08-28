"use client";

import * as React from "react";

import { Pencil, Trash2 } from "lucide-react";

import { IPlan } from "@repo/types";

import { useDeletePlan } from "@/hooks/use-plan-mutations";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Button } from "@/components/ui/button";

interface PlanRowActionsProps {
  plan: IPlan;
  onEdit: (plan: IPlan) => void;
}

export function PlanRowActions({ plan, onEdit }: PlanRowActionsProps) {
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const deletePlan = useDeletePlan();

  const handleDelete = async () => {
    const id = plan.id || plan._id;
    if (!id) return;
    await deletePlan.mutateAsync(id);
    setDeleteOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-end gap-1.5">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onEdit(plan)}
          className="text-foreground hover:text-primary h-8 w-8"
          title="Edit Plan"
        >
          <Pencil className="h-3.5 w-3.5" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setDeleteOpen(true)}
          className="text-muted-foreground hover:text-destructive h-8 w-8"
          title="Delete Plan"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Pricing Plan?"
        description={
          <span>
            Are you sure you want to permanently delete <strong>&quot;{plan.name}&quot;</strong>?
            This action cannot be undone.
          </span>
        }
        isLoading={deletePlan.isPending}
        onConfirm={handleDelete}
      />
    </>
  );
}
