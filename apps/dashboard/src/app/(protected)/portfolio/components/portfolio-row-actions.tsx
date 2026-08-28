"use client";

import * as React from "react";

import { Pencil, Trash2 } from "lucide-react";

import { IPortfolioItem } from "@repo/types";

import { useDeletePortfolioItem } from "@/hooks/use-portfolio-mutations";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Button } from "@/components/ui/button";

interface PortfolioRowActionsProps {
  item: IPortfolioItem;
  onEdit: (item: IPortfolioItem) => void;
}

export function PortfolioRowActions({ item, onEdit }: PortfolioRowActionsProps) {
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const deletePortfolio = useDeletePortfolioItem();

  const handleDelete = async () => {
    const id = item.id || item._id;
    if (!id) return;
    await deletePortfolio.mutateAsync(id);
    setDeleteOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-end gap-1.5">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onEdit(item)}
          className="text-foreground hover:text-primary h-8 w-8"
          title="Edit Case Study"
        >
          <Pencil className="h-3.5 w-3.5" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setDeleteOpen(true)}
          className="text-muted-foreground hover:text-destructive h-8 w-8"
          title="Delete Case Study"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Case Study?"
        description={
          <span>
            Are you sure you want to delete <strong>&quot;{item.title}&quot;</strong>? This action
            cannot be undone.
          </span>
        }
        isLoading={deletePortfolio.isPending}
        onConfirm={handleDelete}
      />
    </>
  );
}
