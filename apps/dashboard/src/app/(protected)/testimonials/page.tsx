"use client";

import * as React from "react";

import { MessageSquareQuote, Plus } from "lucide-react";

import { ITestimonial } from "@repo/types";

import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";

import { TestimonialsTable } from "./components/testimonials-table";
import { TestimonialFormDialog } from "./forms/testimonial-form-dialog";

export default function TestimonialsPage() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingTestimonial, setEditingTestimonial] = React.useState<ITestimonial | null>(null);

  const handleOpenCreate = () => {
    setEditingTestimonial(null);
    setDialogOpen(true);
  };

  const handleOpenEdit = (t: ITestimonial) => {
    setEditingTestimonial(t);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Client Testimonials"
        description="Manage customer feedback, star ratings, video reviews, and website review cards."
        icon={MessageSquareQuote}
      >
        <Button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 text-xs font-bold shadow-md"
        >
          <Plus className="h-4 w-4" />
          <span>Add Testimonial</span>
        </Button>
      </PageHeader>

      <TestimonialsTable onEdit={handleOpenEdit} onOpenCreate={handleOpenCreate} />

      <TestimonialFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        testimonial={editingTestimonial}
      />
    </div>
  );
}
