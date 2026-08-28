"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { ApiResponse, ITestimonial } from "@repo/types";
import { CreateTestimonialInput, UpdateTestimonialInput } from "@repo/validators";

import { del, patch, post } from "@/lib/api";

export function useCreateTestimonial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateTestimonialInput) => {
      const res = await post<ApiResponse<ITestimonial>>("/testimonials", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Testimonial added successfully");
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to create testimonial";
      toast.error(msg);
    }
  });
}

export function useUpdateTestimonial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateTestimonialInput }) => {
      const res = await patch<ApiResponse<ITestimonial>>(`/testimonials/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Testimonial updated successfully");
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to update testimonial";
      toast.error(msg);
    }
  });
}

export function useDeleteTestimonial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await del(`/testimonials/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Testimonial deleted permanently");
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to delete testimonial";
      toast.error(msg);
    }
  });
}
