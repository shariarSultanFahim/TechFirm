"use client";

import * as React from "react";

import { MessageSquareQuote } from "lucide-react";

import { ITestimonial } from "@repo/types";
import { CreateTestimonialInput } from "@repo/validators";

import { useCreateTestimonial, useUpdateTestimonial } from "@/hooks/use-testimonial-mutations";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { TestimonialForm } from "./testimonial-form";

interface TestimonialFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  testimonial?: ITestimonial | null;
}

export function TestimonialFormDialog({
  open,
  onOpenChange,
  testimonial
}: TestimonialFormDialogProps) {
  const createTestimonial = useCreateTestimonial();
  const updateTestimonial = useUpdateTestimonial();

  const isEditing = !!testimonial;
  const isLoading = createTestimonial.isPending || updateTestimonial.isPending;

  const handleSubmit = async (values: CreateTestimonialInput) => {
    if (testimonial) {
      const id = testimonial.id || testimonial._id;
      if (!id) return;
      await updateTestimonial.mutateAsync({ id, data: values });
    } else {
      await createTestimonial.mutateAsync(values);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquareQuote className="text-primary h-5 w-5" />
            <span>{isEditing ? "Edit Testimonial" : "Create Testimonial"}</span>
          </DialogTitle>
          <DialogDescription>
            Configure reviewer details, quote, star rating, tags, and video review URLs.
          </DialogDescription>
        </DialogHeader>

        <TestimonialForm
          key={testimonial ? testimonial.id || testimonial._id : "create"}
          defaultValues={
            testimonial
              ? {
                  authorName: testimonial.authorName,
                  authorRole: testimonial.authorRole,
                  company: testimonial.company,
                  avatar: testimonial.avatar,
                  quote: testimonial.quote,
                  rating: testimonial.rating,
                  tags: testimonial.tags,
                  hasVideo: testimonial.hasVideo,
                  videoUrl: testimonial.videoUrl,
                  posterImage: testimonial.posterImage,
                  iconBg: testimonial.iconBg,
                  order: testimonial.order,
                  isActive: testimonial.isActive
                }
              : undefined
          }
          onSubmit={handleSubmit}
          isLoading={isLoading}
          onCancel={() => onOpenChange(false)}
          submitLabel={isEditing ? "Update Testimonial" : "Create Testimonial"}
        />
      </DialogContent>
    </Dialog>
  );
}
