"use client";

import { Briefcase } from "lucide-react";

import { IPortfolioItem } from "@repo/types";
import { CreatePortfolioItemInput } from "@repo/validators";

import { usePortfolioCategories } from "@/hooks/use-portfolio";
import { useCreatePortfolioItem, useUpdatePortfolioItem } from "@/hooks/use-portfolio-mutations";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { PortfolioForm } from "./portfolio-form";

interface PortfolioFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: IPortfolioItem | null;
}

export function PortfolioFormDialog({ open, onOpenChange, item }: PortfolioFormDialogProps) {
  const createPortfolio = useCreatePortfolioItem();
  const updatePortfolio = useUpdatePortfolioItem();
  const { data: categories } = usePortfolioCategories();

  const isEditing = !!item;
  const isLoading = createPortfolio.isPending || updatePortfolio.isPending;

  const handleSubmit = async (values: CreatePortfolioItemInput) => {
    if (item) {
      const id = item.id || item._id;
      if (!id) return;
      await updatePortfolio.mutateAsync({ id, data: values });
    } else {
      await createPortfolio.mutateAsync(values);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Briefcase className="text-primary h-5 w-5" />
            <span>{isEditing ? "Edit Case Study" : "Add Portfolio Case Study"}</span>
          </DialogTitle>
          <DialogDescription>
            Configure showcase projects, client problem descriptions, technical solutions, and
            quantified results.
          </DialogDescription>
        </DialogHeader>

        <PortfolioForm
          key={item ? item.id || item._id : "create"}
          defaultValues={
            item
              ? {
                  title: item.title,
                  subtitle: item.subtitle,
                  category: item.category,
                  industry: item.industry,
                  overview: item.overview,
                  image: item.image,
                  bgImage: item.bgImage,
                  isDark: item.isDark,
                  actionText: item.actionText,
                  challengeText: item.challengeText,
                  solutionText: item.solutionText,
                  results: item.results,
                  order: item.order,
                  isActive: item.isActive
                }
              : undefined
          }
          categories={categories}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          onCancel={() => onOpenChange(false)}
          submitLabel={isEditing ? "Update Case Study" : "Publish Case Study"}
        />
      </DialogContent>
    </Dialog>
  );
}
