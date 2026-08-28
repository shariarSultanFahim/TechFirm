"use client";

import { HelpCircle } from "lucide-react";

import { IFaq } from "@repo/types";
import { CreateFaqInput } from "@repo/validators";

import { useCreateFaq, useUpdateFaq } from "@/hooks/use-faq-mutations";
import { useFaqCategories } from "@/hooks/use-faqs";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { FaqForm } from "./faq-form";

interface FaqFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  faq?: IFaq | null;
}

export function FaqFormDialog({ open, onOpenChange, faq }: FaqFormDialogProps) {
  const createFaq = useCreateFaq();
  const updateFaq = useUpdateFaq();
  const { data: categories } = useFaqCategories();

  const isEditing = !!faq;
  const isLoading = createFaq.isPending || updateFaq.isPending;

  const handleSubmit = async (values: CreateFaqInput) => {
    if (faq) {
      const id = faq.id || faq._id;
      if (!id) return;
      await updateFaq.mutateAsync({ id, data: values });
    } else {
      await createFaq.mutateAsync(values);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="text-primary h-5 w-5" />
            <span>{isEditing ? "Edit FAQ Item" : "Create FAQ Item"}</span>
          </DialogTitle>
          <DialogDescription>
            Configure question title, clear comprehensive answer, category tag, and display order.
          </DialogDescription>
        </DialogHeader>

        <FaqForm
          key={faq ? faq.id || faq._id : "create"}
          defaultValues={
            faq
              ? {
                  question: faq.question,
                  answer: faq.answer,
                  category: faq.category,
                  order: faq.order,
                  isActive: faq.isActive
                }
              : undefined
          }
          categories={categories}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          onCancel={() => onOpenChange(false)}
          submitLabel={isEditing ? "Update FAQ" : "Create FAQ"}
        />
      </DialogContent>
    </Dialog>
  );
}
