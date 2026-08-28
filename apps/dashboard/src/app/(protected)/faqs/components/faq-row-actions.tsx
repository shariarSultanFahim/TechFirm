"use client";

import * as React from "react";

import { Pencil, Trash2 } from "lucide-react";

import { IFaq } from "@repo/types";

import { useDeleteFaq } from "@/hooks/use-faq-mutations";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Button } from "@/components/ui/button";

interface FaqRowActionsProps {
  faq: IFaq;
  onEdit: (faq: IFaq) => void;
}

export function FaqRowActions({ faq, onEdit }: FaqRowActionsProps) {
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const deleteFaq = useDeleteFaq();

  const handleDelete = async () => {
    const id = faq.id || faq._id;
    if (!id) return;
    await deleteFaq.mutateAsync(id);
    setDeleteOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-end gap-1.5">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onEdit(faq)}
          className="text-foreground hover:text-primary h-8 w-8"
          title="Edit FAQ"
        >
          <Pencil className="h-3.5 w-3.5" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setDeleteOpen(true)}
          className="text-muted-foreground hover:text-destructive h-8 w-8"
          title="Delete FAQ"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Question?"
        description={
          <span>
            Are you sure you want to delete <strong>&quot;{faq.question}&quot;</strong>? This action
            cannot be undone.
          </span>
        }
        isLoading={deleteFaq.isPending}
        onConfirm={handleDelete}
      />
    </>
  );
}
