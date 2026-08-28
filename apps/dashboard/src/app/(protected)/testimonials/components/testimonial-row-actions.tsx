"use client";

import * as React from "react";

import { Pencil, Trash2 } from "lucide-react";

import { ITestimonial } from "@repo/types";

import { useDeleteTestimonial } from "@/hooks/use-testimonial-mutations";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Button } from "@/components/ui/button";

interface TestimonialRowActionsProps {
  testimonial: ITestimonial;
  onEdit: (testimonial: ITestimonial) => void;
}

export function TestimonialRowActions({ testimonial, onEdit }: TestimonialRowActionsProps) {
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const deleteTestimonial = useDeleteTestimonial();

  const handleDelete = async () => {
    const id = testimonial.id || testimonial._id;
    if (!id) return;
    await deleteTestimonial.mutateAsync(id);
    setDeleteOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-end gap-1.5">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onEdit(testimonial)}
          className="text-foreground hover:text-primary h-8 w-8"
          title="Edit Testimonial"
        >
          <Pencil className="h-3.5 w-3.5" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setDeleteOpen(true)}
          className="text-muted-foreground hover:text-destructive h-8 w-8"
          title="Delete Testimonial"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Testimonial?"
        description={
          <span>
            Are you sure you want to delete the review by{" "}
            <strong>&quot;{testimonial.authorName}&quot;</strong>? This action cannot be undone.
          </span>
        }
        isLoading={deleteTestimonial.isPending}
        onConfirm={handleDelete}
      />
    </>
  );
}
