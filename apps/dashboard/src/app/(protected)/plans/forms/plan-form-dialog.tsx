"use client";

import * as React from "react";

import { CreditCard } from "lucide-react";

import { IPlan } from "@repo/types";
import { CreatePlanInput } from "@repo/validators";

import { useCreatePlan, useUpdatePlan } from "@/hooks/use-plan-mutations";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { PlanForm } from "./plan-form";

interface PlanFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan?: IPlan | null;
}

export function PlanFormDialog({ open, onOpenChange, plan }: PlanFormDialogProps) {
  const createPlan = useCreatePlan();
  const updatePlan = useUpdatePlan();

  const isEditing = !!plan;
  const isLoading = createPlan.isPending || updatePlan.isPending;

  const handleSubmit = async (values: CreatePlanInput) => {
    if (plan) {
      const id = plan.id || plan._id;
      if (!id) return;
      await updatePlan.mutateAsync({ id, data: values });
    } else {
      await createPlan.mutateAsync(values);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="text-primary h-5 w-5" />
            <span>{isEditing ? "Edit Pricing Plan" : "Create Pricing Plan"}</span>
          </DialogTitle>
          <DialogDescription>
            Configure tier name, pricing amount, billing frequency, and feature checklist.
          </DialogDescription>
        </DialogHeader>

        <PlanForm
          key={plan ? plan.id || plan._id : "create"}
          defaultValues={
            plan
              ? {
                  name: plan.name,
                  price: plan.price,
                  billingPeriod: plan.billingPeriod,
                  features: plan.features,
                  isPopular: plan.isPopular,
                  isActive: plan.isActive,
                  order: plan.order,
                  description: plan.description,
                  buttonText: plan.buttonText
                }
              : undefined
          }
          onSubmit={handleSubmit}
          isLoading={isLoading}
          onCancel={() => onOpenChange(false)}
          submitLabel={isEditing ? "Update Plan" : "Create Plan"}
        />
      </DialogContent>
    </Dialog>
  );
}
